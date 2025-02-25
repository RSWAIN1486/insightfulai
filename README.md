# InsightfulAI

InsightfulAI is a comprehensive platform for collecting, analyzing, and reporting on market intelligence data. It helps businesses track competitors, monitor market trends, and make data-driven decisions.

## Project Structure

The project is organized into two main components:

### Backend (API)

- Built with Node.js, Express, and MongoDB
- RESTful API architecture
- JWT authentication
- Modular structure for easy maintenance and scalability

### Frontend

- Built with React, TypeScript, and Material UI
- Modern, responsive UI
- Component-based architecture
- State management with React Query

## Features

- **User Management**: Registration, authentication, and profile management
- **Data Collection**: Gather data from various sources including social media, websites, and news
- **Analysis**: Process and analyze collected data to extract insights
- **Reports**: Generate customized reports based on analyzed data
- **Competitor Tracking**: Monitor competitors' activities and market positioning

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/insightfulai.git
   cd insightfulai
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/insightfulai
     JWT_SECRET=your_jwt_secret
     ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

## API Documentation

The API documentation is available at `/api/docs` when the backend server is running.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material UI for the component library
- Chart.js for data visualization
- React Query for state management 