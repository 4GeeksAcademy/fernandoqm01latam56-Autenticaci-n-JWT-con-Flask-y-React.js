"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS

from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

api = Blueprint('api', __name__)
CORS(api)


@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({ "message": "Hello from backend" }), 200


# 🔐 REGISTRO
@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()

    if not body.get("email") or not body.get("password"):
        return jsonify({"msg": "Missing data"}), 400

    user = User.query.filter_by(email=body["email"]).first()
    if user:
        return jsonify({"msg": "User already exists"}), 400

    hashed_password = generate_password_hash(body["password"])

    new_user = User(
        email=body["email"],
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created"}), 201


# 🔑 LOGIN
@api.route("/login", methods=["POST"])
def login():
    body = request.get_json()

    user = User.query.filter_by(email=body["email"]).first()

    if not user or not check_password_hash(user.password, body["password"]):
        return jsonify({"msg": "Bad credentials"}), 401

    token = create_access_token(identity=user.id)
    return jsonify({ "token": token }), 200


# 🔒 RUTA PRIVADA
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    return jsonify({
        "msg": "Acceso autorizado",
        "user_id": current_user_id
    }), 200
