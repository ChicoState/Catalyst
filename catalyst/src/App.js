import Questionnaire from './Questionnaire.js';
import Login from './Login.js';
import TaskDisplay from './TaskDisplay.js';
<<<<<<< HEAD
import UserHome from './UserHome.js';
=======
import Homepage from './Homepage.js';
>>>>>>> 5f348ef0c976cdfec439ec0c4ab9db25c151dbd2
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
<<<<<<< HEAD
                <Route path="/user-home" element={<UserHome />} />
=======
                <Route path="/Questionnaire" element={<Questionnaire />} />
>>>>>>> 5f348ef0c976cdfec439ec0c4ab9db25c151dbd2
            </Routes>
        </UserProvider>
    )
}

export default App;