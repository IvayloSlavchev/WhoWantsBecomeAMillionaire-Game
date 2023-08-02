import { useState, useEffect } from 'react';
import { geographyQuestions, sportsQuestions } from '../FetchRequests/FetchRequests';
import '../Styles/QuestionScreen.css';
import useWindowScreenSize from '../../useWindowScreenSize';

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
        console.log(correctAnswer);
        console.log(numberOfQuestion);
        console.log(questions[numberOfQuestion].question);
        
        

        if(providedAnswer !== correctAnswer) {
            return setIsAnswerCorrect(false);
        }

        setIndividualQuestion(questions[numberOfQuestion].question);
        setCorrectAnswer(questions[numberOfQuestion].correct_answer);
        getRandomAnswers(questions);
        setIsAnswerCorrect(true);

        if(numberOfQuestion === 0) return setNumberOfQuestion(oldIndex => oldIndex + 2);

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
                case "sports":
                    const generatedSportQbject: any = await sportsQuestions(getChoosenDifficulty);
                    setQuestions(generatedSportQbject.results);    
                    setIndividualQuestion(generatedSportQbject.results[0].question);
                    getRandomAnswers(generatedSportQbject.results);
                break;
                case "geography":
                    const generatedGeographyObject: any = await geographyQuestions(getChoosenDifficulty);
                    setQuestions(generatedGeographyObject.results);    
                    setIndividualQuestion(generatedGeographyObject.results[0].question);
                    setCorrectAnswer(generatedGeographyObject.results[0].correct_answer);
                    getRandomAnswers(generatedGeographyObject.results);
                    
                break;
            }
        })();
    }, []);

    return (
        <div className='questions-root-element'>
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

            <div className='jokers-class'>
                <button className='' onClick={() => getQuestion()}>Next</button>
                <button></button>
                <button></button>
            </div>

            <h1>{isAnswerCorrect ? "Yeee" : "Nein"}</h1>
        </div>
    )
}

export default QuestionScreen