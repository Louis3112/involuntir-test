import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  getEvents: async () => {
    const response = await apiClient.get('/api/events');
    return response.data;
  },

  getDetailEvent: async (id) => {
    const response = await apiClient.get(`/api/events/${id}/detail`);
    return response.data;
  }
};