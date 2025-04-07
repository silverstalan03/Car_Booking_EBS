// src/Components/Notifications/AWSNotificationsComponent.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './Notifications.css';

// AWS API URL
const AWS_API_URL = 'https://ozado4x5ci.execute-api.us-east-1.amazonaws.com/Dev';

const AWSNotificationsComponent = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch notifications from AWS
    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await fetch(AWS_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`AWS API responded with status: ${response.status}`);
            }

            const data = await response.json();
            console.log('AWS notifications response:', data);
            
            if (data && data.notifications) {
                setNotifications(data.notifications);
            } else {
                setNotifications([]);
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setError('Failed to load notifications: ' + error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        
        // Poll for new notifications every 30 seconds
        const intervalId = setInterval(fetchNotifications, 30000);
        
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="notifications-container">
            <Navbar />
            <div className="page-header">
                <h1>AWS Notifications</h1>
                <button 
                    className="refresh-button" 
                    onClick={fetchNotifications}
                    disabled={loading}
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>
            
            {loading && <p className="loading-message">Loading notifications...</p>}
            {error && <p className="error-message">{error}</p>}
            
            <div className="notification-list">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className="notification-card">
                            <div className="notification-header">
                                <span className="notification-type">{notification.notification_type || 'Booking'}</span>
                                <span className="notification-time">
                                    {new Date(notification.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <div className="notification-body">
                                <div className="notification-detail">
                                    <strong>Booking ID:</strong> 
                                    <span>{notification.booking_id}</span>
                                </div>
                                <div className="notification-detail">
                                    <strong>Car:</strong> 
                                    <span>{notification.car_name}</span>
                                </div>
                                <div className="notification-detail">
                                    <strong>Date:</strong> 
                                    <span>{notification.booking_date}</span>
                                </div>
                                <div className="notification-detail">
                                    <strong>Time:</strong> 
                                    <span>{notification.booking_time}</span>
                                </div>
                                <p className="notification-message">{notification.message}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-notifications-message">No notifications found</p>
                )}
            </div>
            
            <div className="notifications-footer">
                <p>Notifications are updated every 30 seconds. You'll receive email notifications for new bookings as well.</p>
                <button 
                    className="back-button"
                    onClick={() => navigate('/cars')}
                >
                    Back to Cars
                </button>
            </div>
        </div>
    );
};

export default AWSNotificationsComponent;