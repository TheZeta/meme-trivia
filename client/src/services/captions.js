import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/captions',
    withCredentials: true
});

export const fetchCaptions = async (best_caption_1, best_caption_2) => {
    try {
        const response = await api.get('/', {
            params: {
                best_caption_1: best_caption_1,
                best_caption_2: best_caption_2
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching captions:', error);
        throw error;
    }
};
