from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Recipe, Ingredient, Instruction, Comment
from ..forms.post_comment import CommentForm
from .auth_routes import validation_errors_to_error_messages
from icecream import ic


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)

    if not comment:
        return {'errors': {'message': 'recipe does not exist'}}, 401
    if comment.user_id != current_user.id:
        return {'errors': {'message': 'forbidden'}}, 403

    if form.validate_on_submit():
        comment.text = form.data['text']
        db.session.commit()

        recipe = Recipe.query.get(comment.recipe_id)
        return {'recipe': recipe.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):

    comment = Comment.query.get(id)
    recipe_id = comment.recipe_id
    db.session.delete(comment)
    db.session.commit()
    recipe = Recipe.query.get(recipe_id)

    return {'recipe': recipe.to_dict()}
