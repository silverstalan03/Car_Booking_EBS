// src/Components/Account/Account.jsx
import React from 'react';
import './Account.css';

const Account = () => {
  return (
    <div className="account-container">
      <div className="account-content">
        <h1>My Account</h1>
        <div className="account-details">
          <p>
            <strong>Email:</strong> {localStorage.getItem('userEmail') || 'Not available'}
          </p>
          <p>
            <strong>Name:</strong> {localStorage.getItem('userName') || 'Not available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;