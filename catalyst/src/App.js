import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  return (
    <div>
    <header className="Catalyst">
      <div className="App-header">
        <p>
          Welcome to Catalyst!
        </p>
        <p style={{ fontSize: '22px' }}>
          Please tell us about your goals.
        </p>
      </div>
    </header>

      <div className="Questionaire">
        <div className="Question">
          <p>
            What is your name?
          </p>
          <input
            type="text"
            value={userName}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;