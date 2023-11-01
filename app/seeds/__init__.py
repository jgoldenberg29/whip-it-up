from flask.cli import AppGroup
from .users import seed_users, undo_users
from .recipes_seeder_dev import seed_recipes, undo_recipes
from .ingredients_seeder_dev import seed_ingredients, undo_ingredients
from .saves_seeder_dev import seed_saves, undo_saves
from .instrcutions_seeder_dev import seed_instructions, undo_instructions

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_saves()
        undo_instructions()
        undo_ingredients()
        undo_recipes()
        undo_users()
    seed_users()
    seed_recipes()
    seed_ingredients()
    seed_instructions()
    seed_saves()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_saves()
    undo_instructions()
    undo_ingredients()
    undo_recipes()
    undo_users()
    # Add other undo functions here
