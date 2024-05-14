// Homepage.js

import React, {  useContext } from 'react';
import NavbarContent from './navbar.js';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from './UserContext.js';
import './Homepage.css';

function Homepage() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleEditSkill = (skill) => {
        // Navigate to new edit page with the skill object as a URL parameter
        navigate(`/edit`, { state: { skill } });
    };

    return (
        <div className='Homepage'>
            <NavbarContent />
            <div className='HomepageBody'>
                <h1 className='Title'>Catalyst</h1>
                {user ? (
                    <div>
                        <h3>Welcome, {user.username}!</h3>
                        {user.skills && user.skills.length > 0 ? (
                            <div className="skills-container">
                            {user.skills.map(skill => (
                                <div key={skill._id} className="skill">
                                    <strong>{skill.SkillName}</strong>
                                    {skill.Tasks && skill.Tasks.length > 0 ? (
                                        <ul className="tasks-column">
                                            {skill.Tasks.map((task, index) => (
                                                <li key={`${skill._id}-${index}`}>{task.TaskName}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div>No tasks found for this skill.</div>
                                    )}
                                    <button onClick={() => handleEditSkill(skill)} className="delete-button">Edit</button>
                                </div>
                            ))}
                            </div>
                        ) : (
                            <div>
                                <h3>You don't have any skills yet. Take our questionnaire to create one!</h3>
                                <Link to="/Questionnaire" className="link">Take Questionnaire</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='Homepageintro'>
                        <h3>This is where you will see the skills you want to improve. Take our questionnaire to create a new one!</h3>
                        <Link to="/Questionnaire" className="link">Take Questionnaire</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Homepage;
