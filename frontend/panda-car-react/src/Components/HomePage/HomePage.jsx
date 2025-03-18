// src/Components/HomePage/HomePage.jsx
import React from 'react';
import './HomePage.css';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="centered-content">
          <h1>Welcome to Street Movie Car Booking</h1>
          <p className="subtitle">Book a car to watch movies in comfort</p>
          
          <div className="featured-cars">
            <h2>Featured Cars</h2>
            <p>Our best cars for your movie experience</p>
            {/* Featured cars content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;