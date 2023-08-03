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
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

    const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState<number>(1);

    function getQuestion() {
        if(numberOfQuestion === 15) {
            setNumberOfAnsweredQuestions(oldCount => oldCount + 1);
            localStorage.setItem("countOfAnsweredQuestion", numberOfAnsweredQuestions.toString());
            return window.location.href = '/finish';
        }

        if(providedAnswer !== correctAnswer) {
            return window.location.href = '/finish';
        }

        setIndividualQuestion(questions[numberOfQuestion].question);
        setCorrectAnswer(questions[numberOfQuestion].correct_answer);
        getRandomAnswers(questions);

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

    function arrayRotate(arr: any, count: number) {
        const len = arr.length
        arr.push(...arr.splice(0, (-count % len + len) % len))
        return arr
    }

    async function getFirstQuestion() {
        const getChoosenCategory: string | null = localStorage.getItem("category");
        const getChoosenDifficulty: string | null = localStorage.getItem("difficulty");

        if (getChoosenCategory === null || getChoosenCategory === null) return;

        if(getChoosenCategory == "films") {
            const generatedFilmsQbject: any = await filmsQuestions(getChoosenDifficulty);

            setQuestions(generatedFilmsQbject.results);
            setIndividualQuestion(generatedFilmsQbject.results[numberOfQuestion].question);
            setCorrectAnswer(generatedFilmsQbject.results[numberOfQuestion].correct_answer);
            getRandomAnswers(generatedFilmsQbject.results);
            setNumberOfQuestion(oldState => oldState + 1);

            localStorage.removeItem("countOfAnsweredQuestion");

            return;
        } else if(getChoosenCategory === "music") {
            const generatedMusicObject: any = await musicQuestions(getChoosenDifficulty);
            
            setQuestions(generatedMusicObject.results);
            setIndividualQuestion(generatedMusicObject.results[numberOfQuestion].question);
            setCorrectAnswer(generatedMusicObject.results[numberOfQuestion].correct_answer);
            getRandomAnswers(generatedMusicObject.results);

            setNumberOfQuestion(oldState => oldState + 1);

            localStorage.removeItem("countOfAnsweredQuestion");
            return;

        }

    }

    useEffect(() => {   
        getFirstQuestion();

    }, []);

    return (
        <div className='questions-root-element'>
            {questions.length == 0 ? <h1 className='loading-message'>Loading...</h1> : <div>
               <div className='jokers-timer-and-next-question-button'>
                    <div className='timer-and-next-question-buttton'>
                        <Timer />
                        <button className='next-question-button' onClick={() => getQuestion()}>Next</button>
                    </div>

                    <div className={width > 900 ? 'jokers-class' : 'jokers-class-mobile'}>
                        <CallAFriend correctAnswer={correctAnswer} />
                        <AudienceHelp correctAnswer={correctAnswer} />
                        <FiftyFifty />
                        
                    </div>
               </div>

                <div className='question-and-answers-classes'>
                    <div className='question-class'>
                        <h3>{numberOfQuestion}. {getIndividualQuestion}</h3>
                    </div>

                    {correctAnswer}
                    <div className='answers-class' >
                        {
                            answers.map((item: any, index: number) => {
                                return <button
                                    className='answer-button' key={index}
                                    onClick={() => setProvidedAnswer(item)}
                                    style={{ background: isAnswerCorrect ? 'darkgreen' : 'red' }}
                                >
                                    {index == 0 ? "A" : null} {index == 1 ? "B" : null} {index == 2 ? "C" : null} {index == 3 ? "D" : null}:
                                    {item}</button>
                            })
                        }
                    </div>
                </div>

            </div>}

        </div>
    )
}

export default QuestionScreen