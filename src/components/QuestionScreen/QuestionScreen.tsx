import { useState, useEffect } from 'react';
import { musicQuestions, filmsQuestions } from '../FetchRequests/FetchRequests';
import '../Styles/QuestionScreen.css';
import useWindowScreenSize from '../../useWindowScreenSize';

import CallAFriend from './Jokers/CallAFriend';
import AudienceHelp from './Jokers/AudienceHelp';
import FiftyFifty from './Jokers/FiftyFifty';
import Timer from './Timer/Timer';

const QuestionScreen = () => {
    const [width, height] = useWindowScreenSize();

    const [questions, setQuestions] = useState<any>([]);

    const [getIndividualQuestion, setIndividualQuestion] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([]);

    const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0);
    const [providedAnswer, setProvidedAnswer] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

    function getQuestion() {
        if (providedAnswer !== correctAnswer) {
            return setIsAnswerCorrect(false);
        }

        setIndividualQuestion(questions[numberOfQuestion].question);
        setCorrectAnswer(questions[numberOfQuestion].correct_answer);
        getRandomAnswers(questions);
        setIsAnswerCorrect(true);

        if (numberOfQuestion === 0) return setNumberOfQuestion(oldIndex => oldIndex + 2);

        setNumberOfQuestion(oldIndex => oldIndex + 1);
    }

    function getRandomAnswers(providedArray: any) {
        const answersArray: string[] = [...providedArray[numberOfQuestion].incorrect_answers, providedArray[numberOfQuestion].correct_answer];
        const randomRotationOfAnswers: number = Math.floor(Math.random() * 6);
        const rotateFunction = arrayRotate(answersArray, randomRotationOfAnswers);
        setAnswers(rotateFunction);
    }

    function arrayRotate(arr: any, count: number) {
        const len = arr.length
        arr.push(...arr.splice(0, (-count % len + len) % len))
        return arr
    }


    useEffect(() => {

        (async () => {
            const getChoosenCategory: string | null = localStorage.getItem("category");
            const getChoosenDifficulty: string | null = localStorage.getItem("difficulty");

            if (getChoosenCategory === null || getChoosenCategory === null) return;

            switch (getChoosenCategory) {
                case "films":
                    const generatedFilmsQbject: any = await filmsQuestions(getChoosenDifficulty);
                    setQuestions(generatedFilmsQbject.results);
                    setIndividualQuestion(generatedFilmsQbject.results[0].question);
                    getRandomAnswers(generatedFilmsQbject.results);
                    break;
                case "music":
                    const generatedMusicObject: any = await musicQuestions(getChoosenDifficulty);
                    setQuestions(generatedMusicObject.results);
                    setIndividualQuestion(generatedMusicObject.results[0].question);
                    setCorrectAnswer(generatedMusicObject.results[0].correct_answer);
                    getRandomAnswers(generatedMusicObject.results);

                    break;
            }
        })();
    }, []);

    return (
        <div className='questions-root-element'>
            {questions.length == 0 ? <h1 className='loading-message'>Loading...</h1> : <div>
                <div className={width > 900 ? 'jokers-class' : 'jokers-class-mobile'}>
                    <CallAFriend correctAnswer={questions[numberOfQuestion].correct_answer} />
                    <AudienceHelp correctAnswer={questions[numberOfQuestion].correct_answer} />
                    <FiftyFifty />
                    <button className='' onClick={() => getQuestion()}>Next</button>
                </div>

                <div>
                    <Timer />
                </div>


                <div className='question-and-answers-classes'>
                    <div className='question-class'>
                        <h3>{numberOfQuestion}. {getIndividualQuestion}</h3>
                    </div>
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