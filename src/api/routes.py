"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Character, Planet, Vehicle, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime
import os


api = Blueprint('app', __name__)
# Allow CORS requests to this API
CORS(api)
BACKEND_URL = os.getenv('BACKEND_URL')

# Setup the Flask-JWT-Extended extension

# ENDPOINTS

# Creating an user
@api.route('/signup', methods=['POST'])
def signup():

    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user_query = User.query.filter_by(email = email).first()
    if user_query != None:
        return jsonify({"msg": "There is a user with that email"}), 401

    new_user = User(name = name, email = email, password = password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify("The user was added"), 200

# Get all users
@api.route('/users', methods=['GET'])
def get_all_user():
    users_query = User.query.all()
    users_data = list(map(lambda item: item.serialize(), users_query))
    response_body = {
        "msg": "ok",
        "users": users_data
    }

    return jsonify(response_body), 200

# Login
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_query = User.query.filter_by(email = email).first()
    if user_query is None:
        return jsonify({"msg": "User not found"}), 401
    if email != user_query.email or password != user_query.password:
        return jsonify({"msg": "Wrong emai lor password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# RETRIEVING DATA FROM THE DATABASE


# Show me every character
@api.route('/characters', methods=['GET'])
def get_all_characters():
    characters_query = Character.query.all()
    characters_data = list(map(lambda item: item.serialize(), characters_query))
    response_body = {
        "msg": "ok",
        "result": characters_data
    }

    return jsonify(response_body), 200

# Show me ONE character
@api.route('/characters/<int:id>', methods=['GET'])
def character(id):
    character_query = Character.query.filter_by(id = id).first()
    character_data = character_query.serialize()
    response_body = {
        "msg": "ok",
        "result": character_data
    }

    return jsonify(response_body), 200

# Show me every planet
@api.route('/planets', methods=['GET'])
def get_all_planet():
    planet_query = Planet.query.all()
    planet_data = list(map(lambda item: item.serialize(), planet_query))
    response_body = {
        "msg": "ok",
        "result": planet_data
    }

    return jsonify(response_body), 200

# Show me ONE planet
@api.route('/planets/<int:id>', methods=['GET'])
def planet(id):
    planet_query = Planet.query.filter_by(id = id).first()
    planet_data = planet_query.serialize()
    response_body = {
        "msg": "ok",
        "result": planet_data
    }

    return jsonify(response_body), 200

# Show me every vehicle
@api.route('/vehicles', methods=['GET'])
def get_all_vehicle():
    vehicle_query = Vehicle.query.all()
    vehicle_data = list(map(lambda item: item.serialize(), vehicle_query))
    response_body = {
        "msg": "ok",
        "result": vehicle_data
    }

    return jsonify(response_body), 200

# Show me ONE vehicle
@api.route('/vehicles/<int:id>', methods=['GET'])
def vehicle(id):
    vehicle_query = Vehicle.query.filter_by(id = id).first()
    vehicle_data = vehicle_query.serialize()
    response_body = {
        "msg": "ok",
        "result": vehicle_data
    }

    return jsonify(response_body), 200




# ADDING DATA IN THE DATABASE


# Create a character
@api.route('/characters', methods=['POST'])
def add_character():
    name = request.json.get("name", None)
    description = request.json.get("description", None)
    character_query = Character.query.filter_by(name = name).first()
    if character_query != None:
        return jsonify({"msg": "There is a character with that name"}), 401

    new_character = Character(name = name, description = description)
    db.session.add(new_character)
    db.session.commit()
    return jsonify("Character added"), 200

# Create a planet
@api.route('/planets', methods=['POST'])
def add_planet():
    name = request.json.get("name", None)
    climate = request.json.get("climate", None)
    diameter = request.json.get("diameter", None)
    orbital_period = request.json.get("orbital_period", None)
    rotation_period = request.json.get("rotation_period", None)
    planet_query = Planet.query.filter_by(name = name).first()
    if planet_query != None:
        return jsonify({"msg": "There is a planet with that name"}), 401

    new_planet = Planet(name = name, climate = climate, diameter = diameter, orbital_period = orbital_period, rotation_period = rotation_period)
    db.session.add(new_planet)
    db.session.commit()
    return jsonify("Planet added"), 200

# Create a vehicle
@api.route('/vehicles', methods=['POST'])
def add_vehicle():
    name = request.json.get("name", None)
    model = request.json.get("model", None)
    max_atmosphering_speed = request.json.get("max_atmosphering_speed", None)
    vehicle_query = Vehicle.query.filter_by(name = name).first()
    if vehicle_query != None:
        return jsonify({"msg": "There is a vehicle with that name"}), 401

    new_vehicle = Vehicle(name = name, model = model, max_atmosphering_speed = max_atmosphering_speed)
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify("Vehicle added"), 200




# HANDLING FAVOURITES


# Get the list of favorites of an user
@api.route("/user/favorites", methods=["GET"])
@jwt_required()
def get_all_favorites():
    current_user = get_jwt_identity()
    user_query = User.query.filter_by(email = current_user).first()
    favourite_query = Favorite.query.filter_by(user_id = user_query.id).all()
    favourite_data = list(map(lambda item: item.serialize(), favourite_query))
    response_body = {
        "msg": "ok",
        "favorite": favourite_data
    }

    return jsonify(response_body), 200


# Create favorite character
@api.route('/user/favorites/characters/<int:character_id>', methods=['POST'])
@jwt_required()
def Create_one_favorite_character(character_id):
    url = request.json.get("url", None)
    current_user = get_jwt_identity()
    user_query = User.query.filter_by(email = current_user).first()
    new_character_favourite = Favorite(user_id = user_query.id, url = url, character_id = character_id)
    db.session.add(new_character_favourite)
    db.session.commit()
    return jsonify("Favorite character added"), 200

# Create favorite planet
@api.route('/user/favorites/planets/<int:planet_id>', methods=['POST'])
@jwt_required()
def Create_one_planet_favoutite(planet_id):
    url = request.json.get("url", None)
    current_user = get_jwt_identity()
    user_query = User.query.filter_by(email = current_user).first()
    new_planet_favourite = Favorite(user_id = user_query.id, url = url, planet_id = planet_id)
    db.session.add(new_planet_favourite)
    db.session.commit()
    return jsonify("Favorite planet added"), 200

# Create favorite vehicle
@api.route('/user/favorites/vehicles/<int:vehicle_id>', methods=['POST'])
@jwt_required()
def Create_one_vehicle_favoutite(vehicle_id):
    url = request.json.get("url", None)
    current_user = get_jwt_identity()
    user_query = User.query.filter_by(email = current_user).first()
    new_vehicle_favourite = Favorite(user_id = user_query.id, url = url, vehicle_id = vehicle_id)
    db.session.add(new_vehicle_favourite)
    db.session.commit()
    return jsonify("Favorite vehicle added"), 200

# Delete favorite character
@api.route('/user/favorites/characters/<int:character_id>', methods=['DELETE'])
@jwt_required()
def Delete_one_people_favoutite(character_id):
    current_user = get_jwt_identity()
    user_query = User.query.filter_by(email = current_user).first()
    delete_character_favourite = Favorite.query.filter_by(user_id=user_query.id, character_id=character_id ).first()
    db.session.delete(delete_character_favourite)
    db.session.commit()
    return jsonify("Favorite character deleted"), 200

# Delete favorite planet
@api.route('/user/favorites/planets/<int:planet_id>', methods=['DELETE'])
@jwt_required()
def Delete_one_planet_favoutite(planet_id):
    current_user = get_jwt_identity()
    user_query = User.query.filter_by(email = current_user).first()
    delete_planet_favourite = Favorite.query.filter_by(user_id=user_query.id, planet_id=planet_id ).first()
    db.session.delete(delete_planet_favourite)
    db.session.commit()
    return jsonify("Favorite planet deleted"), 200

# Delete favorite vehicle
@api.route('/user/favorites/vehicles/<int:vehicle_id>', methods=['DELETE'])
@jwt_required()
def Delete_one_vehicle_favoutite(vehicle_id):
    current_user = get_jwt_identity()
    user_query = User.query.filter_by(email = current_user).first()
    delete_vehicle_favourite = Favorite.query.filter_by(user_id=user_query.id, vehicle_id=vehicle_id ).first()
    db.session.delete(delete_vehicle_favourite)
    db.session.commit()
    return jsonify("Favorite vehicle deleted"), 200




# this only runs if `$ python src/api.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    api.run(host='0.0.0.0', port=PORT, debug=False)
