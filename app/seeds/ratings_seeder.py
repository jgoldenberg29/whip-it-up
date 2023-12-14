from app.models import db, Rating, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample, randint

def seed_ratings():
    for recipe_id in range(21): #ids for seed recipes less 4 unrated
        for user_id in range(24): #ids for seed users
            new_rating = Rating(
                user_id=user_id,
                recipe_id=recipe_id,
                stars= randint(2,5)
            )
            db.session.add(new_rating)
    db.session.commit()


def undo_ratings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ratings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ratings"))

    db.session.commit()
