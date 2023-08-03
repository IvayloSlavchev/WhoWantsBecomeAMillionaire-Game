import { useState } from 'react';
import useWindowScreenSize from '../../../useWindowScreenSize';
import "../../Styles/JokersStyle.css"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const CallAFriend = ({ correctAnswer }: { correctAnswer: string }) => {
    const [hasJokerBeenUsed, setHasJokerBeenUsed] = useState<boolean>(false);
    const [friendAnswer, setFriendAnswer] = useState<string>("");    
    const [hasUserClickedTheJoker, setHasUserClickedTheJoker] = useState<boolean>(false);

    function callAFriendFunction() {
        if(hasJokerBeenUsed === true) return;

        setHasUserClickedTheJoker(true);
        setFriendAnswer("I think the right answer is - " + correctAnswer)
        setTimeout(() => {
            setHasJokerBeenUsed(true);
            
            setFriendAnswer("");
        }, 5000);
    }

    return (
        <div className='call-friend-joker-root-element'>
            {
                hasJokerBeenUsed ? <button className='call-friend-button' disabled={true}><LocalPhoneIcon /></button> :
                <button className='call-friend-button' onClick={() => callAFriendFunction()}><LocalPhoneIcon /></button>
            }
            { hasUserClickedTheJoker ? <p className='answer-paragraph'>{friendAnswer}</p> : null }
        </div>
    )
}

export default CallAFriend