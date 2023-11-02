from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, User, Recipe, Ingredient, Instruction
from icecream import ic
from ..forms.recipe import RecipeForm
from ..forms.ingredients import IngredientForm
from ..forms.instructions import InstructionForm
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

    # recipe_form = RecipeForm()
    # ingredient_form = IngredientForm()
    # instruction_form = InstructionForm()

    # recipe_form['csrf_token'].data.recipe = request.cookies['csrf_token']
    # ingredient_form['csrf_token'].data.ingredients = request.cookies['csrf_token']
    # instruction_form['csrf_token'].data.instructions = request.cookies['csrf_token']

    # if recipe_form.validate_on_submit():
    #     pass
    # if ingredient_form.validate_on_submit():
    #     pass
    # if instruction_form.validate_on_submit():
    #     pass

    form = RecipeForm()

    if form.validate_on_submit:
        data = form.data

        image = data['image']
        image.filename = get_unique_filename(image.filename)
        url = choice(default_recipe_images)
        upload = upload_file_to_s3(image)
        if 'url' not in upload:
            return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
        url = upload
        new_recipe = Recipe(
            user_id = current_user.id
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

        for ingredient in data['instructions']:
            new_ingredient = Ingredient(
                recipe_id = recipe.id,
                item = ingredient['item'],
                refridgerated = ingredient['refridgerated'],
                measurement = ingredient['measurement'],
                quantity = ingredient['quantity']
            )
            db.session.add(new_ingredient)

        for instruction in data['instructions']:
            new_instruction = Instruction(
                recipe_id = recipe.id,
                text = instruction['text'],
                step = instruction['step']
            )
            db.session.add(new_instruction)

        db.session.commit()
    else:
        return {'errors': {validation_errors_to_error_messages(form.errors)}}, 400
