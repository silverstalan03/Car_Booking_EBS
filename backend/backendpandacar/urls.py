# backendpandacar/urls.py
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('health/', views.health_check, name='health_check'),
    path('', views.api_root, name='api-root'),
]