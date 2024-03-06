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
    let task_list = []; // Initialize with an empty array

    // Check if data exists and retrieve it
    if (sessionStorage.getItem('taskList')) { // Ensure correct key is used
        const items = JSON.parse(sessionStorage.getItem('taskList'));
        task_list = items.map(item => JSON.parse(item)); // Parse each item into an object
        console.log(task_list);
    } else {
        console.error("No data found in storage");
    }

    return (
        <div>
            <NavbarContent />
            <h1>Your Goal-Oriented Tasks</h1>
            <div className="TaskDisplay">
                <ul>
                    {task_list.map((task, index) => (
                        <li key={index}>
                            <div className='taskname'>
                                <strong>{task.TaskName}</strong>
                            </div>
                            <div className='desc'>
                                {task.TimeInfo}
                            </div>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    );
}

export default TaskDisplay;