import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/auth',
    withCredentials: true
});

export const registerUser = async (username, password) => {
    try {
        const response = await api.post('/register', { username, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await api.get('/logout');
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

export const userIsLoggedIn = async () => {
    try {
        const response = await api.get('/status');
        return response.data.isAuthenticated;
    } catch (error) {
        console.error('Error checking auth status:', error);
        throw error;
    }
};

export const getUserStatus = async () => {
    try {
      const response = await api.get('/status');
      return response.data;
    } catch (error) {
      console.error('Error fetching user status:', error);
      throw error;
    }
  };
