from flask import request, jsonify, Blueprint
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
api = Blueprint('api', __name__)

# 🔐 SIGNUP


@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()

    if not body:
        return jsonify({"msg": "No data"}), 400

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing data"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(
        email=email,
        password=generate_password_hash(password),
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created"}), 201


# 🔑 LOGIN
@api.route("/login", methods=["POST"])
def login():
    body = request.get_json()

    email = body.get("email")
    password = body.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Bad credentials"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({"token": token}), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    return jsonify({
        "msg": "Acceso autorizado",
        "user_id": user_id
    }), 200
