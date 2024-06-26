import React, { useState, useContext } from 'react';
import axios from 'axios';
import './App.css';
import './Login.css';
import UserContext from './UserContext.js';
import { useNavigate } from 'react-router-dom';
import NavbarContent from './navbar.js';

function Login() {
    const navigate = useNavigate();
    const [usernameReg, setUsernameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const { setUser } = useContext(UserContext);

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

    const validateEmail = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegisterButtonClick = async () => {
        try {
            if (!validateEmail(emailReg)) {
                setRegistrationMessage('Please enter a valid email address.');
                return;
            }

            const response = await axios.post("http://localhost:4000/api/register", {
                username: usernameReg,
                email: emailReg,
                password: passwordReg,
            });

            const newUser = response.data;

            // Store the user details in the state
            setUser(newUser);
            setRegistrationMessage(`User ${newUser.username} created successfully!`);
            setTimeout(() => {
                navigate("/Questionnaire");
            }, 100); 
        } catch (error) {
            console.error('Error registering user:', error.message);
            setRegistrationMessage('Error registering user. Please try again.');
        }            

    };

    const handleLoginButtonClick = async () => {
        console.log("looking for user");
        try {
            const response = await axios.post("http://localhost:4000/api/login", {
                email: emailLogin,
                password: passwordLogin,
            });
            const loggedInUser = response.data;
            setUser(loggedInUser);
            console.log(loggedInUser);
            setLoginMessage(`User ${loggedInUser.username} logged in successfully!`);
            
            navigate("/");
            
        } catch (error) {
            console.error('Error logging in user:', error.message);
            setLoginMessage('Error logging in user. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <NavbarContent />
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

export default Login;
