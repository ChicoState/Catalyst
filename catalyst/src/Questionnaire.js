
  // Questionnaire.js
  import React, { useState } from 'react';
  import './Questionnaire.css';
  import { useNavigate } from 'react-router-dom';
  import createPlan from './gemini.js';
  
  function Questionnaire() {
    const navigate = useNavigate();

    // Initialized a single state object for all responses
    const [responses, setResponses] = useState([]);

  // Define your question configuration
  const questions = [

    {
      type: 'text', questionText: 'Describe the skill you would like to pursue:'
    },
    {
      type: 'select', 
      questionText: 'How many hours per week would you like to spend improving this skill?', 
      options: ['1-10', '11-20', '21-30', '31+'],
    },
    {
      type: 'select',
      questionText: 'What is your current experience level at this task?',
      options: ["Beginner", "Intermediate", "Experienced"],
    },
    {
      type: 'text', questionText: 'Is there a specific area that you would like to focus on?' },

  ];

  // Update the state based on input changes
  const handleChange = (index, questionText, value) => {
    setResponses((prevResponses) => { 
      const newResponses = [...prevResponses];    // Copies the previous responses into a new object
      newResponses[index] = [questionText, value];
      return newResponses;
    });
  };

  // Handle button click
  const handleButtonClick = async () => {
    // Construct a new Skill object with the responses
    const task_list = await createPlan(responses);
    
    sessionStorage.setItem('taskList', JSON.stringify(task_list));

    setTimeout(() => {
      navigate("/display-tasks");
  }, 100);
    
  };

  return (
    
      <div className="Homepage">

          <div className="Welcome">
            <h1>Welcome to Catalyst!</h1>
            <h3>Please tell us about your goals.</h3>
          </div>
        
    <div className="Questionnaire">
      {questions.map((question, index) => (
        <div className="Question" key={index}>
          <p>{question.questionText}</p>
          {question.type === 'text' ? (
            <input
              type="text"
              value={responses[index] ? responses[index][1]: ''}
              onChange={(e) => handleChange(index, question.questionText, e.target.value)}
            />
          ) : (
            <select
              value={responses[index] ? responses[index][1]: ''}
              onChange={(e) => handleChange(index, question.questionText, e.target.value)}
            >
              <option value="" disabled>Select...</option>
              {question.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button onClick={handleButtonClick}>Continue</button>
    </div>
    </div>
  );
}

export default Questionnaire;


