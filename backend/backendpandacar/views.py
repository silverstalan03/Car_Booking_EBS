# backendpandacar/views.py
from django.http import JsonResponse
from django.shortcuts import redirect

def api_root(request):
    """
    Root view that redirects to the frontend or returns API info based on Accept header
    """
    if 'application/json' in request.headers.get('Accept', ''):
        return JsonResponse({
            'status': 'ok',
            'message': 'Car Booking API Backend is running',
            'api_version': '1.0',
            'frontend_url': 'http://carfrontend.s3-website-us-east-1.amazonaws.com'
        })
    return redirect('http://carfrontend.s3-website-us-east-1.amazonaws.com')