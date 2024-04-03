// Questionnaire.js
import React, { useState } from 'react';
import './Questionnaire.css';
import { useNavigate } from 'react-router-dom';
import createPlan from './gemini.js';
import NavbarContent from './navbar.js';


function Questionnaire() {
  const navigate = useNavigate();

  // Define your question configuration
  const questions = [
    {
      type: 'text',
      questionText: 'Describe the skill you would like to pursue:',
    },
    {
      type: 'select',
      questionText: 'How many hours per week would you like to spend improving this skill?',
      options: ['Unspecified','1-10', '11-20', '21-30', '31+'],
    },
    {
      type: 'select',
      questionText: 'What is your current experience level at this task?',
      options: ['Unspecified', 'Beginner', 'Intermediate', 'Experienced'],
    },
    {
      type: 'text',
      questionText: 'Is there a specific area that you would like to focus on? (optional)',
    },
  ];

  const defaultResponses = questions.map((question, index) => {
    const defaultValue = question.type === 'text'? '' : question.options[0];
    return [question.questionText, defaultValue];
  });

  // Initialized a single state object for all responses
  const [responses, setResponses] = useState(defaultResponses);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (index, questionText, value) => {
    // Clear any previous error message when the user starts typing
    setErrorMessage('');
  
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      // Ensure that the value is not undefined
      newResponses[index] = [questionText, value || ''];
      return newResponses;
    });
  };
  
  const handleButtonClick = async () => {
    // Clear any previous error message
    setErrorMessage('');
  
    // Construct the filled_questionnaire object directly
    const filled_questionnaire = {};
    questions.forEach((question, index) => {
      filled_questionnaire[index] = responses[index] || [question.questionText, ''];
    });
  
    // Validate that the first text field is not empty
    const skillTextFieldValue = filled_questionnaire[0];
    if (!skillTextFieldValue || !skillTextFieldValue[1].trim()) {
      // Display an error message for the first text field
      setErrorMessage('Please enter a description for the skill.');
      return;
    }

    // Display the loading message
    setLoading(true);
  
    try { 
      // Construct a new Skill object with the responses
      const taskList = await createPlan(responses, 7);
      console.log(filled_questionnaire)
      // Save the taskList to sessionStorage
      sessionStorage.setItem('skillInfo', JSON.stringify(filled_questionnaire));
      sessionStorage.setItem('taskList', JSON.stringify(taskList));

      // Navigate to the next page
      navigate('/display-tasks');
      } catch (error) {
        // Handle any errors that might occur during processing
        console.error('Error during processing:', error);
      } finally {
        // Hide the loading overlay regardless of success or failure
        setLoading(false);
      }
  };
  
  return (
    <div className="Homepage">
      <NavbarContent />
      <div className="Welcome">
        <h1>Welcome to Catalyst!</h1>
        <h3>Please tell us about your goals.</h3>
      </div>
  
    <div className="Questionnaire">
      {questions.map((question, index) => (
        <div className="Question" key={index}>
          <p>{question.questionText}</p>
          {question.type === 'text' ? (
            <div>
              <input
                type="text"
                value={responses[index] ? responses[index][1] : ''}
                onChange={(e) => handleChange(index, question.questionText, e.target.value)}
              />
              {errorMessage && question.questionText === 'Describe the skill you would like to pursue:' && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>
          ) : (
            <select
              value={responses[index] ? responses[index][1] : ''}
              onChange={(e) => handleChange(index, question.questionText, e.target.value)}
            >
              <option value="" disabled>
                Select...
              </option>
              {question.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button onClick={handleButtonClick}>Continue</button>
    </div>
  {loading && (
    <div id="loading-overlay">
      <div id="loading-message">Processing, please wait...</div>
    </div>
      )}
    </div>
  );
}

export default Questionnaire;