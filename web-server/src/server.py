import json
import pickle
import os

from flask import Flask, request
from flask_cors import CORS
from Database import Database

app = Flask(__name__)
CORS(app, origins=["http://localhost:3001", "http://localhost:3000"])

def savePickle(pkl_file, db):
    with open(pkl_file, 'wb') as outp:
        pickle.dump(db, outp, pickle.HIGHEST_PROTOCOL)

def loadPickle(pkl_file, db):
    if os.path.isfile(pkl_file):
        with open(pkl_file, 'rb') as inp:
            try:
                db = pickle.load(inp)
                # print(db.registered_user, db.user_activity)
                return db
            except Exception:
                pass
    return db

pkl_file = 'database.pkl'
db = Database()

db = loadPickle(pkl_file, db)

# /check  GET   -> Server is running & some meta
# /register POST -> Update the user information, and return success or failed.
# /signin POST -> success or failure
# /profile/:userID -> GET User details
# /image PUT -> Update the user activity

@app.route("/", methods=['GET'])
def check():
    '''This is a route Check function'''
    return {
        "status": True
    }

@app.route("/register", methods=['POST'])
def register():
    '''
    This function is used to register a user to the server 
    and return if its a valid registeration or not
    '''
    req = request.data.decode('utf8')
    req = json.loads(req)

    ack = db.register(req["userID"], req["userName"], req["password"])
    if ack == "Success":
        res = {
            "status": True,
        }
        # Save the data to database
        savePickle(pkl_file, db)
    else:
        res = {
            "status": False,
            "reason": "User ID is already registered or invalid"
        }

    return res

@app.route('/signin', methods=['POST'])
def signin():
    '''
    This function is used to Signin the user to the server
    '''
    req = request.data.decode('utf8')
    req = json.loads(req)

    ack = db.signin(req["userID"], req["password"])
    print(ack, req["userID"], req["password"])
    if ack == "Success":
        res = {
            "status": True,
        }
    else:
        res = {
            "status": False,
            "reason": "Either User ID or Password entered is wrong"
        }

    return res

@app.route('/profile/<string:userID>', methods=['GET'])
def get_user_details(userID):
    '''
    This function gets the User Details for the given UserID
    '''
    ack = db.get_user_details(userID)
    if ack is None:
        res = {
            "status": False,
            "reason": "Given User ID is not registed"
        }
    else:
        res = {
            "status": True,
            "data": ack
        }
    
    return res

@app.route('/detect/<string:userID>', methods=['PUT'])
def update_user_activity(userID):
    '''
    This function updates the user activity to the database
    '''
    req = request.data.decode('utf8')
    req = json.loads(req)

    ack = db.update_user_activity(userID)
    if ack == 'Success':
        res = {
            "status": True
        }
        # Save the data to database
        savePickle(pkl_file, db)
    
    else:
        res = {
            "status": False
        }
    
    return res
