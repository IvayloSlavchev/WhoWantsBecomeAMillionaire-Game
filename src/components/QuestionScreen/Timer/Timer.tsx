import { useState, useEffect } from "react";
import "../../Styles/Timer.css";

const Timer = () => {
    const [timer, setTimer] = useState<number>(60);

    function startCountdown() {
    }
    
    useEffect(() => {
    
        let interval: number = 0;
        
        if(timer > 0) {
            // interval = setInterval(() => setTimer(oldState => oldState - 1), 1000);
            // return () => {
            //     clearInterval(interval);
            // }
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