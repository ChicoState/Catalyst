////////////////////////////////////////////////////////////////////////////////
//
//  Initial Author: Lucas Butler
//  Date: Mar 1, '24
//  Description:    
//      This .js file takes in a list of task objects and displays them on the page
//
////////////////////////////////////////////////////////////////////////////////

  // Questionnaire.js
  import React, { useState, useContext} from 'react';
  import './TaskDisplay.css';
  import NavbarContent from './navbar.js';
  import UserContext from './UserContext.js';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';

  function TaskDisplay() {
    const { user } = useContext(UserContext); //initialize the user
    const { setUser } = useContext(UserContext);
    let init_tasks = []; // Initialize with an empty array
    let questionnaire;
    const navigate = useNavigate();

    // Check if data exists and retrieve it
    if (sessionStorage.getItem('taskList')) { // Ensure correct key is used
        init_tasks = JSON.parse(sessionStorage.getItem('taskList'));
        //console.log(init_tasks)
    } else {
        console.error("Task list not found...");
    }

    // Get the Questionaire Content
    if (sessionStorage.getItem('skillInfo')){
        questionnaire = JSON.parse(sessionStorage.getItem('skillInfo'));
        console.log(questionnaire);
    } else {
        console.error("Questionnaire not found...")
    }

    // Selected Tasks
    const [selectedTasks, setSelectedTasks] = useState(new Set());

    // Update the selected tasks
    const toggleTaskSelection = (index) =>{
        const newSelection = new Set(selectedTasks);
        if (newSelection.has(index)) {
            newSelection.delete(index);
        } else {
            newSelection.add(index);
        }
        setSelectedTasks(newSelection);
    }

    // Task list submission
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        
        selectedTasks.forEach(index => {
            console.log(init_tasks[index]);
        });
        sessionStorage.setItem("selectedTasks", JSON.stringify(selectedTasks));
        
        if(user){
            try {
                // Create a new skill object
                const newSkill = {
                    SkillName: 'Temp Skill Name', // Set the skill name
                    Tasks: Array.from(selectedTasks).map(index => init_tasks[index]), // Set tasks for the skill
                };
                
                // Send the new skill object to the server
                const response = await axios.post("http://localhost:4000/api/add-skill", { email: user.email, skill: newSkill });
    
                // Check if the request was successful
                if (response && response.data) {
                    const updatedUser = response.data;
                    console.log(response.data)
                    setUser(updatedUser);
                    
                    navigate('/');
                } else {
                    console.error("Error creating skill:", response.data.message);
                }
            } catch (error) {
                console.error("Error creating skill:", error.message);
            }
        } else{
            navigate('/login');
        }
    };

    return (
        <div>
            <NavbarContent />
            <h1>Your Goal-Oriented Tasks</h1>
            <form onSubmit={handleSubmit}>
                <div className="TaskDisplay">
                <button type="submit">{user ? 'Submit Selected Tasks' : 'Login to Submit'}</button>
                    <ul>
                        {init_tasks.map((task, index) => (
                            <li key={index}>
                                <div className='taskname'>
                                    <strong>{task.TaskName}</strong>
                                </div>
                                <div className='desc'>
                                    {task.Description}
                                </div>
                                <div className='timeinfo'>
                                    {task.TimeInfo}
                                </div>
                                <button type="button" className={selectedTasks.has(index) ? 'buttonSelected' : 'buttonNotSelected'}
 onClick={() => toggleTaskSelection(index)}>
                                    {selectedTasks.has(index) ? 'Deselect' : 'Select'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
        
    );
}

export default TaskDisplay;