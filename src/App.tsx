import { Routes, Route } from 'react-router-dom'; 

import StartScreen from './components/StartScreen/StartScreen';
import QuestionScreen from './components/QuestionScreen/QuestionScreen';
import EndScreen from './components/EndScreen/EndScreen';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<StartScreen />} />
                <Route path='/questions' element={<QuestionScreen />} />
                <Route path='/finish' element={<EndScreen />} />
            </Routes>
        </div>
    )
}

export default App
