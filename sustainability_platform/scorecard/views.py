from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .ml_model.predict import predict_sustainability

@csrf_exempt
def predict_score_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            if isinstance(data, dict):
                data = [data]
            result = predict_sustainability(data)
            return JsonResponse(result, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"message": "Only POST allowed"}, status=405)
