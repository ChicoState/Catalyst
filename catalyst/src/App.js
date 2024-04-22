import Questionnaire from './Questionnaire.js';
import Login from './Login.js';
import TaskDisplay from './TaskDisplay.js';
import Edit from './Edit.js';
import Homepage from './Homepage.js';
import './App.css';
import { UserProvider } from './UserContext.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/display-tasks" element={<TaskDisplay />} />
                <Route path="/Questionnaire" element={<Questionnaire />} />
                <Route path="/edit" element={<Edit />} />
                
            </Routes>
        </UserProvider>
    )
}

export default App;