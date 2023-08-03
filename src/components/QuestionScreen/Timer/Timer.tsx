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
            window.location.href = '/finish';
        }
    }, [timer])

    return (
        <div className='timer-root-element'>
            {timer}
        </div>
    )
}

export default Timer