// src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Component imports
import HomePage from './Components/HomePage/HomePage';
import CarsPage from './Components/CarsPage/CarsPage';
import AvailableMovies from './Components/AvailableMovies/AvailableMovies';
import AvailableFoods from './Components/AvailableFoods/AvailableFoods';
import Booking from './Components/Booking/Booking';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Navbar from './Components/Navbar/Navbar';

// Auth checking function
const isAuthenticated = () => {
  // Always return true to bypass authentication
  return true;
};

const isAdmin = () => {
  return localStorage.getItem('userRole') === 'admin';
};

// Protected route component
const ProtectedRoute = ({ children, adminRequired = false }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/home" />;
  }

  if (adminRequired && !isAdmin()) {
    return <Navigate to="/home" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            {/* Default route now goes directly to home page */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Protected routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminRequired={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />

            <Route path="/cars" element={
              <ProtectedRoute>
                <CarsPage />
              </ProtectedRoute>
            } />

            <Route path="/movies" element={
              <ProtectedRoute>
                <AvailableMovies />
              </ProtectedRoute>
            } />

            <Route path="/foods" element={
              <ProtectedRoute>
                <AvailableFoods />
              </ProtectedRoute>
            } />

            <Route path="/booking/:carId" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;