from .db import db, environment, SCHEMA, add_prefix_for_prod


class Rating(db.Model):
    __tablename__ = 'ratings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
    stars = db.Column(db.Integer, nullable=False)

    recipe = db.relationship('Recipe', back_populates= 'recipe_ratings')
    user = db.relationship('User', back_populates='user_ratings')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'recipeId': self.recipe_id,
            'rating': self.text
        }
