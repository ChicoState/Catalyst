import NavbarContent from './navbar.js';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserHome(){
    const navigate = useNavigate();

    return (
        <div>
            <NavbarContent />
            <h1>You Skills</h1>
        </div>
        
    );
}

export default UserHome;