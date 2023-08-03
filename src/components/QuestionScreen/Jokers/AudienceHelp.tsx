import { useState } from 'react';
import useWindowScreenSize from '../../../useWindowScreenSize';
import "../../Styles/JokersStyle.css";
import Diversity3Icon from '@mui/icons-material/Diversity3';

const AudienceHelp = ({ correctAnswer }: { correctAnswer: string }) => {
    const [hasJokerBeenUsed, setHasJokerBeenUsed] = useState<boolean>(false);
    const [friendAnswer, setFriendAnswer] = useState<string>("");    
    const [hasUserClickedTheJoker, setHasUserClickedTheJoker] = useState<boolean>(false);

    function callAFriendFunction() {
        if(hasJokerBeenUsed === true) return;

        setHasUserClickedTheJoker(true);
        setFriendAnswer("We think the right answer is - " + correctAnswer)
        setTimeout(() => {
            setHasJokerBeenUsed(true);
            
            setFriendAnswer("");
        }, 5000);
    }

    return (
        <div className='audience-joker-root-element'>
            {
                hasJokerBeenUsed ? <button className='audience-button-help' disabled={true}><Diversity3Icon /></button> :
                <button className='audience-button-help' onClick={() => callAFriendFunction()}><Diversity3Icon /></button>
            }
            { hasUserClickedTheJoker ? <p className='answer-paragraph'>{friendAnswer}</p> : null }
        </div>
    )
}

export default AudienceHelp