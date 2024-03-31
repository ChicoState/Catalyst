import React, { useState, useContext} from 'react';
import NavbarContent from './navbar.js';
import { Link } from 'react-router-dom';
import UserContext from './UserContext.js';
import './Homepage.css';



function Homepage() {
    const { user } = useContext(UserContext);

    return(
        <div className='Homepage'>
            <NavbarContent />
                <div className='Welcome'>
                    <h1>Catalyst</h1>
                </div>
                <div className='HomepageBody'>
                {user ? (
                    // If user is signed in, display welcome message and user information
                    <div>
                        <h3>Welcome, {user.username}!</h3>
                    </div>
                ) : (
                    // If user is not signed in
                    <div>
                        <h3>
                            This is where you will see the skills you want to improve. 
                            Take our questionnaire to create a new one!
                        </h3>
                        <Link to="/Questionnaire" className="link">Take Questionnaire</Link>
                    </div>
                )}
                </div>
        </div>

    );
}

export default Homepage;