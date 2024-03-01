import React, { useState } from 'react';
import './App.css';
import Questionnaire from './Questionnaire';
import Login from './Login';
import TaskDisplay from './TaskDisplay';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

    //            <Route path="/register" element={<Registration />} />
    //            <Route path="/login" element={<Login />} />
function App() {
    return (
            <Routes>
                <Route path="/" element={<Questionnaire />} />
                <Route path="/login" element={<Login />} />
                <Route path="/display-tasks" element={<TaskDisplay />} />
            </Routes>
    );
}

export default App;