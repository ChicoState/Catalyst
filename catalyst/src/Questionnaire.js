
  // Questionnaire.js
  import React, { useState } from 'react';
  import { setUser, updateUserFromQuestionnaire } from './userUtil.js'; // Import the utility functions
  import './Main.css';
  import './Questionnaire.css';
  
  // dropdown goal menu options
  // TODO: populate this with more skills
  const goalObject = {
    "Skill 1": {},
    "Skill 2": {}
  };
  
  //hours available to spend drop menu options
  const timeObject = {
    "1-5": {},
    "6-10": {},
    "11-15": {},
    "16-20": {},
    "More than 20" : {}
  };
  
  function Questionnaire() {
    //creating variables that will be used later
    const [person, setPerson] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
  
    //these functions handle text being entered in the text forms
    const handleInputChange = (event) => {
      setPerson(event.target.value);
    };
  
    const handleSkillChange = (event) => {
      setSelectedSkill(event.target.value);
      setSelectedTime(''); // Reset selected time when skill changes
    };
  
    const handleTimeChange = (event) => {
      setSelectedTime(event.target.value);
    };
  
    const handleButtonClick = () => {
      //saves the users selections when the button is clicked
      const userSelections = {
        name: person,
        skill: selectedSkill,
        time: selectedTime
      };
  
      // Update the user object with the selections
      setUser(userSelections);
  
      // Update user information from the questionnaire
      updateUserFromQuestionnaire(userSelections.name, userSelections.skill, userSelections.time);
    };

  return (
    
      <div className="Homepage">
        <header className="WelcomeHeader">
          <div className="Welcome">
            <h1>Welcome to Catalyst!</h1>
            <h3>Please tell us about your goals.</h3>
          </div>
        </header>
        <div className = "Form">
          <div className="Questionnaire">
            <div className="Question">
              <p>What is your name?</p>
              <input className='NameForm'
                type="text"
                value={person}
                onChange={handleInputChange}
              />
            </div>
            <div className="Question">
              <p>Which skill would you like to learn?</p>
              <select name="skill" id="skill" onChange={handleSkillChange} value={selectedSkill}>
                <option value="" disabled>Select skill</option>
                {Object.keys(goalObject).map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            <div className="Question">
              <p>How many hours per week do you want to spend on the skill?</p>
              <select name="time" id="time" onChange={handleTimeChange} value={selectedTime}>
                <option value="" disabled>Select time</option>
                {Object.keys(timeObject).map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            
          </div>
          <div className="ButtonContainer">
            <button className="SubmitButton" onClick={handleButtonClick}>
              <span className='ButtonText'>Continue</span>
            </button>
          </div>
        </div>
      </div>
    
  );
}

export default Questionnaire;


