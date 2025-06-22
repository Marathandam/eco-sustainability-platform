import firebase_admin
from firebase_admin import credentials
import os
from dotenv import load_dotenv
import json 

load_dotenv()

FIREBASE_KEY=json.loads(os.getenv("FIREBASE_KEY"))


cred = credentials.Certificate(FIREBASE_KEY)
firebase_admin.initialize_app(cred)