import { useState } from 'react';
import "../../Styles/JokersStyle.css";
import useWindowScreenSize from '../../../useWindowScreenSize';

const FiftyFifty = (props: any) => {
  const [width] = useWindowScreenSize();
  const [hasJokenBeenUsed, setHasJokerBeenUsed] = useState<boolean>(false);
  const [hasUserChooseTheJoker, setHasUserChooseTheJoker] = useState<boolean>(false);

  function callFriendFunction() {
      if(hasJokenBeenUsed) return;
      setHasUserChooseTheJoker(true);
      setTimeout(() => {
          setHasJokerBeenUsed(true);
      }, 5000);
  }

  return ( 
    <div>
        {
          hasJokenBeenUsed ? <button className='fifty-fifty-button-joker'>50:50</button> : 
          <button className='fifty-fifty-button-joker'>50:50</button>
        }
    </div>
  )
}

export default FiftyFifty