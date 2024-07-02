import { fetchMemes } from "../services/memes";
import { fetchCaptions } from "../services/captions";

export const fetchQuestions = async () => {
    try {
        const memes = await fetchMemes();
        const questionsPromises = memes.map(async (meme) => {
            const captions = await fetchCaptions(meme.best_caption1_id, meme.best_caption2_id);
            return {
                meme,
                captions
            };
        });
        const questions = await Promise.all(questionsPromises);
        return questions;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
};
