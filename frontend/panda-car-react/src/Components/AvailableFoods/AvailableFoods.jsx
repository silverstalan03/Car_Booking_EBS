// Components/AvailableFoods/AvailableFoods.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './AvailableFoods.css';

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/foods/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch foods');
        }

        const data = await response.json();
        setFoods(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <div className="loading">Loading foods...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="foods-container">
        <h1>Available Foods</h1>
        <div className="foods-grid">
          {foods.map((food) => (
            <div key={food.id} className="food-card">
              <img src={food.image_url} alt={food.name} />
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p>Price: ${food.price}</p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AvailableFoods;