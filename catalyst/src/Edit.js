import React, { useState, useContext, useEffect } from 'react';
import NavbarContent from './navbar.js';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from './UserContext.js';
import axios from 'axios';
import './Homepage.css';

function Edit() {
    const location = useLocation();
    const { user, setUser } = useContext(UserContext);
    const skill = location.state?.skill || {}; // Use optional chaining to prevent errors if skill is undefined
    const [skillName, setSkillName] = useState(skill.SkillName || '');
    const [tasks, setTasks] = useState(skill.Tasks || []);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !skill) {
            // Redirect to login or handle the case where user or skill is not available
            navigate('/login');
        }
    }, [user, skill, navigate]);

    const handleNameChange = (event) => {
        setSkillName(event.target.value);
    };

    const handleTaskChange = (index, event) => {
        const newTasks = [...tasks];
        newTasks[index] = {
            ...newTasks[index],
            TaskName: event.target.value,
            Description: '',
            TimeInfo: ''
        };
        setTasks(newTasks);
    };

    const addTaskField = () => {
        setTasks([...tasks, { TaskName: '' }]);
    };

    const removeTaskField = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const deleteSkill = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/delete-skill", {
                email: user.email,
                skillId: skill._id
            });

            if (response && response.data) {
                const updatedUser = response.data;
                setUser(updatedUser);
                navigate('/');
            } else {
                console.error("Error deleting skill:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting skill:", error.message);
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const saveChanges = async () => {
        try {
            const formattedTasks = tasks.map(task => ({ TaskName: task.TaskName }));
            const response = await axios.post("http://localhost:4000/api/edit-skill", {
                email: user.email,
                editedSkill: {
                    _id: skill._id,
                    SkillName: skillName,
                    Tasks: formattedTasks
                }
            });

            if (response && response.data) {
                const updatedUser = response.data;
                setUser(updatedUser);
                setEditMode(false);
                navigate('/');
            } else {
                console.error("Error saving changes:", response.data.message);
            }
        } catch (error) {
            console.error("Error saving changes:", error.message);
        }
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
                    disabled={!editMode}
                />
                {!editMode && (
                    <button onClick={() => setEditMode(true)}>Edit</button>
                )}
                {editMode && (
                    <button onClick={saveChanges}>Save</button>
                )}
                <button onClick={deleteSkill}>Delete Skill</button>
                {showConfirmation && (
                    <div className="confirmation-modal">
                        <p>Are you sure you want to delete this skill?</p>
                        <button onClick={confirmDelete}>Yes</button>
                        <button onClick={cancelDelete}>No</button>
                    </div>
                )}
                <h3>Tasks:</h3>
                {tasks.map((task, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={task.TaskName}
                            onChange={(event) => handleTaskChange(index, event)}
                            disabled={!editMode}
                        />
                        {editMode && (
                            <button onClick={() => removeTaskField(index)}>Remove Task</button>
                        )}
                    </div>
                ))}
                {editMode && (
                    <button onClick={addTaskField}>Add Task</button>
                )}
            </div>
        </div>
    );
}

export default Edit;
