import { useState, useEffect } from 'react';
import { musicQuestions, filmsQuestions } from '../FetchRequests/FetchRequests';
import '../Styles/QuestionScreen.css';
import useWindowScreenSize from '../../useWindowScreenSize';

import CallAFriend from './Jokers/CallAFriend';
import AudienceHelp from './Jokers/AudienceHelp';
import FiftyFifty from './Jokers/FiftyFifty';
import Timer from './Timer/Timer';

const QuestionScreen = () => {
    const [width] = useWindowScreenSize();

    const [questions, setQuestions] = useState<any>([]);

    const [getIndividualQuestion, setIndividualQuestion] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([]);

    const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0);
    const [providedAnswer, setProvidedAnswer] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<string>("");

    const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState<number>(1);
    const [hasAnswerBeenChoosed, setHasAnswerBeenChoosed] = useState<boolean>(true);

    const [rightOrWrongAnswer, setRightOrWrongAnswer] = useState<string>("");
    const [isNextQuestionButtonClicked, setIsNextQuestionButtonClicked] = useState<boolean>(false);

    function getQuestion() {
        if (numberOfQuestion === 15) {
            setNumberOfAnsweredQuestions(oldCount => oldCount + 1);
            localStorage.setItem("countOfAnsweredQuestion", numberOfAnsweredQuestions.toString());
            return window.location.href = '/finish';
        }

        if (providedAnswer !== correctAnswer) {
            setRightOrWrongAnswer('red');
            return window.location.href = '/finish';
        } 

        setTimeout(() => {
            setIndividualQuestion(questions[numberOfQuestion].question);
            setCorrectAnswer(questions[numberOfQuestion].correct_answer);
            getRandomAnswers(questions);
        }, 10);

        localStorage.setItem("countOfAnsweredQuestion", numberOfAnsweredQuestions.toString());

        setNumberOfQuestion(oldIndex => oldIndex + 1);
        setNumberOfAnsweredQuestions(oldCount => oldCount + 1);
        
    }

    function getRandomAnswers(providedArray: any) {
        const answerArray: string[] = [...providedArray[numberOfQuestion].incorrect_answers, providedArray[numberOfQuestion].correct_answer];
        const randomRotationOfArray: number = Math.floor(Math.random() * 6);
        arrayRotate(answerArray, randomRotationOfArray);
        setAnswers(answerArray);
        return answerArray;
    }

    function arrayRotate(providedArray: any, numberOfRotations: number) {
        const arrayLength: number = providedArray.length;
        providedArray.push(...providedArray.splice(0, (-numberOfRotations % arrayLength + arrayLength) % arrayLength));
        return providedArray;
    }

    async function getFirstQuestion() {
        const getChoosenCategory: string | null = localStorage.getItem("category");
        const getChoosenDifficulty: string | null = localStorage.getItem("difficulty");

        if (getChoosenCategory === null || getChoosenCategory === null) return;

        switch (getChoosenCategory) {
            case "films":
                const generatedFilmsQbject: any = await filmsQuestions(getChoosenDifficulty);

                setQuestions(generatedFilmsQbject.results);
                setIndividualQuestion(generatedFilmsQbject.results[numberOfQuestion].question);
                setCorrectAnswer(generatedFilmsQbject.results[numberOfQuestion].correct_answer);
                getRandomAnswers(generatedFilmsQbject.results);
                setNumberOfQuestion(oldState => oldState + 1);

                localStorage.removeItem("countOfAnsweredQuestion");
                break;

            case "music":
                const generatedMusicObject: any = await musicQuestions(getChoosenDifficulty);

                setQuestions(generatedMusicObject.results);
                setIndividualQuestion(generatedMusicObject.results[numberOfQuestion].question);
                setCorrectAnswer(generatedMusicObject.results[numberOfQuestion].correct_answer);
                getRandomAnswers(generatedMusicObject.results);

                setNumberOfQuestion(oldState => oldState + 1);

                localStorage.removeItem("countOfAnsweredQuestion");
                break;
        }

    }

    useEffect(() => {
        getFirstQuestion();
    }, []);

    return (
        <div className='questions-root-element'>
            {questions.length == 0 ? <h1 className='loading-message'>Loading...</h1> : <div>
                <div className={width > 1100 ? 'jokers-class' : 'jokers-class-mobile'}>
                    <CallAFriend correctAnswer={correctAnswer} />
                    <AudienceHelp correctAnswer={correctAnswer} />
                    <FiftyFifty />
                    <button className='next-question-button' onClick={() => {
                        setHasAnswerBeenChoosed(false);
                        setIsNextQuestionButtonClicked(true);
                        setTimeout(() => {
                            setHasAnswerBeenChoosed(true);
                        }, 1000);
                        setTimeout(() => {
                            setIsNextQuestionButtonClicked(false);
                        }, 5);
                        getQuestion();
                    }}>Next</button>
                    <Timer hasAnswerBeenChoosed={hasAnswerBeenChoosed} />
                </div>

                <div className='question-and-answers-classes'>
                    <div className='question-class'>
                        <h3>{numberOfQuestion}. {getIndividualQuestion}</h3>
                    </div>

                    <div className='answers-class' >
                        {
                            answers.map((item: any, index: number) => {
                                return <div style={{ background: correctAnswer == item && isNextQuestionButtonClicked ? 'lightgreen' : '' }}>
                                    <button
                                    onClick={() => { 
                                        setProvidedAnswer(item);
                                        setRightOrWrongAnswer('orange')
                                    }}
                                    style={{ background: item == providedAnswer ? rightOrWrongAnswer : ''}}
                                    className='answer-button' key={index}
                                    >
                                    {index == 0 ? "A:" : null} {index == 1 ? "B:" : null} {index == 2 ? "C:" : null} {index == 3 ? "D:" : null} {item}    
                                    </button>
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>}
        </div>
    )
}

export default QuestionScreen