import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
          <Link to="/" onClick={() => handleNavigation('/')}>
            Homepage
          </Link>
        </li>
        <li>
          <Link to="/Questionnaire" onClick={() => handleNavigation('/Questionnaire')}>
            Questionnaire
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={() => handleNavigation('/login')}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/display-tasks" onClick={() => handleNavigation('/display-tasks')}>
            Tasks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarContent;
