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

    const handleRegisterButtonClick = async () => {
        try {
            const response = await axios.post('your_backend_register_endpoint', {
                username: usernameReg,
                email: emailReg,
                password: passwordReg,
            });
            console.log('User Registered:', response.data);
        } catch (error) {
            console.error('Registration Failed:', error.response.data);
        }
    };

    const handleLoginButtonClick = async () => {
        try {
            const response = await axios.post('your_backend_login_endpoint', {
                email: emailLogin,
                password: passwordLogin,
            });
            console.log('User Logged In:', response.data);
        } catch (error) {
            console.error('Login Failed:', error.response.data);
        }
    };

    return (
        <div>
            <div>
                <h2>Register</h2>
                {/* ... (same as before) */}
                <button onClick={handleRegisterButtonClick}>Register</button>
            </div>
            <div>
                <h2>Login</h2>
                {/* ... (same as before) */}
                <button onClick={handleLoginButtonClick}>Login</button>
            </div>
        </div>
    );
}

export default App;
