import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/memes',
    withCredentials: true
});

export const fetchMemes = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
