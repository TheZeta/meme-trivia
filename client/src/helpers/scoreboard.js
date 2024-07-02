import { userIsLoggedIn } from '../services/authentication';
import { registerScore } from '../services/scores';

export const manageScore = async (questions) => {
    if (userIsLoggedIn()) {
        const result = await registerScore(questions);
    }
};
