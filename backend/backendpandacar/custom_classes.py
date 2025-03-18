from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import jwt
from api.models import User

class CustomAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Check for token in cookies
        token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        
        # Debug print
        print(f"Checking token in cookies: {'Present' if token else 'Not present'}")
        
        if not token:
            # Try Authorization header as backup
            header = request.META.get('HTTP_AUTHORIZATION')
            if header:
                try:
                    token_type, token = header.split()
                    if token_type.lower() != 'bearer':
                        return None
                except ValueError:
                    return None
            else:
                return None
                
        if not token:
            return None
            
        try:
            # Simple JWT decoding with minimal validation for development
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=['HS256'],
                options={'verify_signature': True, 'verify_exp': False}  # Skip expiration check for dev
            )
            
            # Get user
            user_id = payload.get('user_id')
            if not user_id:
                print("No user_id in token")
                return None
                
            user = User.objects.get(id=user_id)
            print(f"Successfully authenticated user: {user}")
            
            return (user, token)
            
        except jwt.PyJWTError as e:
            print(f"JWT error: {str(e)}")
            return None
        except User.DoesNotExist:
            print(f"User not found for ID: {user_id}")
            return None
        except Exception as e:
            print(f"Authentication error: {str(e)}")
            return None