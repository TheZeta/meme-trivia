import { useState, useEffect } from "react";
import Question from "./components/Question";
import "./styles/Layout.css";
import { fetchQuestions } from "./helpers/questions";
import { manageScore } from "./helpers/scoreboard";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answersContainer, setAnswersContainer] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedQuestions = await fetchQuestions();
            setQuestions(fetchedQuestions);
        };
        fetchData();
    }, []);

    const handleNextQuestion = async (customObject) => {
        setAnswersContainer(prev => [...prev, customObject]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setTimeout(() => {  // Ensure the state update is completed before calling manageScore
                manageScore([...answersContainer, customObject]);
                setTimeout(() => {  // Introduce a 1-second delay before navigating
                    navigate("/scoreboard");
                }, 1000);
            }, 0);
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h3>Question {currentQuestionIndex + 1}</h3>
            <Question 
                meme={questions[currentQuestionIndex].meme} 
                captions={questions[currentQuestionIndex].captions} 
                handleNextQuestion={handleNextQuestion} 
            />
        </>
    );
};

export default Questionnaire;
