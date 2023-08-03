import { Routes, Route } from 'react-router-dom'; 

import StartScreen from './components/StartScreen/StartScreen';
import QuestionScreen from './components/QuestionScreen/QuestionScreen';
import EndScreen from './components/EndScreen/EndScreen';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<StartScreen />} />
                <Route path='/questions' element={<QuestionScreen />} />
                <Route path='/finish' element={<EndScreen />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </div>
    )
}

export default App
