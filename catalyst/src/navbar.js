import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./navbar.css"

const NavbarContent = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    
      <nav>
        <ul>
          <li>
            <a href="#" onClick={() => handleNavigation('/')}>
              Homepage
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleNavigation('/Questionnaire')}>
              Questionnaire
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleNavigation('/login')}>
              Login
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleNavigation('/display-tasks')}>
              Tasks
            </a>
          </li>
        </ul>
      </nav>
    
  );
};

export default NavbarContent;
