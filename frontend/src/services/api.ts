import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api' // In production, use relative path
    : 'http://localhost:8000/api', // In development, use the full URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with an error status
      console.error('API Error:', error.response.status, error.response.data);
      
      // Handle 401 Unauthorized errors (token expired, etc.)
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        // You might want to redirect to login page here
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('API No Response:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('API Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Mock API responses for development
const useMockData = process.env.NODE_ENV === 'development';

// API wrapper with mock data support
const apiService = {
  get: async (url: string, config?: any) => {
    if (useMockData) {
      // Return mock data based on the URL
      const mockData = getMockDataForUrl(url);
      if (mockData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockData };
      }
    }
    return api.get(url, config);
  },
  
  post: async (url: string, data?: any, config?: any) => {
    if (useMockData) {
      // Handle mock responses for POST requests
      const mockResponse = getMockResponseForPost(url, data);
      if (mockResponse) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockResponse };
      }
    }
    return api.post(url, data, config);
  },
  
  put: async (url: string, data?: any, config?: any) => {
    if (useMockData) {
      // Handle mock responses for PUT requests
      const mockResponse = getMockResponseForPut(url, data);
      if (mockResponse) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockResponse };
      }
    }
    return api.put(url, data, config);
  },
  
  delete: async (url: string, config?: any) => {
    if (useMockData) {
      // Handle mock responses for DELETE requests
      const mockResponse = getMockResponseForDelete(url);
      if (mockResponse) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockResponse };
      }
    }
    return api.delete(url, config);
  },
};

// Mock data functions
function getMockDataForUrl(url: string): any {
  // Return different mock data based on the URL
  if (url.includes('/reports')) {
    return {
      reports: [
        { 
          id: '1', 
          title: 'Market Overview Q2 2023', 
          description: 'Comprehensive analysis of market trends in Q2 2023',
          report_type: 'market_overview',
          created_at: '2023-06-15T10:30:00Z', 
          status: 'completed',
          format: 'pdf',
          download_url: '#'
        },
        { 
          id: '2', 
          title: 'Competitor Analysis', 
          description: 'Detailed analysis of key competitors',
          report_type: 'competitor_analysis',
          created_at: '2023-05-20T14:45:00Z', 
          status: 'completed',
          format: 'docx',
          download_url: '#'
        },
        { 
          id: '3', 
          title: 'Consumer Trends 2023', 
          description: 'Analysis of emerging consumer trends',
          report_type: 'trend_report',
          created_at: '2023-04-10T09:15:00Z', 
          status: 'generating',
          format: 'pdf',
          download_url: '#'
        },
      ]
    };
  }
  
  if (url.includes('/dashboard')) {
    return {
      stats: {
        totalReports: 24,
        activeCompetitors: 8,
        dataCollectionSources: 12,
        insightsGenerated: 156
      },
      recentActivity: [
        { id: 1, action: 'Report Generated', item: 'Q2 Market Analysis', timestamp: '2023-06-15T10:30:00Z' },
        { id: 2, action: 'Competitor Added', item: 'TechCorp Inc.', timestamp: '2023-06-14T14:45:00Z' },
        { id: 3, action: 'Data Collection', item: 'Social Media Trends', timestamp: '2023-06-13T09:15:00Z' },
      ]
    };
  }
  
  // Default empty response
  return null;
}

function getMockResponseForPost(url: string, data: any): any {
  if (url.includes('/reports/generate')) {
    return {
      id: String(Math.floor(Math.random() * 1000)),
      title: data.title || 'New Report',
      description: data.description || 'Generated report',
      report_type: data.report_type || 'market_overview',
      created_at: new Date().toISOString(),
      status: 'completed',
      format: data.format || 'pdf',
      download_url: '#',
      summary: 'This is a mock report generated for development purposes. It contains sample data and insights.'
    };
  }
  
  if (url.includes('/auth/login')) {
    return {
      token: 'mock-jwt-token',
      user: {
        id: '1',
        name: 'Test User',
        email: data.email || 'test@example.com',
        role: 'admin'
      }
    };
  }
  
  // Default empty response
  return null;
}

function getMockResponseForPut(url: string, data: any): any {
  // Handle PUT mock responses
  return null;
}

function getMockResponseForDelete(url: string): any {
  // Handle DELETE mock responses
  return { success: true };
}

export default apiService; 