# backendpandacar/settings_prod.py
from .settings import *
import os

# Production settings
DEBUG = False
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', SECRET_KEY)

# Allow Elastic Beanstalk URL
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '.elasticbeanstalk.com', '.amazonaws.com']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',
    'api',  # Your API app
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Database configuration - PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('RDS_DB_NAME', 'ebdb'),
        'USER': os.environ.get('RDS_USERNAME', 'ebroot'),
        'PASSWORD': os.environ.get('RDS_PASSWORD', 'Silver1999.'),
        'HOST': os.environ.get('RDS_HOSTNAME', 'localhost'),
        'PORT': os.environ.get('RDS_PORT', '5432'),
    }
}

# Static and media files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CORS settings
CORS_ALLOWED_ORIGINS = [
    'http://carfrontend.s3-website-us-east-1.amazonaws.com',
    'http://Car-App1-env.eba-qkeix5fn.us-east-1.elasticbeanstalk.com',
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False

# CSRF settings
CSRF_TRUSTED_ORIGINS = [
    'http://carfrontend.s3-website-us-east-1.amazonaws.com',
    'http://Car-App1-env.eba-qkeix5fn.us-east-1.elasticbeanstalk.com',
]

# REST framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# Simplify logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
        'api': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}