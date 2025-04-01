from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates a superuser for the application'
    
    def handle(self, *args, **options):
        if not User.objects.filter(email='admin@example.com').exists():
            User.objects.create_superuser(
                email=os.environ.get('DJANGO_SU_EMAIL', 'admin@example.com'),
                username=os.environ.get('DJANGO_SU_USERNAME', 'admin'),
                password=os.environ.get('DJANGO_SU_PASSWORD', 'adminpassword'),
                name=os.environ.get('DJANGO_SU_NAME', 'Admin User')
            )
            self.stdout.write(self.style.SUCCESS('Superuser created successfully!'))
        else:
            self.stdout.write(self.style.SUCCESS('Superuser already exists.'))