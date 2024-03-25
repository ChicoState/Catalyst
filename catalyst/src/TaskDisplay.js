////////////////////////////////////////////////////////////////////////////////
//
//  Initial Author: Lucas Butler
//  Date: Mar 1, '24
//  Description:    
//      This .js file takes in a list of task objects and displays them on the page
//
////////////////////////////////////////////////////////////////////////////////

  // Questionnaire.js
  import React, { useState } from 'react';
  import './TaskDisplay.css';
  import NavbarContent from './navbar.js';

  function TaskDisplay() {
    let init_tasks = []; // Initialize with an empty array

    // Check if data exists and retrieve it
    if (sessionStorage.getItem('taskList')) { // Ensure correct key is used
        init_tasks = JSON.parse(sessionStorage.getItem('taskList'));
        console.log(init_tasks)
    } else {
        console.error("No data found in storage");
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
    const handleSubmit = (event) => {
        event.preventDefault();
        // Do whatever with selected tasks
        console.log("Selected tasks:");
        selectedTasks.forEach(index => {
            console.log(init_tasks[index]);
        });
    };

    return (
        <div>
            <NavbarContent />
            <h1>Your Goal-Oriented Tasks</h1>
            <form onSubmit={handleSubmit}>
                <div className="TaskDisplay">
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
                                <button type="button" onClick={() => toggleTaskSelection(index)}>
                                    {selectedTasks.has(index) ? 'Deselect' : 'Select'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit">Submit Selected Tasks</button>
            </form>
        </div>
        
    );
}

export default TaskDisplay;