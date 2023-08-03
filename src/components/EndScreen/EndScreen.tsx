import { useState, useEffect } from 'react';
import "../Styles/EndScreen.css";
import useWindowScreenSize from '../../useWindowScreenSize';
import { Link } from 'react-router-dom';

const EndScreen = () => {
    const [width, height] = useWindowScreenSize();

    const [message, setMessage] = useState<string>("");
    const [countOfAnsweredQuestions, setCountOfAnsweredQuestions] = useState<number>(0);

    const prize: number[][] = [ [100, 200, 300, 400, 500, 1000, 1500, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]];

    function hasUserAnsweredAllTheQuestionsFunction() {
        const completedSuccessfully: string | null = localStorage.getItem('hasCompleted');

        if(completedSuccessfully === "No") {
            const numberOfAnsweredQuestions: string | null = localStorage.getItem('numberOfAnsweredQuestions');

            return setMessage("Submitted wrong answer or timed out.");
        }

        setMessage("CONGRATULATIONS YOU WON 100,000lv.");
    }

    return (
        <div className='end-screen-root-element'>
            <div className='closing-quotes-class'>
                <h1>End of the game!</h1>
                <h3>{message}</h3>

            </div>

            <div className={width > 900 ? 'prizes-board-class' : 'prizes-board-class-mobile'}>
                {
                    prize.slice(0).reverse().map((item: any, index: number) => {
                        
                        return <div className='prize-paragraph' key={index}>
                            {item.reverse().map((item: any) => {return <p>{item}</p>})}
                        </div>;
                    })
                }
            </div>

            

            <div className='play-again-button-class'>
                <Link to='/'>
                    <button className='play-again-button'>Play Again</button>
                </Link>
            </div>
        </div>
    )
}

export default EndScreen