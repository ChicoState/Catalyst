import React, { useState } from 'react';
import axios from 'axios';
import './App.css';




function App() {
    const [usernameReg, setUsernameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

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

    const handleRegisterButtonClick = () => {
        // Call the registerUser function or perform any other functionality
        registerUser();
        console.log("Register Button clicked! User details:", { usernameReg, emailReg, passwordReg });
    };

    const handleLoginButtonClick = () => {
        // Call the loginUser function or perform any other functionality
        loginUser();
        console.log("Login Button clicked! User details:", { emailLogin, passwordLogin });
    };

    const registerUser = async () => {
        try {
            const response = await axios.post("http://localhost:3000/register", {
                username: usernameReg,
                email: emailReg,
                password: passwordReg,
            });
    
            // Handle the response from the server as needed
            console.log('User Registered:', response.data);
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };
    

    const loginUser = () => {
        // Placeholder for login functionality
        console.log('User Logged In:', { emailLogin, passwordLogin });
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
            </div>
        </div>
    );
}

export default App;