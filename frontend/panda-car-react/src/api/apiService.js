// src/api/apiService.js

// Base URL for API calls - update this to your Elastic Beanstalk URL
const API_BASE_URL = 'http://Car-App1-env.eba-qkeix5fn.us-east-1.elasticbeanstalk.com/api';

// Helper function to check if the backend API is available
export const checkBackendStatus = async () => {
  try {
    // First try to hit the status endpoint
    const response = await fetch(`${API_BASE_URL}/status/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      console.log('Backend API is online');
      return { status: 'online', message: 'Backend API is online' };
    }
    
    // If status endpoint fails, try the health check endpoint
    const healthResponse = await fetch(`${API_BASE_URL.replace('/api', '')}/health/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (healthResponse.ok) {
      console.log('Backend API is online (health check)');
      return { status: 'online', message: 'Backend API is online' };
    }
    
    console.warn('Backend API returned error response');
    return { status: 'offline', message: 'Backend server appears to be offline' };
  } catch (error) {
    console.error('Backend connection error:', error);
    return { status: 'offline', message: 'Cannot connect to backend server' };
  }
};

// Authentication API calls
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    
    console.log('Login response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'Invalid credentials';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    
    // Store authentication state and user information
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userId', data.user_id || '1');
    localStorage.setItem('userEmail', credentials.email);
    
    // Try to extract name from email (as a fallback)
    const userName = credentials.email.split('@')[0];
    localStorage.setItem('userName', userName);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone_number: userData.phone_number || '',
        password: userData.password,
      }),
    });
    
    const responseData = await response.text();
    console.log('Registration response:', response.status, responseData);
    
    if (!response.ok) {
      let errorMessage = 'Registration failed';
      try {
        const errorData = JSON.parse(responseData);
        errorMessage = Object.values(errorData).flat().join(', ');
      } catch (e) {
        // Use the text response if not valid JSON
        errorMessage = responseData || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    // Try to parse as JSON, but handle case where it's not JSON
    try {
      return JSON.parse(responseData);
    } catch (e) {
      return { message: 'Account created successfully' };
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
};

// Cars API calls
export const getPopularCars = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular cars:', error);
    throw error;
  }
};

export const getCarDetails = async (carId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${carId}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch car details: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching car details for ID ${carId}:`, error);
    throw error;
  }
};

// Movies API calls
export const getMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Foods API calls
export const getFoods = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch foods: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

// Booking API calls
export const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/bookings/create/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create booking: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Export as default object
export default {
  API_BASE_URL,
  checkBackendStatus,
  loginUser,
  registerUser,
  logoutUser,
  getPopularCars,
  getCarDetails,
  getMovies,
  getFoods,
  createBooking
};