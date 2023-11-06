from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, BooleanField, SelectField, DecimalField, Field
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange, URL
from werkzeug.datastructures import MultiDict, TypeConversionDict
from ..api.AWS_helpers import ALLOWED_IMG_EXTENSIONS
from .measurement_types import measurement_types
from ..models import Recipe
from icecream import ic

def url_exists(form, field):
    recipe_url = field.data
    recipe = Recipe.query.filter(Recipe.recipe_url == recipe_url).first()
    if recipe:
        raise ValidationError("This url is already linked to a recipe")

def validated_obj_string(form, field):
    string = field.data
    if '&' not in string:
        raise ValidationError('please use create form to enter information')

def validate_ingredients(form, field):
    ingredients = field.data.split('&')
    ic(ingredients)
    del ingredients[-1]
    ic(ingredients)
    for row in ingredients:
        seperated_row = row.split(',')
        ic(seperated_row)
        for chars in seperated_row[0].split('/'):
            if not chars.isdigit():
                raise ValidationError('Quantity must be a positive integer, decimal or fraction')
        if not seperated_row[2].isalpha():
            raise ValidationError('Ingredient must be a food item')

def validate_instructions(form, field):
    instructions = field.data.split('&')
    del instructions[-1]
    for instruction in instructions:
        if len(instruction) < 10:
            raise ValidationError('Instructions must be at least 10 characters long')

class RecipeForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(3,100)])
    recipe_url = StringField('recipe_url', validators=[url_exists, Length(1,255), URL()])
    image = FileField('image', validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS)), FileRequired()])
    description = StringField('desciption', validators=[DataRequired(), Length(15,4000)])
    prep_time = IntegerField('prep_time', validators=[DataRequired(), NumberRange(1,10080)])
    cook_time = IntegerField('cook_time', validators=[DataRequired(), NumberRange(0,5760)])
    servings = IntegerField('servings', validators=[DataRequired(), NumberRange(1,1000)])
    ingredients = StringField('ingredients', validators=[DataRequired(), validated_obj_string, validate_ingredients])
    instructions = StringField('instructions', validators=[DataRequired(), validated_obj_string, validate_instructions])
