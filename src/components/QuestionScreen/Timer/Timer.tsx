import { useState, useEffect } from "react";
import "../../Styles/Timer.css";

const Timer = ({ hasAnswerBeenChoosed }: { hasAnswerBeenChoosed: boolean }) => {
    const [timer, setTimer] = useState<number>(60);

    useEffect(() => {
        let interval: number = 0;

        if(hasAnswerBeenChoosed === false) setTimer(60);

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(oldCount => oldCount - 1);
            }, 1000);

            return () => {
                clearInterval(interval)
            }
        } else {
            //If timer reaches 0 and user did not choosed any answer it will redirect him to the end screen
            window.location.href = '/finish';
        }
    }, [timer])

    return (
        <div className='timer-root-element'>
            <div className="timer-class">{timer}</div>
        </div>
    )
}

export default Timer