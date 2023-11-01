from .db import db, environment, SCHEMA, add_prefix_for_prod


class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
    item = db.Column(db.String(60), nullable=False)
    refridgerated = db.Column(db.Boolean)
    measurement = db.Column(db.String(25))
    quantity = db.Column(db.Float, nullable=False)

    used_in = db.relationship('Recipe', back_populates = 'recipe_ingredients')


    def to_dict(self):
        return {
            'id': self.id,
            'recipeId': self.recipe_id,
            'item': self.item,
            'refrigerated': self.refrigerated,
            'measurement': self.measurement,
            'quantity': self.quantity
        }
