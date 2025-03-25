# InsightfulAI Project

InsightfulAI is a comprehensive market intelligence platform designed to help businesses collect, analyze, and report on market data. The platform enables users to track competitors, monitor market trends, and make data-driven decisions through AI-powered analytics.

## Key Features

- **Data Collection**: Automated gathering from multiple sources including social media, web content, and news articles
- **Advanced Analytics**: 
  - Sentiment Analysis
  - Trend Detection
  - Entity Extraction
  - Topic Modeling
- **Competitor Tracking**: Monitor competitor activities, products, and market positioning
- **Interactive Dashboards**: Visualize market data and insights
- **Customizable Reports**: Generate detailed market analysis reports

## Demo
Check out the demo video to see the application in action.



https://github.com/user-attachments/assets/a7156e8d-8c10-47b5-9152-eee08c4d70ac




## Technical Stack

### Backend

The backend server is built using FastAPI and runs on Uvicorn. It utilizes:
- PostgreSQL for structured data
- MongoDB for unstructured data
- Redis for caching and task queuing
- Celery for background task processing

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
- The platform requires various API keys for external services (Twitter, LinkedIn, etc.). Make sure to configure these in your environment.
- For detailed API documentation, visit the `/docs` endpoint after starting the backend server.
- The frontend includes responsive design and modern UI components using Material-UI.

## Security Considerations

- All API endpoints are protected with JWT authentication
- Sensitive data is encrypted at rest
- API rate limiting is implemented to prevent abuse
- CORS is configured for secure frontend-backend communication

## Getting Started

1. Clone the repository
2. Set up the backend dependencies and environment variables
3. Set up the frontend dependencies
4. Start both servers following the instructions above
5. Visit the frontend application at http://localhost:3000

For detailed setup instructions and configuration options, please refer to the documentation in the `docs` directory.

Happy coding! 
