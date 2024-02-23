import React, { useState } from 'react';

import './App.css';

//dropdown menu options
const goalObject = {
  "Skill 1": {},
  "Skill 2": {}
};

const timeObject = {
  "1-5": {},
  "6-10": {}
};

function Questionnaire() {
  const [person, setPerson] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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
    //history.push('/Createaccount.js');
  };

  return (
    <body>
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
    </body>
  );
}

export default Questionnaire;


