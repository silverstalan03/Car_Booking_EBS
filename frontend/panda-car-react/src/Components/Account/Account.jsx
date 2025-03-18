import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuth) {
      navigate('/');
      return;
    }

    // First, load the data we have in localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      const userName = localStorage.getItem('userName') || email.split('@')[0];
      setUserData({
        first_name: userName,
        last_name: '',
        email: email,
        phone_number: 'Not available'
      });
    }

    // Then try to fetch user data from the server
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Try the new by-email endpoint
        const email = localStorage.getItem('userEmail');
        if (!email) {
          throw new Error('No email found in localStorage');
        }

        const response = await fetch(`http://127.0.0.1:8000/api/users/by-email/${encodeURIComponent(email)}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setServerError('');
        } else {
          setServerError('Connection to server failed');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setServerError('Connection to server failed');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  // Extract name from email if first_name is not available
  const displayName = userData.first_name || userData.email?.split('@')[0] || 'User';

  return (
    <div className="account-page">
      <Navbar />
      <div className="account-container">
        <h1 className="account-title">My Account</h1>
        
        {serverError && <div className="error-message">{serverError}</div>}
        
        <div className="account-profile">
          <div className="profile-avatar">
            <div className="avatar-icon"></div>
          </div>
          
          <div className="profile-info">
            <h2>{displayName}</h2>
            <p><strong>Email:</strong> {userData.email || 'Not available'}</p>
            <p><strong>Phone:</strong> {userData.phone_number || 'Not available'}</p>
            
            <button
              className="logout-button"
              onClick={handleLogout}
              disabled={isLoading}
            >
              Logout
            </button>
          </div>
        </div>
        
        <hr className="account-divider" />
      </div>
    </div>
  );
};

export default Account;