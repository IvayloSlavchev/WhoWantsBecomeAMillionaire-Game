import { useState, useEffect } from 'react';
import { musicQuestions, filmsQuestions } from '../FetchRequests/FetchRequests';
import '../Styles/QuestionScreen.css';
import useWindowScreenSize from '../../useWindowScreenSize';

import CallAFriend from './Jokers/CallAFriend';
import AudienceHelp from './Jokers/AudienceHelp';
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

    const [isFiftyFiftyJokerUsed, setIsFiftyFiftyJokerUsed] = useState<boolean>(false);

    function getQuestion() { 
        if (numberOfQuestion === 15) {
            setNumberOfAnsweredQuestions(oldCountOfAnsweredQuestions => oldCountOfAnsweredQuestions + 1);
            localStorage.setItem("countOfAnsweredQuestions", numberOfAnsweredQuestions.toString());
            return window.location.href = '/finish';
        }

        if (providedAnswer !== correctAnswer) {
            setRightOrWrongAnswer('red'); // Red means that the answer is wrong
            return window.location.href = '/finish';
        } 

        setTimeout(() => {
            setIndividualQuestion(questions[numberOfQuestion].question);
            setCorrectAnswer(questions[numberOfQuestion].correct_answer);
            getRandomAnswers(questions);
        }, 10); // Should pass some time in order to see whether your answer is correct or not

        // I store the number of answered questions in the local storage in order to fetch them in the end screen
        // I clear them every time user clicks play again button or clicks back button on the browser
        localStorage.setItem("countOfAnsweredQuestions", numberOfAnsweredQuestions.toString());

        setNumberOfQuestion(oldQuestionNumber => oldQuestionNumber + 1);
        setNumberOfAnsweredQuestions(oldCountOfAnsweredQuestions => oldCountOfAnsweredQuestions + 1);
        
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

    function fiftyFiftyJokerFunction() {
        const randomWrongAnswer: number = Math.floor(Math.random() * 3);

        //The wrong answer should not be the correct one
        const arrayOfWrongAnswer = answers.filter((answer: string) => {
            return answer !== correctAnswer;
        })
        
        //When user use this joker it should remove two of the incorrect answers and display the correct one
        //And one of the wrong answers, I am choosing random wrong answer
        const slicedArray: string[] = [arrayOfWrongAnswer[randomWrongAnswer], correctAnswer];
        arrayRotate(slicedArray, randomWrongAnswer);
        setAnswers(slicedArray);
        setIsFiftyFiftyJokerUsed(true);
    }

    async function getFirstQuestion() {
        //When user chooses category and difficulty, they will be stored in the local storage
        //In order to make fetch request to the API

        const getChoosenCategory: string | null = localStorage.getItem("category");
        const getChoosenDifficulty: string | null = localStorage.getItem("difficulty");

        //If user tries to get to the page without choosing category, he/she will be redirected
        if (getChoosenCategory === null || getChoosenCategory === null) return window.location.href = '/';

        //Making statemnets to see which category user choosed and call that specific function
        switch (getChoosenCategory) {
            case "films":
                const generatedFilmsQbject: any = await filmsQuestions(getChoosenDifficulty);

                setQuestions(generatedFilmsQbject.results);
                setIndividualQuestion(generatedFilmsQbject.results[numberOfQuestion].question);
                setCorrectAnswer(generatedFilmsQbject.results[numberOfQuestion].correct_answer);
                getRandomAnswers(generatedFilmsQbject.results);
                setNumberOfQuestion(oldState => oldState + 1);

                localStorage.removeItem("countOfAnsweredQuestions");
                break;
            case "music":
                const generatedMusicObject: any = await musicQuestions(getChoosenDifficulty);

                setQuestions(generatedMusicObject.results);
                setIndividualQuestion(generatedMusicObject.results[numberOfQuestion].question);
                setCorrectAnswer(generatedMusicObject.results[numberOfQuestion].correct_answer);
                getRandomAnswers(generatedMusicObject.results);

                setNumberOfQuestion(oldState => oldState + 1);

                localStorage.removeItem("countOfAnsweredQuestions");
                break;
        }

    }

    useEffect(() => {
        getFirstQuestion();
    }, []);

    return (
        <div className='questions-root-element'>
            {questions.length == 0 ? <h1 className='loading-message'>Loading...</h1> : <div>
                <div className={width > 1200 ? 'jokers-class' : 'jokers-class-mobile'}>
                    <CallAFriend correctAnswer={correctAnswer} />
                    <AudienceHelp correctAnswer={correctAnswer} />

                    {/*
                        @dev I didn't make another component for 50:50 joker,
                        because it will be easier to do the functionality here
                    */}
                    <button onClick={() => {
                        fiftyFiftyJokerFunction();
                    }} disabled={isFiftyFiftyJokerUsed ? true : false} className='fifty-fifty-button-joker'>50:50</button>

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

                    {/* 
                        If answer is been choosed and user validates his answer it will restart the timer
                        (only if the answer is correct)
                    */}
                    <Timer hasAnswerBeenChoosed={hasAnswerBeenChoosed} />
                </div>

                <div className='question-and-answers-classes'>
                    <div className='question-class'>
                        <h3>{numberOfQuestion}. {getIndividualQuestion}</h3>
                    </div>

                    <div className='answers-class' >
                        {
                            answers.map((item: any, index: number) => {
                                return <div key={index} style={{ background: correctAnswer == item && isNextQuestionButtonClicked ? 'lightgreen' : '' }}>
                                    <button
                                    onClick={() => { 
                                        setProvidedAnswer(item);
                                        setRightOrWrongAnswer('orange') // When user marks some question it will make the background orange
                                                                        // While the function validates the answer
                                    }}
                                    style={{ background: item == providedAnswer ? rightOrWrongAnswer : ''}}
                                    className='answer-button'
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