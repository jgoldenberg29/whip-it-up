from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, BooleanField, SelectField, DecimalField, Field
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange, URL
from werkzeug.datastructures import MultiDict, TypeConversionDict
from ..api.AWS_helpers import ALLOWED_IMG_EXTENSIONS
from .measurement_types import measurement_types

def url_exists(form, field):
    recipe = Recipe.query.filter(Recipe.recipe_url == recipe_url).first()
    if recipe:
        raise ValidationError("This url is already linked to a recipe")

def validate_ingredients_dict(form, field):
    for ingredient in ingredients.values():
        quantity = ingredient['quantity']
        item = ingredient['item']
        if not isinstance(quantity, int) or isinstance(quantity, float):
            raise ValidationError("amount must be a number")
        if ingredient['measurement']:
            measurement = ingredient['measurement']
            if not isinstance(measurement, str) or len(measurement) > 30:
                raise ValidationError('please choose one of the provided units of measurement')
        if not isinstance(item, str) or len(item) > 60:
            raise ValidationError('please enter a food item for ingrients')

def validate_instructions_dict(form, field):
    for step,text in instructions.items():
        if not isinstance(step, int):
            raise ValidationError('step must be a positive integer')
        if not isinstance(string, text) or len(text) > 500:
            raise ValidationError('instruction must be less than 500 characters')

class RecipeForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(3,100)])
    recipe_url = StringField('recipe_url', validators=[url_exists, Length(1,255), URL()])
    image = FileField('image', validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS)), FileRequired()])
    description = StringField('desciption', validators=[DataRequired()])
    prep_time = IntegerField('prep_time', validators=[DataRequired(), NumberRange(1,10080)])
    cook_time = IntegerField('cook_time', validators=[DataRequired(), NumberRange(0,5760)])
    servings = IntegerField('servings', validators=[DataRequired(), NumberRange(1,1000)])
    # ingredients
    ingredients = Field('ingredients', validators=[validate_ingredients_dict])
    instructions = Field('instructions', validators=[validate_instructions_dict])
    # item = StringField('item', validators=[DataRequired(), Length(2,60)])
    # refridgerated = BooleanField('refridgerated', validators=[DataRequired()])
    # measurement = SelectField('measurement', choices=measurement_types, validators=[DataRequired()])
    # quantity = DecimalField('quantity', validators=[DataRequired(), NumberRange(1,1000)])
    # # instructions
    # text = StringField('item', validators=[DataRequired(), Length(2,60)])
    # step = IntegerField('step', validators=[DataRequired(), NumberRange(1,300)])
