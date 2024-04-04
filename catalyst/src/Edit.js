import React, { useState, useContext } from 'react';
import NavbarContent from './navbar.js';
import { useLocation } from 'react-router-dom';
import UserContext from './UserContext.js';
import './Homepage.css';

function Edit() {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const skill = location.state.skill;
    const [skillName, setSkillName] = useState(skill.SkillName || '');
    const [tasks, setTasks] = useState(skill.Tasks || []);

    const handleNameChange = (event) => {
        setSkillName(event.target.value);
    };

    const handleTaskChange = (index, event) => {
        const newTasks = [...tasks];
        newTasks[index] = event.target.value;
        setTasks(newTasks);
    };

    const addTaskField = () => {
        setTasks([...tasks, ""]);
    };

    const removeTaskField = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const saveTask = async () => {
        //TODO: define endpoint to save edited task in database, navigate back to homepage
    };

    return (
        <div className='Homepage'>
            <NavbarContent />
            <div className='Welcome'>
                <h1>Catalyst</h1>
            </div>
            <div className='Edit'>
                <h2>Edit your skill</h2>
                <p>Skill name: </p>
                <input
                    type="text"
                    value={skillName}
                    onChange={handleNameChange}
                />
                <h3>Tasks:</h3>
                {tasks.map((task, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={task.TaskName}
                            onChange={(event) => handleTaskChange(index, event)}
                        />
                        <button onClick={() => removeTaskField(index)}>Remove Task</button>
                    </div>
                ))}
                <button onClick={addTaskField}>Add Task</button>
                <button onClick={saveTask}>Save Task</button>

            </div>
        </div>
    );
}

export default Edit;
