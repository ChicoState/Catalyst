// Import the necessary modules
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter as Router } from 'react-router-dom';

// This is the actual entry point of the app
const root = createRoot(document.getElementById('root'));

// Render your React components
root.render(
    <Router>
      <App />
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
