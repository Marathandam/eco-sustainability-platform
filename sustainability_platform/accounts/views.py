from django.shortcuts import render
from firebase import *

from rest_framework.views import APIView
from rest_framework.response import Response
from firebase_admin import auth
from .models import User
from rest_framework import status

class FirebaseLoginView(APIView):
    def post(self , request):
        id_token = request.data.get('idtoken')
        try:
            decoded_token = auth.verify_id_token(id_token)
            email = decoded_token['email']
            full_name = decoded_token.get('name', '')
            user, created = User.objects.get_or_create(email=email, defaults={'full_name': full_name})
            return Response({
                'message': 'Login successful',
                'user_id': user.id,
                'new_user': created
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
# Create your views here.
