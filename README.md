# BlogDRFProject

## Overview
BlogDRFProject is a modern, full-stack web application featuring a robust backend API built with Django REST Framework (DRF) and a dynamic, responsive frontend built with React, TypeScript, and Vite. The platform allows users to create, view, and interact with blog posts, featuring JWT-based authentication, category management, AI-assisted content generation, and more.

## Technologies and Dependencies

### Backend
* **Language:** Python
* **Framework:** Django 5.x
* **API:** Django REST Framework (DRF)
* **Authentication:** SimpleJWT (JSON Web Tokens)
* **Database:** SQLite (default for development)
* **API Documentation:** drf-yasg (Swagger/OpenAPI)
* **Other key packages:** `django-filter`, `asgiref`, `pytz`

### Frontend
* **Core:** React 19, TypeScript
* **Build Tool:** Vite
* **Styling & UI:** TailwindCSS, Material UI (@mui/material), Emotion
* **Routing:** React Router DOM v7
* **State Management/Data Fetching:** Axios, Formik (for forms)
* **Internationalization:** i18next, react-i18next
* **Icons & Sliders:** react-icons, Swiper, Splide

## Project Structure
```text
BlogDRFProject/
├── Backend/                 # Django backend directory
│   ├── accounts/            # App handling user registration, auth, and profiles
│   ├── blog/                # App handling posts, categories, likes, and AI tools
│   ├── config/              # Main Django project settings and URL routing
│   ├── media/               # User-uploaded media files
│   ├── db.sqlite3           # SQLite Database
│   ├── manage.py            # Django command-line utility
│   └── requirements.txt     # Python dependencies
├── Frontend/                # React frontend directory
│   ├── public/              # Static assets
│   ├── src/                 # React component source code
│   ├── package.json         # Node.js dependencies and scripts
│   ├── vite.config.ts       # Vite configuration
│   └── tailwind/postcss config files
└── README.md                # Project documentation
```

## Installation and Setup

### Prerequisites
* Python 3.10+
* Node.js (v18+ recommended) and npm
* Git

### 1. Clone the Repository
```bash
git clone <repository_url>
cd BlogDRFProject
```

### 2. Backend Setup
Navigate to the backend directory, create a virtual environment, and install dependencies:
```bash
cd Backend
python -m venv venv

# Activate the virtual environment:
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies:
pip install -r requirements.txt

# Run database migrations:
python manage.py migrate

# Create a superuser (optional, for admin access):
python manage.py createsuperuser
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd Frontend
npm install
```

## Environment Variables / Configuration
By default, the project runs with development settings. However, for features like the `AIGenerateView`, you may need to set specific environment variables in the `Backend` (e.g., API keys). Currently, configuration is primarily handled within `Backend/config/settings.py`. Ensure that you add any local secret keys to a `.env` file if the project is updated to use one (e.g., via `python-dotenv`).

## Running the Project Locally

### Start the Backend Server
Make sure your virtual environment is active, then run:
```bash
cd Backend
python manage.py runserver
```
The API will be available at `http://127.0.0.1:8000/`. You can access the Django admin panel at `http://127.0.0.1:8000/admin/`.

### Start the Frontend Server
Open a new terminal, navigate to the Frontend folder, and run:
```bash
cd Frontend
npm run dev
```
The React app will be available at `http://localhost:5173/`.

## API Endpoints and Usage

The Backend exposes several RESTful endpoints.

**Authentication & Accounts (`/api/accounts/`)**
* `POST /api/accounts/register/` - Register a new user
* `POST /api/accounts/login/` - Obtain JWT access and refresh tokens
* `POST /api/accounts/token/refresh/` - Refresh JWT access token
* `GET /api/accounts/profile/` - Get user profile details

**Blog (`/api/blog/`)**
* `GET / POST /api/blog/categories/` - List or create categories
* `GET / POST /api/blog/posts/` - List or create blog posts
* `GET / PUT / DELETE /api/blog/posts/<id>/` - Retrieve, update, or delete a specific post
* `GET /api/blog/posts/popular/` - Retrieve popular posts
* `POST /api/blog/posts/<id>/like/` - Toggle like on a post
* `POST /api/blog/ai/generate/` - AI-assisted content generation

### Example Request (Login)
```bash
curl -X POST http://127.0.0.1:8000/api/accounts/login/ \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "securepassword123"}'
```

### Example Response
```json
{
  "refresh": "eyJhbGciOiJIUzI1...",
  "access": "eyJhbGciOiJIUzI1..."
}
```

## Running Tests

### Backend Tests
To run Django tests:
```bash
cd Backend
python manage.py test
```

### Frontend Tests / Linting
To run the ESLint checker:
```bash
cd Frontend
npm run lint
```
*(Note: Add a test script in `package.json` utilizing tools like Jest or Vitest for unit tests if expanded in the future).*

## Contribution and Development Guidelines
* **Branching Strategy:** Create a new branch for each feature or bug fix (`feature/your-feature-name` or `bugfix/issue-description`).
* **Code Style:** Backend code should adhere to PEP 8 (consider using `flake8` and `black`). Frontend code uses ESLint and Prettier.
* **Commit Messages:** Write clear, concise commit messages.
* **Pull Requests:** Ensure all tests and linting pass before submitting a PR.
