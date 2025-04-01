from .settings import *

# Production settings
DEBUG = False
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', SECRET_KEY)

# Allow Elastic Beanstalk URL
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '.elasticbeanstalk.com', '.amazonaws.com']

# Configure templates to serve frontend
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Static and media files configuration
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Database configuration for RDS
if 'RDS_HOSTNAME' in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ['RDS_DB_NAME'],
            'USER': os.environ['RDS_USERNAME'],
            'PASSWORD': os.environ['RDS_PASSWORD'],
            'HOST': os.environ['RDS_HOSTNAME'],
            'PORT': os.environ['RDS_PORT'],
        }
    }

# CORS settings for production
CORS_ALLOWED_ORIGINS = [
    'https://*.elasticbeanstalk.com',
    'http://*.elasticbeanstalk.com',
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False  # Disable in production

# Update CSRF trusted origins
CSRF_TRUSTED_ORIGINS = [
    'https://*.elasticbeanstalk.com',
    'http://*.elasticbeanstalk.com',
]

# Security settings
# Set these to True only if you configure HTTPS
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_HTTPONLY = True

# AWS settings - using environment variables
AWS_REGION = os.environ.get('AWS_REGION', 'us-east-1')
AWS_API_GATEWAY_URL = os.environ.get('AWS_API_GATEWAY_URL', 'https://ozado4x5ci.execute-api.us-east-1.amazonaws.com/Dev')
AWS_SNS_TOPIC_ARN = os.environ.get('AWS_SNS_TOPIC_ARN', 'arn:aws:sns:us-east-1:543952390368:CarBookingNotifications')
AWS_SQS_QUEUE_URL = os.environ.get('AWS_SQS_QUEUE_URL', 'https://sqs.us-east-1.amazonaws.com/543952390368:CarBookingQueue')

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': '/var/log/app-logs/django.log',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
        'api': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

# Ensure the log directory exists
try:
    os.makedirs('/var/log/app-logs', exist_ok=True)
except Exception:
    # Fall back to logging to stdout only
    LOGGING['loggers']['django']['handlers'] = ['console']
    LOGGING['loggers']['api']['handlers'] = ['console']