from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange

def url_exists(form, field):
    recipe = Recipe.query.filter(Recipe.recipe_url == recipe_url).first()
    if recipe:
        raise ValidationError("This url is already linked to a recipe")


class RecipeForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(3,100)])
    recipe_url = StringField('recipe_url', validators=[url_exists, Length(1,255)])
    image = FileField('image', validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS)), FileRequired()])
    description = StringField('desciption', validators=[DataRequired()])
    prep_time = IntegerField('prep_time', validators=[DataRequired(), NumberRange(1,10080)])
    cook_time = IntegerField('cook_time', validators=[DataRequired(), NumberRange(1,5760)])
    servings = IntegerField('servings', validators=[DataRequired(), NumberRange(1,1000)])
