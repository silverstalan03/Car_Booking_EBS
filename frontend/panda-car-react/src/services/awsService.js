// src/services/awsService.js

const API_URL = 'https://ozado4x5ci.execute-api.us-east-1.amazonaws.com/Dev';

export const createBookingAWS = async (bookingData) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      throw new Error('AWS API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating booking with AWS:', error);
    throw error;
  }
};

export const getNotificationsAWS = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};