# InsightfulAI Project

Welcome to the InsightfulAI project! This project consists of a backend API built with FastAPI and a frontend built with React and TypeScript.

## Backend

The backend server is built using FastAPI and runs on Uvicorn.

### Prerequisites

Make sure you have Python 3.8+ installed along with pip. It is recommended to use a virtual environment.

### Setup

1. Install the necessary dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. (Optional) For development, it's a good idea to enable a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

### Running the Backend Server

Navigate to the backend directory and run the following command:

```bash
cd backend
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

- `main` is the name of the file (without the `.py` extension) where your FastAPI app instance is defined.
- `app` is the name of the FastAPI instance.
- The `--reload` flag enables auto-reloading on code changes during development.
- The server will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Frontend

The frontend is built with React and TypeScript using Create React App.

### Prerequisites

Make sure you have Node.js and npm installed.

### Setup

1. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Frontend

Start the development server with:
   ```bash
   cd frontend
   npm start
   ```

This command launches the frontend in development mode and opens [http://localhost:3000](http://localhost:3000) in your default browser.

## Additional Information

- For production deployment of the backend, consider running Uvicorn with additional performance options or using Gunicorn with Uvicorn workers.
- Refer to each part's specific documentation for more detailed setup and configuration.

Happy coding! 