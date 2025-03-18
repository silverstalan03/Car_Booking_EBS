// Components/Booking/Booking.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Booking.css';

const Booking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cars/${carId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }

        const data = await response.json();
        setCar(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/bookings/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          car_id: carId,
          start_date: startDate,
          end_date: endDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      setReceipt(data.receipt);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading car details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!car) return <div className="error">Car not found</div>;

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <h1>Book Your Car</h1>
        
        {!receipt ? (
          <div className="booking-form-container">
            <div className="car-details">
              <img src={car.photo_url} alt={car.car_name} />
              <h2>{car.car_name}</h2>
              <p>Type: {car.car_type}</p>
              <p>Capacity: {car.capacity} People</p>
              <p>Price: ${car.price_per_day}/day</p>
            </div>
            
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="start-date">Start Date:</label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="end-date">End Date:</label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <button type="submit" className="book-button">Book Now</button>
            </form>
          </div>
        ) : (
          <div className="receipt">
            <h2>Booking Confirmed!</h2>
            <div className="receipt-details">
              <p><strong>Booking ID:</strong> {receipt.booking_id}</p>
              <p><strong>Car:</strong> {receipt.car}</p>
              <p><strong>Start Date:</strong> {receipt.start_date}</p>
              <p><strong>End Date:</strong> {receipt.end_date}</p>
              <p><strong>Days:</strong> {receipt.days}</p>
              <p><strong>Price Per Day:</strong> ${receipt.price_per_day}</p>
              <p><strong>Total Price:</strong> ${receipt.total_price}</p>
            </div>
            <button onClick={() => navigate('/cars')} className="back-button">
              Book Another Car
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;