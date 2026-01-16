import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://frontend-test-omega-nine.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Fetch list of events
  getEvents: async () => {
    const response = await apiClient.get('/api/events/');
    return response.data;
  },

  // Fetch detailed specific event by ID
  getEventDetail: async (id) => {
    const response = await apiClient.get(`/api/events/${id}/detail`);
    return response.data;
  },

  // Login 
  // Since POST/api/login is not implemented in the backend, mock the login process
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const mockToken = "mock-jwt-token-12345"; 
      localStorage.setItem('token', mockToken);
      
      // Return mock user data
      return {
        status: "success",
        message: "Login success (Mock)",
        token: mockToken,
        user: {
          email: email,
          name: "Volunteer User"
        }
      };
    } else {
      throw new Error("Email and password are required");
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    apiClient.post('/api/logout'); 
  },

  // Check authentication token 
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};