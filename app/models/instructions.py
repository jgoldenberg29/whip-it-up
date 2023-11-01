from .db import db, environment, SCHEMA, add_prefix_for_prod


class Instruction(db.Model):
    __tablename__ = 'instructions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
    text = db.Column(db.text, nullable=False)
    step = db.Column(db.Integer, nullable=False)

    instructions_for = db.relationship('Recipe', back_populates = 'recipe_instructions')


    def to_dict(self):
        return {
            'id': self.id,
            'recipeId': self.recipe_id,
            'text': self.text,
            'step': self.step,
        }
