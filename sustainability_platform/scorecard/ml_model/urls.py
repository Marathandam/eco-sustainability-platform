from django.urls import path
from .views import predict_score_view

urlpatterns = [
    path('predict-score/', predict_score_view, name='predict-score'),
]
