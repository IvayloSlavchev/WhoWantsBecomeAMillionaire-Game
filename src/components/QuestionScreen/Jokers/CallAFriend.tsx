import { useState } from 'react';
import "../../Styles/CallAFriend.css";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import useWindowScreenSize from '../../../useWindowScreenSize';

const CallAFriend = ({ correctAnswer }: { correctAnswer: string }) => {
    const [width, height] = useWindowScreenSize();
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
                    <button onClick={() => callFriendFunction()}>
                        <LocalPhoneIcon />
                    </button>

                    { hasUserChooseTheJoker ? <p className='friend-answer'>{friendAnswer}</p> : null }
                </div> : <button disabled={true}>
                    <LocalPhoneIcon />
                </button>
            }
        </div>
    )
}

export default CallAFriend;