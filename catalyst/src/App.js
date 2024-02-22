import React, { useState } from 'react';
import axios from 'axios';
import './App.css';




function App() {
    const [usernameReg, setUsernameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [registrationMessage, setRegistrationMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loggedInUsername, setLoggedInUsername] = useState('');

    const handleRegUserNameChange = (event) => {
        setUsernameReg(event.target.value);
    };

    const handleRegEmailChange = (event) => {
        setEmailReg(event.target.value);
    };

    const handleRegPasswordChange = (event) => {
        setPasswordReg(event.target.value);
    };

    const handleLoginEmailChange = (event) => {
        setEmailLogin(event.target.value);
    };

    const handleLoginPasswordChange = (event) => {
        setPasswordLogin(event.target.value);
    };

    const handleRegisterButtonClick = async () => {
        try {
            const response = await axios.post("http://localhost:3000/register", {
                username: usernameReg,
                email: emailReg,
                password: passwordReg,
            });

            // Set the registration message
            setRegistrationMessage(`User ${usernameReg} created successfully!`);
        } catch (error) {
            console.error('Error registering user:', error.message);
            setRegistrationMessage('Error registering user. Please try again.');
        }
    };

    const handleLoginButtonClick = () => {
        try{
            loginUser(); 
            // Set the log in message
            setLoginMessage(`User ${loggedInUsername} logged in successfully!`);


        } catch (error) {
            console.error('Error logging in user:', error.message);
            setLoginMessage('Error loging in user. Please try again.');
        }
    };

    const loginUser = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email: emailLogin,
                password: passwordLogin,
            });

            // Handle the response from the server as needed
            console.log('User Logged In:', response.data);

            // You can set a success message or perform other actions
            setLoginMessage('User logged in successfully!');
        } catch (error) {
            console.error('Error logging in user:', error.message);

            // Handle the error and set an error message
            setLoginMessage('Error logging in user. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <div>
                <h2>Register</h2>
                <p>User name</p>
                <input
                    type="text"
                    value={usernameReg}
                    onChange={handleRegUserNameChange}
                />
                <p>Email</p>
                <input
                    type="text"
                    value={emailReg}
                    onChange={handleRegEmailChange}
                />
                <p>Password</p>
                <input
                    type="password"
                    value={passwordReg}
                    onChange={handleRegPasswordChange}
                />
                <button onClick={handleRegisterButtonClick}>Register</button>
                {registrationMessage && <p>{registrationMessage}</p>}
            </div>
            <div>
                <h2>Login</h2>
                <p>Email</p>
                <input
                    type="text"
                    value={emailLogin}
                    onChange={handleLoginEmailChange}
                />
                <p>Password</p>
                <input
                    type="password"
                    value={passwordLogin}
                    onChange={handleLoginPasswordChange}
                />
                <button onClick={handleLoginButtonClick}>Login</button>
                {loginMessage && <p>{loginMessage}</p>}
            </div>
        </div>
    );
}

export default App;