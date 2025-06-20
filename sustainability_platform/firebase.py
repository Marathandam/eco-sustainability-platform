import firebase_admin
from firebase_admin import credentials
cred = credentials.Certificate("firebase_keys/sustainabilityscorecard-firebase-adminsdk-fbsvc-8136ea9359.json")
firebase_admin.initialize_app(cred)