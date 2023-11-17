from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Recipe, Ingredient, Instruction, Comment
from icecream import ic


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):

    comment = Comment.query.get(id)
    recipe_id = comment.recipe_id
    db.session.delete(comment)
    db.session.commit()
    recipe = Recipe.query.get(recipe_id)

    return {'recipe': recipe.to_dict()}
