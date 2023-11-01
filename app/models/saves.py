from .db import db, environment, SCHEMA, add_prefix_for_prod


saves = db.Table('saves',
                 db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')),primary_key=True)
)
if environment == "production":
    saves.schema = SCHEMA
