  import React, { useState } from 'react';
  import './TaskDisplay.css';
  import NavbarContent from './navbar.js';

  function TaskDisplay() {
    let init_tasks = []; // Initialize with an empty array
    let questionnaire;

    // Check if data exists and retrieve it
    if (sessionStorage.getItem('newTasks')) { // Ensure correct key is used
        init_tasks = JSON.parse(sessionStorage.getItem('newTasks'));
        //console.log(init_tasks)
    } else {
        console.error("New task list not found...");
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
    const handleSubmit = (event) => {
        event.preventDefault();
        // Do whatever with selected tasks
        console.log("Selected tasks:");
        selectedTasks.forEach(index => {
            console.log(init_tasks[index]);
        });
        sessionStorage.setItem("selectedTasks", JSON.stringify(selectedTasks));
    };

    return (
        <div>
            <NavbarContent />
            <h1>Your Goal-Oriented Tasks</h1>
            <form onSubmit={handleSubmit}>
                <div className="TaskDisplay">
                    <button type="submit">Submit Selected Tasks</button>
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