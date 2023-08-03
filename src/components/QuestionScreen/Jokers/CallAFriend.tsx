import { useState } from 'react';
import "../../Styles/JokersStyle.css";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import useWindowScreenSize from '../../../useWindowScreenSize';

const CallAFriend = ({ correctAnswer }: { correctAnswer: string }) => {
    const [width] = useWindowScreenSize();
    const [hasJokenBeenUsed, setHasJokerBeenUsed] = useState<boolean>(false);
    const [friendAnswer, setFriendAnswer] = useState<string>("");
    const [hasUserChooseTheJoker, setHasUserChooseTheJoker] = useState<boolean>(false);

    function callFriendFunction() {
        if(hasJokenBeenUsed) return;

        setFriendAnswer(correctAnswer);
        setHasUserChooseTheJoker(true);
        setTimeout(() => {
            setHasJokerBeenUsed(true);
        }, 5000);
    }

    return (
        <div className='call-friend-root-element'>
            {
                !hasJokenBeenUsed ? <div className={width > 900 ? 'friends-answer-class' : 'friends-answer-class-mobile'}>
                    <button className='call-friend-button' onClick={() => callFriendFunction()}>
                        <LocalPhoneIcon />
                    </button>

                    <p className='friend-answer'>{hasUserChooseTheJoker ? friendAnswer : null}</p>
                </div> : <button className='call-friend-button' disabled={true}>
                    <LocalPhoneIcon />
                </button>
            }
        </div>
    )
}

export default CallAFriend;