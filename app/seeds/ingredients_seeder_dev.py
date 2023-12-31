from app.models import db, Ingredient, environment, SCHEMA
from sqlalchemy.sql import text
from .ingredients_seeds_dev import ingredients


# Adds a demo user, you can add other users here if you want
def seed_ingredients():

    for ingredient in ingredients:
        new_ingredient = Ingredient(
            recipe_id=ingredient['recipe_id'],
            item=ingredient['item'],
            refridgerated=ingredient['refridgerated'],
            measurement=ingredient['measurement'] if 'measurement' in ingredient.keys() else None,
            quantity=ingredient['quantity']
        )
        db.session.add(new_ingredient)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ingredients"))

    db.session.commit()
