# from flask_wtf import FlaskForm
# from wtforms import StringField, IntegerField, BooleanField, SelectField, DecimalField
# from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
# from .measurement_types import measurement_types


# class IngredientForm(FlaskForm):
#     item = StringField('item', validators=[DataRequired(), Length(2,60)])
#     refridgerated = BooleanField('refridgerated', validators=[DataRequired()])
#     measurement = SelectField('measurement', choices=measurement_types, validators=[DataRequired()])
#     quantity = DecimalField('quantity', validators=[DataRequired(), NumberRange(1,1000)])
