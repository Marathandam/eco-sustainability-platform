from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .predict import predict_sustainability

@csrf_exempt
def predict_score_view(request):
    if request.method == 'POST':
        try:
            payload = json.loads(request.body.decode('utf-8'))
            if isinstance(payload, dict):
                payload = [payload]  # ensure it's a list
            results = predict_sustainability(payload)
            return JsonResponse(results, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"message": "Only POST supported"}, status=405)
