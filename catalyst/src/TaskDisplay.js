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
  import Skill from './models/Skill.js';
  import axios from 'axios';

  function TaskDisplay() {
    const { user } = useContext(UserContext); //initialize the user
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
        // Do whatever with selected tasks
        console.log("Selected tasks:");
        selectedTasks.forEach(index => {
            console.log(init_tasks[index]);
        });
        sessionStorage.setItem("selectedTasks", JSON.stringify(selectedTasks));
        
        if(user){
            try {
                // Create a new skill object
                const newSkill = new Skill({
                    SkillName: 'Your Skill Name', // Set the skill name
                    Tasks: Array.from(selectedTasks).map(index => init_tasks[index]), // Set tasks for the skill
                    Description: 'Your skill description' // Set the skill description
                });
    
                // Save the new skill object to the database
                const response = await axios.post('/save-skill', { skill: newSkill });
                console.log(response.data);
                user.Skills.push(newSkill); //save the new skill to the user

                axios.post('/add-skill', { email: user.email, skill: newSkill })

                    .then(response => {
                        console.log(response.data); 
                    })
                    .catch(error => {
                        console.error(error); 
                    });

                console.log("Skill created:", newSkill); // Log the newly created skill object
                navigate('/');
            } catch (error) {
                console.error("Error creating skill:", error);
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