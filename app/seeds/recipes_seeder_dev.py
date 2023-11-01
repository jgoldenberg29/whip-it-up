from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text
from .recipes_seeds_dev import recipes
from icecream import ic


# Adds a demo user, you can add other users here if you want
def seed_recipes():

    for recipe in recipes:
        ic(recipe)
        new_recipe = Recipe(
            user_id=recipe['user_id'],
            title=recipe['title'],
            recipe_url=recipe['recipe_url'],
            image=recipe['image'],
            description=recipe['description'],
            prep_time=recipe['prep_time'],
            cook_time=recipe['cook_time'],
            servings=recipe['servings'],
            instructions=recipe['instructions']
        )
        db.session.add(new_recipe)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()
