import { useState } from  'react';
import "../../Styles/JokersStyle.css";
import Diversity3Icon from '@mui/icons-material/Diversity3';

const AudienceHelp = ({ correctAnswer } : { correctAnswer: string }) => {
    const [hasJokerBeenUsed, setHasJokerBeenUsed] = useState<boolean>(false);
    const [audienceAnswerHook, setAudienceAnswer] = useState<string>("");
    const [hasUserChooseTheJoker, setHasUserChooseTheJoker] = useState<boolean>(false);

    function askAudienceForHelp() {
        if(hasJokerBeenUsed) return;

        setAudienceAnswer(correctAnswer);
        setHasUserChooseTheJoker(true);
        setTimeout(() => {
            setHasJokerBeenUsed(true);
        }, 5000);
    }

    return (
       <div className='audience-root-element'>
            {
                !hasJokerBeenUsed ? <div className='audience-answer-class'>
                    <button className='audience-button' onClick={() => askAudienceForHelp()}>
                        <Diversity3Icon />
                    </button>
                    <p className='audience-answer'>{hasUserChooseTheJoker ? audienceAnswerHook : null}</p>
                </div> : <button className='audience-button' disabled={true}>
                    <Diversity3Icon />
                </button>
            }
       </div>
    )
}

export default AudienceHelp