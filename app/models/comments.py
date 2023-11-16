from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
    text = db.Column(db.Text, nullable=False)

    recipe = db.relationship('Recipe', back_populates= 'recipe_comments')
    user = db.relationship('User', back_populates='user_comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'recipeId': self.recipe_id,
            'text': self.text,
            'user': self.user.to_dict()
        }
