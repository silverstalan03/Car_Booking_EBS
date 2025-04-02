// src/Components/AdminDashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/myaccount/', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Not authorized');
        }
        
        const data = await response.json();
        if (!data.is_admin) {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      }
    };
    
    checkAdminStatus();
    fetchUsers();
    fetchCars();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cars/', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setCars(data);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Street Movie Car Booking - Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      <div className="tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'cars' ? 'active' : ''} 
          onClick={() => setActiveTab('cars')}
        >
          Cars
        </button>
      </div>
      
      <div className="content">
        {activeTab === 'users' && (
          <div className="users-table">
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name} {user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.is_admin ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'cars' && (
          <div className="cars-table">
            <h2>Cars</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Price/Day</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car.id}>
                    <td>{car.id}</td>
                    <td>{car.car_name}</td>
                    <td>{car.brand_name}</td>
                    <td>{car.car_type || 'Standard'}</td>
                    <td>{car.capacity || car.number_of_seats}</td>
                    <td>${car.price_per_day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;