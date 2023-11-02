from .db import db, environment, SCHEMA, add_prefix_for_prod
from .saves import saves


class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id =  id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(100), nullable=False)
    recipe_url = db.Column(db.String(255), unique=True)
    image = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    prep_time = db.Column(db.Integer, nullable=False)
    cook_time = db.Column(db.Integer, nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    # instructions = db.Column(db.Text, nullable=False)

    author = db.relationship('User', back_populates = 'shared_recipes')
    saved_by = db.relationship('User', secondary=saves, back_populates='saved_recipes')
    recipe_ingredients = db.relationship('Ingredient', back_populates='used_in')
    recipe_instructions = db.relationship('Instruction', back_populates = 'instructions_for')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'recipeURL': self.recipe_url,
            'image': self.image,
            'description': self.description,
            'prepTime': self.prep_time,
            'cookTime': self.cook_time,
            'servings': self.servings,
            'author': self.author.first_name,
            'ingredients': [ingredient.to_dict() for ingredient in self.recipe_ingredients],
            'instructions': sorted([instruction.to_dict() for instruction in self.recipe_instructions], key=lambda instruction: instruction['step'])
        }
