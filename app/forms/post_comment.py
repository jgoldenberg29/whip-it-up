from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from ..models import Recipe
from icecream import ic


class CommentForm(FlaskForm):
    text = StringField('text', validators=[DataRequired(), Length(2,2000)])
