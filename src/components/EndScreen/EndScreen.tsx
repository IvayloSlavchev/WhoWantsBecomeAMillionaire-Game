import { useState, useEffect } from 'react';
import "../Styles/EndScreen.css";

const EndScreen = () => {
    const [message, setMessage] = useState<string>("");
    const [countOfAnsweredQuestions, setCountOfAnsweredQuestions] = useState<number>(0);

    const prize: number[] = [0, 100, 200, 300, 400, 500, 1000, 1500, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000];
    
    function hasUserAnsweredAllTheQuestionsFunction() {
        const completedSuccessfully: string | null = localStorage.getItem('hasCompleted');

        if(completedSuccessfully === "No") {
            const numberOfAnsweredQuestions: string | null = localStorage.getItem('numberOfAnsweredQuestions');

            setMessage("Submitted wrong answer or timed out.");
        }

        setMessage("CONGRATULATIONS YOU WON 100,000lv.");
    }

    useEffect(() => {

    }, [])

    return (
        <div className='end-screen-root-element'>
            <div className='closing-quotes-class'>
                <h1>End of the game!</h1>


            </div>

            <div className='prizes-board-class'>
                {
                    prize.reverse().map((item: any, index: number) => {
                        
                        return <p key={index}>{item}</p>;
                    })
                }
            </div>

            <div className='play-again-button-class'>
                <button>Play Again</button>
            </div>
        </div>
    )
}

export default EndScreen