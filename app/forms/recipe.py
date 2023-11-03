from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, BooleanField, SelectField, DecimalField, Field
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange, URL
from werkzeug.datastructures import MultiDict, TypeConversionDict
from ..api.AWS_helpers import ALLOWED_IMG_EXTENSIONS
from .measurement_types import measurement_types
from ..models import Recipe

def url_exists(form, field):
    recipe_url = field.data
    recipe = Recipe.query.filter(Recipe.recipe_url == recipe_url).first()
    if recipe:
        raise ValidationError("This url is already linked to a recipe")

def validated_obj_string(form, field):
    string = field.data
    if '/' not in string:
        raise ValidationError('please use create form to enter ingredients')

class RecipeForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(3,100)])
    recipe_url = StringField('recipe_url', validators=[url_exists, Length(1,255), URL()])
    image = FileField('image', validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS)), FileRequired()])
    description = StringField('desciption', validators=[DataRequired(), Length(15,4000)])
    prep_time = IntegerField('prep_time', validators=[DataRequired(), NumberRange(1,10080)])
    cook_time = IntegerField('cook_time', validators=[DataRequired(), NumberRange(0,5760)])
    servings = IntegerField('servings', validators=[DataRequired(), NumberRange(1,1000)])
    ingredients = StringField('ingredients', validators=[DataRequired(), validated_obj_string])
    instructions = StringField('instructions', validators=[DataRequired(), validated_obj_string])
    # item = StringField('item', validators=[DataRequired(), Length(2,60)])
    # refridgerated = BooleanField('refridgerated', validators=[DataRequired()])
    # measurement = SelectField('measurement', choices=measurement_types, validators=[DataRequired()])
    # quantity = DecimalField('quantity', validators=[DataRequired(), NumberRange(1,1000)])
    # # instructions
    # text = StringField('item', validators=[DataRequired(), Length(2,60)])
    # step = IntegerField('step', validators=[DataRequired(), NumberRange(1,300)])
