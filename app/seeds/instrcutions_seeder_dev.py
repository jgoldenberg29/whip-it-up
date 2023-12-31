from app.models import db, Instruction, environment, SCHEMA
from sqlalchemy.sql import text
from .instructions_seeds_dev import instructions


# Adds a demo user, you can add other users here if you want
def seed_instructions():

    for instruction in instructions:
        new_instruction = Instruction(
            recipe_id=instruction['recipe_id'],
            text=instruction['text'],
            step=instruction['step'],
        )
        db.session.add(new_instruction)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_instructions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.instructions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM instructions"))

    db.session.commit()
