# api/services.py
import requests
from django.conf import settings
from .models import ExternalMovieAPI, ExternalFoodAPI

class MovieAPIService:
    @staticmethod
    def get_available_movies():
        try:
            # For testing purposes, return sample data
            sample_movies = [
                {
                    "id": 1,
                    "title": "The Matrix",
                    "genre": "Sci-Fi",
                    "duration": 136,
                    "rating": 8.7,
                    "poster_url": "/media/movie_posters/matrix.jpg"
                },
                {
                    "id": 2,
                    "title": "Inception",
                    "genre": "Sci-Fi",
                    "duration": 148,
                    "rating": 8.8,
                    "poster_url": "/media/movie_posters/inception.jpg"
                },
                {
                    "id": 3,
                    "title": "The Dark Knight",
                    "genre": "Action",
                    "duration": 152,
                    "rating": 9.0,
                    "poster_url": "/media/movie_posters/dark_knight.jpg"
                },
                {
                    "id": 4,
                    "title": "Pulp Fiction",
                    "genre": "Crime",
                    "duration": 154,
                    "rating": 8.9,
                    "poster_url": "/media/movie_posters/pulp_fiction.jpg"
                }
            ]
            return sample_movies
            
            # Uncomment below when you have the actual API configured
            # api_config = ExternalMovieAPI.objects.first()
            # if not api_config:
            #     return {"error": "Movie API not configured"}
            #     
            # url = api_config.base_url
            # headers = {}
            # if api_config.api_key:
            #     headers['Authorization'] = f'Bearer {api_config.api_key}'
            #     
            # response = requests.get(url, headers=headers)
            # return response.json()
        except Exception as e:
            return {"error": str(e)}

class FoodAPIService:
    @staticmethod
    def get_available_foods():
        try:
            # For testing purposes, return sample data
            sample_foods = [
                {
                    "id": 1,
                    "name": "Popcorn",
                    "description": "Classic buttered popcorn",
                    "price": 5.99,
                    "image_url": "/media/food_images/popcorn.jpg"
                },
                {
                    "id": 2, 
                    "name": "Nachos",
                    "description": "Crispy nachos with cheese",
                    "price": 7.99,
                    "image_url": "/media/food_images/nachos.jpg"
                },
                {
                    "id": 3,
                    "name": "Hot Dog",
                    "description": "Classic hot dog with ketchup and mustard",
                    "price": 6.49,
                    "image_url": "/media/food_images/hot_dog.jpg"
                },
                {
                    "id": 4,
                    "name": "Soda",
                    "description": "Large fountain drink",
                    "price": 3.99,
                    "image_url": "/media/food_images/soda.jpg"
                }
            ]
            return sample_foods
            
            # Uncomment below when you have the actual API configured
            # api_config = ExternalFoodAPI.objects.first()
            # if not api_config:
            #     return {"error": "Food API not configured"}
            #     
            # url = api_config.base_url
            # headers = {}
            # if api_config.api_key:
            #     headers['Authorization'] = f'Bearer {api_config.api_key}'
            #     
            # response = requests.get(url, headers=headers)
            # return response.json()
        except Exception as e:
            return {"error": str(e)}