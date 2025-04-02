CAR BOOKING SYSTEM & MOVIE AND FOOD API INTEGRATION

Project Details:

Author: Silver Stalan Inbaraj
Application URL: Car-App1-env.eba-qkeix5fn.us-east-1.elasticbeanstalk.com

Technology Stack:

Frontend: React.js, Vite
Backend: Django, Django REST Framework
Database: SQLite (Development), PostgreSQL (Production)
Deployment: AWS Elastic Beanstalk

Project Structure:

CarbookingAPI/
├── frontend/              # Frontend code
│   ├── panda-car-react/   # React application with Vite
│   │   ├── src/           # Source code
│   │   ├── public/        # Public files
│   │   └── package.json   # Dependencies
│
└── backend/               # Backend code
    ├── api/               # Django app for API
    ├── backendpandacar/   # Django project settings
    ├── manage.py          # Django management script
    └── requirements.txt   # Python dependencies

Local Development Setup:

cd CarbookingAPI

Install dependencies:
Backend:

python -m venv eb-venv
source eb-venv/bin/activate  # On Windows: eb-venv\Scripts\activate
cd backend
pip install -r requirements.txt


Frontend:
cd frontend/panda-car-react
npm install

Database setup:
cd backend
python manage.py migrate
python manage.py createsuperuser

Start the application:
Backend:
python manage.py runserver


Frontend:
cd frontend/panda-car-react
npm run dev