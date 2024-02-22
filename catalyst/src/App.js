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

            const newUser = response.data;

            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
            // Store the user details in the state
            setUser(newUser);
            setRegistrationMessage(`User ${newUser.username} created successfully!`);
            setToken(token);


            <Redirect to="/Questionnaire" />;
        } catch (error) {
            console.error('Error registering user:', error.message);
            setRegistrationMessage('Error registering user. Please try again.');
        }
    };

    const handleLoginButtonClick = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email: emailLogin,
                password: passwordLogin,
            });
    
            const loggedInUser = response.data;
    
            const token = jwt.sign({ userId: loggedInUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
            setUser(loggedInUser);
            setLoginMessage(`User ${loggedInUser.username} logged in successfully!`);
            setToken(token);
    
            // Redirect to "/Questionnaire" after successful login
            history.push("/Questionnaire"); // Assuming you have access to the 'history' object
        } catch (error) {
            console.error('Error logging in user:', error.message);
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