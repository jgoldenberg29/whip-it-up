from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Recipe, Ingredient, Instruction
from icecream import ic
from ..forms.recipe import RecipeForm
from ..forms.edit_recipe import EditRecipeForm
# from ..forms.ingredients import IngredientForm
# from ..forms.instructions import InstructionForm
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from random import choice
from .default_images import default_recipe_images
from .auth_routes import validation_errors_to_error_messages

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('')
def all_recipes():
    """
    Query for all the recipes and returns them to the landing page
    """
    recipes = Recipe.query.all()
    return {'recipes': [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('', methods=['POST'])
@login_required
def create_recipe():
    """
    takes in information from the create recipe page and uses the recipe, ingredient and instruction forms to validate the information. Adds and commits the information to the database and returns the recipe dictionary.
    """

    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        image = data['image']
        image.filename = get_unique_filename(image.filename)
        url = choice(default_recipe_images)
        upload = upload_file_to_s3(image)
        if 'url' not in upload:
            return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
        url = upload['url']
        new_recipe = Recipe(
            user_id = current_user.id,
            title = data['title'],
            recipe_url = data['recipe_url'],
            image = url,
            description = data['description'],
            prep_time = data['prep_time'],
            cook_time = data['cook_time'],
            servings = data['servings']
        )
        db.session.add(new_recipe)
        db.session.commit()

        recipe = Recipe.query.filter(Recipe.image == url).first()

        ingredient_rows = data['ingredients'].split('&')
        del ingredient_rows[-1]
        for row in ingredient_rows:
            seperated_row = row.split(',')
            new_ingredient = Ingredient(
                recipe_id = recipe.id,
                quantity = seperated_row[0],
                measurement = seperated_row[1],
                item =seperated_row[2],
                refridgerated = True if seperated_row[3] == 'True' else False,
            )
            db.session.add(new_ingredient)
        seperated_instructions = data['instructions'].split('&')
        del seperated_instructions[-1]
        for i in range(len(seperated_instructions)):
            new_instruction = Instruction(
                recipe_id = recipe.id,
                text = seperated_instructions[i],
                step = i+1
            )
            db.session.add(new_instruction)

        db.session.commit()
        return {'recipe': recipe.to_dict(), 'user': current_user.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@recipe_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_recipe(id):
    """
    takes in information from the create recipe page and uses the recipe, ingredient and instruction forms to validate the information. Adds and commits the information to the database and returns the recipe dictionary.
    """

    form = EditRecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    recipe = Recipe.query.get(id)

    if recipe is None:
        return {'errors': {'message':'Recipe not found'}}, 404
    elif recipe.user_id != current_user.id:
        return {'errors': {'message':'forbidden'}}, 403

    if form.validate_on_submit():
        data = form.data
        ic(form.data)

        url = None
        if data['image'] != recipe.image and data['image'] != None:
            image = data['image']
            image.filename = get_unique_filename(image.filename)
            url = choice(default_recipe_images)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
            url = upload['url']

        recipe.title = data['title']
        recipe.recipe_url = data['recipe_url']
        recipe.image = url if url else recipe.image
        recipe.description = data['description']
        recipe.prep_time = data['prep_time']
        recipe.cook_time = data['cook_time']
        recipe.servings = data['servings']

        [db.session.delete(ingredient) for ingredient in recipe.recipe_ingredients]
        [db.session.delete(instruction) for instruction in recipe.recipe_instructions]
        db.session.commit()

        ic(recipe.to_dict())

        ingredient_rows = data['ingredients'].split('&')
        del ingredient_rows[-1]
        ic(ingredient_rows)
        for row in ingredient_rows:
            seperated_row = row.split(',')
            updated_ingredient = Ingredient(
                recipe_id = id,
                quantity = seperated_row[0],
                measurement = seperated_row[1],
                item =seperated_row[2],
                refridgerated = True if seperated_row[3] == 'True' else False,
            )
            ic(updated_ingredient.to_dict())
            db.session.add(updated_ingredient)
        seperated_instructions = data['instructions'].split('&')
        del seperated_instructions[-1]
        for i in range(len(seperated_instructions)):
            updated_instruction = Instruction(
                recipe_id = id,
                text = seperated_instructions[i],
                step = i+1
            )
            ic(updated_instruction.to_dict())
            db.session.add(updated_instruction)
            ic(updated_instruction.to_dict())

        db.session.commit()
        recipe = Recipe.query.get(id)
        ic(recipe.to_dict())
        return {'recipe': recipe.to_dict(), 'user': current_user.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@recipe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe(id):

    recipe = Recipe.query.get(id)
    [db.session.delete(ingredient) for ingredient in recipe.recipe_ingredients]
    [db.session.delete(instruction) for instruction in recipe.recipe_instructions]
    db.session.delete(recipe)
    db.session.commit()

    return {'user': current_user.to_dict()}


@recipe_routes.route('/<int:id>/save')
@login_required
def save_recipe(id):

    recipe = Recipe.query.get(id)
    current_user.saved_recipes.append(recipe)
    db.session.commit()

    return {'user': current_user.to_dict()}



@recipe_routes.route('/<int:id>/unsave')
@login_required
def unsave_recipe(id):

    recipe = Recipe.query.get(id)
    idx = current_user.saved_recipes.index(recipe)
    current_user.saved_recipes.pop(idx)
    db.session.commit()

    return {'user': current_user.to_dict()}
