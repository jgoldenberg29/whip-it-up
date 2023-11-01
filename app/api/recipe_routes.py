from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

recipe_routes = Blueprint('recipes', __name__)
