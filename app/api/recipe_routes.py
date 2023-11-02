from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Recipe
from icecream import ic

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('')
def all_recipes():
    """
    Query for all the recipes and returns them to the landing page
    """
    recipes = Recipe.query.all()
    return {recipes: [recipe.to_dict() for recipe in recipes]}
