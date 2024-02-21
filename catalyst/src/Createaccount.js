import React, { useState } from 'react';
import './App.css';


function Createaccount(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleButtonClick = () => {
        // Call the registerUser function or perform any other functionality
        registerUser();
        console.log("Button clicked! User details:", { username, email, password });
    };

    const registerUser = () => {
        // Placeholder for user registration functionality
        console.log('User Registered:', { username, email, password });
    };

    return(
        <body>
            <h1>Please create an account.</h1>
            <div className='Accountcreate'>
                <p>User name</p>
                <input className='UserNameForm'
                    type="text"
                    value={username}
                    onChange={handleUserNameChange}
                />
                <p>Email</p>
                <input className='EmailNameForm'
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                />
                <p>Password</p>
                <input className='PasswordNameForm'
                    type="text"
                    value={password}
                    onChange={handlePasswordChange}
                />
            <div className="ButtonContainer">
            <button className="CreateAccountButton" onClick={handleButtonClick}>
              <span className='ButtonText'>Create Account</span>
            </button>
          </div>
                
            </div>
        </body>

    );
}