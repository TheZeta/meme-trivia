import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/scores',
    withCredentials: true
});

export const fetchLastScore = async () => {
    try {
        const response = await api.get('/last');
        return response.data;
    } catch (error) {
        console.error('Error fetching score:', error);
        throw error;
    }
};

export const registerScore = async (questions) => {
    try {
        const response = await api.post('/', { questions });
        return response.data;
    } catch (error) {
        console.error('Error registering score:', error);
        throw error;
    }
};

export const fetchScoresByUserId = async () => {
    try {
        const response = await api.get(`/`); 
        return response.data;
    } catch (error) {
        console.error('Error fetching scores:', error);
        throw error;
    }
};

export const fetchScoreByScoreId = async (score_id) => {
    try {
        const response = await api.get(`/${score_id}`); 
        return response.data;
    } catch (error) {
        console.error('Error fetching scores:', error);
        throw error;
    }
};
