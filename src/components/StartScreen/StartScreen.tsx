import { useState } from 'react';
import StartScreenImage from '../../images/startScreen.png';
import "../Styles/StartScreen.css";
import useWindowScreenSize from '../../useWindowScreenSize';
import { Link } from 'react-router-dom';

const StartScreen = () => {
    const [width] = useWindowScreenSize();
    const [isStartButtonClicked, setIsStartButtonClicked] = useState<boolean>(false);
    const [choosenCategory, setChoosenCategory] = useState<string>("Choose Here");
    const [choosenDifficulty, setChoosenDifficulty] = useState<string>("Choose Here");

    return (
        <div className='start-screen-root-element'>
            <div className="logo-image-class">
                <img 
                    src={StartScreenImage} 
                    alt="Who wants to become a millionaire logo" 
                    className={width > 900 ? 'game-logo-image' : 'game-logo-image-mobile'}
                />
            </div>

            <div className='start-button-and-category-dropdown-class'>
                <button className={ width > 900 ? 'start-button' : 'start-button-mobile' } onClick={() => setIsStartButtonClicked(true)}>Start Game</button>

                {
                    isStartButtonClicked ? <div className='category-dropdown'>
                        <h2>Category: </h2>

                        <select className={ width > 900 ? 'category-dropdown-menu' : 'category-dropdown-menu-mobile' } onClick={(event: any) => setChoosenCategory(event.target.value)}>
                            <option className='dropdown-option' selected value="Default value">Choose Here</option>
                            <option className='dropdown-option' value="Music">Music</option>
                            <option className='dropdown-option' value="Films">Films</option>
                        </select>

                        <h2>Difficulty: </h2>

                        <select className={ width > 900 ? 'difficulty-dropdown-menu' : 'difficulty-dropdown-menu-mobile' } onClick={(event: any) => setChoosenDifficulty(event.target.value)}>
                            <option value="Default value" selected className='dropdown-option'>Choose Here</option>
                            <option value="Easy" className='dropdown-option'>Easy</option>
                            <option value="Medium" className='dropdown-option'>Medium</option>
                            <option value="Hard" className='dropdown-option'>Hard</option>
                        </select>

                        <br />

                       {
                         choosenCategory !== "Choose Here" && choosenDifficulty !== 'Choose Here' 
                         ? <Link to='/questions'>
                                <button onClick={() => {
                                    localStorage.setItem("category", choosenCategory.toLowerCase());
                                    localStorage.setItem("difficulty", choosenDifficulty.toLowerCase());
                                }} className='start-game-button'>Play Now</button>
                            </Link> : null
                       }
                    </div> : null
                }
            </div>
        </div>
    )
}

export default StartScreen