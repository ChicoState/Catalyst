import Questionnaire from './Questionnaire.js';
import Login from './Login.js';
import TaskDisplay from './TaskDisplay.js';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
            <Routes>
                <Route path="/" element={<Questionnaire />} />
                <Route path="/login" element={<Login />} />
                <Route path="/display-tasks" element={<TaskDisplay />} />
            </Routes>
    )
}

export default App;