from app.models import db, Recipe, User, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample


# Adds a demo user, you can add other users here if you want
def seed_saves():

    users = User.query.all()
    recipes = Recipe.query.all()
    for user in users:
        user.saved_recipes.extend(sample(recipes, 4))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_saves():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.saves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM saves"))

    db.session.commit()
