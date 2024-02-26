import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';
import './Login.css';
import { useNavigate } from 'react-router-dom'; 
import Questionnaire from './Questionnaire';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); //this will be used to navigate to other pages

    //defines variables that will be used in the code
    const [usernameReg, setUsernameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [registrationMessage, setRegistrationMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const [user, setUser] = useState(null);  // Add user state
    const [token, setToken] = useState('');  // Add token state

    //these functions define whats happens when text is entered in the text forms
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

    //what runs when the create account button is clicked
    const handleRegisterButtonClick = async () => {
        try {

            //this will run routes/authRoutes.js and follow the /register path
            const response = await axios.post("http://localhost:3000/register", {
                username: usernameReg,
                email: emailReg,
                password: passwordReg,
            });

            const newUser = response.data; //a new user object is created with the response data
            setUser(newUser);// Store the user details in the state

            setRegistrationMessage(`User ${newUser.username} created successfully!`);
            navigate("/Questionnaire"); //the page will now the questionnaire page
     

        } catch (error) { //if there is an error, display the error
            console.error('Error registering user:', error.message);
            setRegistrationMessage('Error registering user. Please try again.');
        }
    };

    //this will run if the login button is clicked
const handleLoginButtonClick = async () => {
    console.log("looking for user");
    try {
        //this will run the route defined in routes/authRoutes.js
        const response = await axios.post("http://localhost:3000/login", {
            email: emailLogin,
            password: passwordLogin,
        });
        //set the current user object to the user that just logged in
        const loggedInUser = response.data;
        setUser(loggedInUser);

        setLoginMessage(`User ${loggedInUser.username} logged in successfully!`);

        //if the user has not taken the questionnaire yet, navigate to it
        if (!loggedInUser.takenQuestionnaire) {
            navigate("/Questionnaire");  
        }
        //TODO: if the user has taken the questionnaire, it should navigate to the page that displays their plan
        //      the plan page still needs to be created 
        } catch (error) {
            console.error('Error logging in user:', error.message);
            setLoginMessage('Error logging in user. Please check your credentials and try again.');
        }        
    };

    //the structure of the page is what this function is returning
    return (
        <div>
            {/* This is where navigation routes will go, eventually the plan page will need to be here as well*/}
            <Routes>
                <Route path="/Questionnaire" element={<Questionnaire />} />
            </Routes>
            {/* This div has the create account fields */}
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
                {registrationMessage && <p>{registrationMessage}</p>} {/* Display error messages or success messages*/}
            </div>
            {/* This div has the login fields*/}
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