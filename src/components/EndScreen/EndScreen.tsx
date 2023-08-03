import { useState, useEffect } from 'react';
import "../Styles/EndScreen.css";
import useWindowScreenSize from '../../useWindowScreenSize';
import { Link } from 'react-router-dom';

const EndScreen = () => {
    const [width] = useWindowScreenSize();

    const [message, setMessage] = useState<string>("");
    const [countOfAnsweredQuestions, setCountOfAnsweredQuestions] = useState<number>(0);
    const [prizeAndAnsweredQuestion, setPrizeAndAnsweredQuestion] = useState<any>([]);

    function addPrizesAndNumberOfQuestion() {
        const prizeArray: number[] = [0, 100, 200, 300, 400, 500, 1000, 1500, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000];
        const prizesObject: any = {};

        for (let i = 1; i < prizeArray.length; i++) {
            prizesObject[i] = prizeArray[i];
        }

        setPrizeAndAnsweredQuestion(prizesObject);
    }

    function hasUserAnsweredAllTheQuestionsFunction() {
        const numberOfAnsweredQuestions: any = localStorage.getItem('countOfAnsweredQuestion');

        setCountOfAnsweredQuestions(Number(numberOfAnsweredQuestions));
        if (numberOfAnsweredQuestions !== '15') {
            return setMessage("Submitted wrong answer or timed out.");
        }
        setMessage("CONGRATULATIONS YOU WON 100,000lv.");
    }

    useEffect(() => {
        hasUserAnsweredAllTheQuestionsFunction();
        addPrizesAndNumberOfQuestion();
    }, [])

    return (
        <div className='end-screen-root-element'>
            <div className='end-screen-sub-parent'>
                <div className='closing-quotes-class'>
                    <h1>End of the game!</h1>
                    <h3>{message}</h3>
                    <h3>Answered questions: {countOfAnsweredQuestions}</h3>

                </div>

                <div className={width > 1400 ? 'prizes-board-class' : 'prizes-board-class-mobile'}>
                    {
                        Object.keys(prizeAndAnsweredQuestion).reverse().map((item: any, index) => {
                            return <p className={ width > 1400 ? 'prize-paragraph' : 'prize-paragraph-mobile' } style={{ background: item == countOfAnsweredQuestions ? 'white' : '', color: item == countOfAnsweredQuestions ? 'black' : '' }} key={index}>{item}: {prizeAndAnsweredQuestion[item]}</p>
                        })
                    }

                </div>



                <div className='play-again-button-class'>
                    <Link to='/'>
                        <button className='play-again-button' onClick={() => {
                            localStorage.removeItem("difficulty");
                            localStorage.removeItem("category");
                            localStorage.removeItem("countOfAnsweredQuestion");
                        }}>Play Again</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EndScreen