// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Set some default authentication values
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('userId', '1');
localStorage.setItem('userEmail', 'user@example.com');
localStorage.setItem('userName', 'Movie Lover');
localStorage.setItem('userRole', 'user');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)