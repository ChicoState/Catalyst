import React, { useState, useContext } from 'react';
import NavbarContent from './navbar.js';
import { Link } from 'react-router-dom';
import UserContext from './UserContext.js';
import './Homepage.css';

function Homepage() {
    const { user } = useContext(UserContext);


    return (
        <div className='Homepage'>
            <NavbarContent />
            <div className='Welcome'>
                <h1>Catalyst</h1>
            </div>
            <div className='HomepageBody'>
                {user ? (
                    // If user is signed in, display welcome message and user information
                    <div>
                        <h3>Welcome, {user.username}!</h3>
                        {user.skills && user.skills.length > 0 ? (
                            <div className="skills-container">
                                {user.skills.map(skill => (
                                    <div key={skill._id} className="skill">
                                        <strong>{skill.SkillName}</strong>
                                        {skill.Tasks && skill.Tasks.length > 0 ? (
                                            <ul className="tasks-column">
                                                {skill.Tasks.map(task => (
                                                    <li key={task._id}>{task.TaskName}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div>No tasks found for this skill.</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <h3>You don't have any skills yet.</h3>
                                <Link to="/Questionnaire" className="link">Take Questionnaire</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    // If user is not signed in
                    <div>
                        <h3>This is where you will see the skills you want to improve.</h3>
                        <Link to="/Questionnaire" className="link">Take Questionnaire</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Homepage;
