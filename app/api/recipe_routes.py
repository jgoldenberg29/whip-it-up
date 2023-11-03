from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Recipe, Ingredient, Instruction
from icecream import ic
from ..forms.recipe import RecipeForm
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
    ic([recipe.to_dict() for recipe in recipes])
    return {'recipes': [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('', methods=['POST'])
@login_required
def create_recipe():
    """
    takes in information from the create recipe page and uses the recipe, ingredient and instruction forms to validate the information. Adds and commits the information to the database and returns the recipe dictionary.
    """

    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    ic(form.data)
    ic(form.data['instructions'])
    ic(form.data['ingredients'])

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
        ingredient_rows = data['ingredients'].split('/')
        del ingredient_rows[-1]
        for row in ingredient_rows:
            seperated_row = row.split(',')
            ic(seperated_row)
            new_ingredient = Ingredient(
                recipe_id = recipe.id,
                quantity = seperated_row[0],
                measurement = seperated_row[1],
                item =seperated_row[2],
                refridgerated = True if seperated_row[3] == 'True' else False,
            )
            db.session.add(new_ingredient)
        seperated_instructions = data['instructions'].split('/')
        for i in range(len(seperated_instructions)):
            new_instruction = Instruction(
                recipe_id = recipe.id,
                text = seperated_instructions[i],
                step = i+1
            )
            db.session.add(new_instruction)

        db.session.commit()
        ic(recipe.to_dict())
        return {'recipe': recipe.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
