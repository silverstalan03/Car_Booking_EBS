import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarsPage.css';

const CarsPage = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState({
        luxury: [],
        medium: [],
        economy: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const [bookingHistory, setBookingHistory] = useState([]);

    const getCarImageUrl = (car) => {
        const carImages = {
            "Ferrari 488 GT": "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
            "Passat CC Facelift": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d",
            "Passat B6": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
            "Mercedes Benz S-Class": "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
            "BMW X5": "https://images.unsplash.com/photo-1555215695-3004980ad54e",
            "Arteon": "https://images.unsplash.com/photo-1617788138017-80ad40651399",
            "Toyota Corolla": "https://images.unsplash.com/photo-1590510492745-c3d4cc710dd2",
            "Honda Civic": "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b",
            "Ford Focus": "https://images.unsplash.com/photo-1580273916550-e323be2ae537"
        };
        
        return carImages[car.car_name] || "https://images.unsplash.com/photo-1560958089-b8a1929cea89";
    };

    const loadMockCars = () => {
        const mockCars = {
            luxury: [
                { id: 1, car_name: "Ferrari 488 GT", number_of_seats: 2, price_per_day: 20 },
                { id: 2, car_name: "Passat CC Facelift", number_of_seats: 5, price_per_day: 20 },
                { id: 3, car_name: "Passat B6", number_of_seats: 5, price_per_day: 20 }
            ],
            medium: [
                { id: 4, car_name: "Mercedes Benz S-Class", number_of_seats: 5, price_per_day: 15 },
                { id: 5, car_name: "BMW X5", number_of_seats: 5, price_per_day: 15 },
                { id: 6, car_name: "Arteon", number_of_seats: 5, price_per_day: 15 }
            ],
            economy: [
                { id: 7, car_name: "Toyota Corolla", number_of_seats: 5, price_per_day: 10 },
                { id: 8, car_name: "Honda Civic", number_of_seats: 5, price_per_day: 10 },
                { id: 9, car_name: "Ford Focus", number_of_seats: 5, price_per_day: 10 }
            ]
        };
        
        setCars(mockCars);
        setLoading(false);
    };

    const fetchBookingHistory = () => {
        try {
            const storedBookings = localStorage.getItem('bookingHistory');
            if (storedBookings) {
                setBookingHistory(JSON.parse(storedBookings));
            }
        } catch (err) {
            setError('Failed to load booking history');
            console.error(err);
        }
    };

    useEffect(() => {
        loadMockCars();
        fetchBookingHistory();
    }, []);

    const handleViewDetails = (car, category) => {
        setSelectedCar({ ...car, category });
        setBookingDate('');
        setBookingTime('');
        setBookingConfirmed(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCloseDetails = () => {
        setSelectedCar(null);
        setBookingConfirmed(false);
        setReceipt(null);
        fetchBookingHistory();
    };

    const handleBookCar = () => {
        if (!bookingDate || !bookingTime) {
            alert('Please select both date and time');
            return;
        }

        const bookingId = Math.floor(1000 + Math.random() * 9000);
        const receiptData = {
            booking_id: bookingId,
            car: selectedCar.car_name,
            category: selectedCar.category,
            booking_date: bookingDate,
            booking_time: bookingTime,
            price: `€${selectedCar.price_per_day}`,
            created_at: new Date().toISOString()
        };

        try {
            const existingBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
            const updatedBookings = [...existingBookings, receiptData];
            localStorage.setItem('bookingHistory', JSON.stringify(updatedBookings));
            
            setReceipt(receiptData);
            setBookingConfirmed(true);
            setBookingHistory(updatedBookings);
        } catch (err) {
            setError('Failed to save booking');
            console.error(err);
        }
    };

    const handleCancelBooking = (bookingId) => {
        try {
            const existingBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
            const updatedBookings = existingBookings.filter(booking => booking.booking_id !== bookingId);
            localStorage.setItem('bookingHistory', JSON.stringify(updatedBookings));
            setBookingHistory(updatedBookings);
            alert('Booking cancelled successfully');
        } catch (err) {
            setError('Failed to cancel booking');
            console.error(err);
            alert('Error cancelling booking');
        }
    };

    const getViewingCapacity = (category) => {
        return {
            luxury: '2 people',
            medium: '3 people',
            economy: '4 people'
        }[category] || '4 people';
    };

    const getMoviePrice = (price) => `€${price}`;

    if (loading) return <div className="loading-message">Loading cars...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="page-wrapper">
            <div className="content-container">
                {selectedCar ? (
                    <div className="car-details-container">
                        {bookingConfirmed ? (
                            <div className="booking-confirmation">
                                <h2>Booking Confirmed!</h2>
                                <div className="receipt" aria-label="Booking Receipt">
                                    <div className="receipt-header">
                                        <span>Receipt</span>
                                        <span>Booking #{receipt.booking_id}</span>
                                    </div>
                                    <div className="receipt-content">
                                        <div className="receipt-row"><span>Car:</span><span>{receipt.car}</span></div>
                                        <div className="receipt-row"><span>Category:</span><span>{receipt.category.charAt(0).toUpperCase() + receipt.category.slice(1)}</span></div>
                                        <div className="receipt-row"><span>Date:</span><span>{receipt.booking_date}</span></div>
                                        <div className="receipt-row"><span>Time:</span><span>{receipt.booking_time}</span></div>
                                        <div className="receipt-row price"><span>Price:</span><span>{receipt.price}</span></div>
                                    </div>
                                </div>
                                <button className="book-another-button" onClick={handleCloseDetails}>
                                    Book Another Car
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="car-details-image">
                                    <img src={getCarImageUrl(selectedCar)} alt={`${selectedCar.car_name}`} />
                                </div>
                                <div className="car-details-content">
                                    <h2>{selectedCar.car_name}</h2>
                                    <div className="car-details-info">
                                        <p>Price per day: {getMoviePrice(selectedCar.price_per_day)}</p>
                                        <p>Category: {selectedCar.category.charAt(0).toUpperCase() + selectedCar.category.slice(1)}</p>
                                        <p>Seats: {selectedCar.number_of_seats}</p>
                                        <p>Viewing capacity: {getViewingCapacity(selectedCar.category)}</p>
                                    </div>
                                    <div className="movie-experience">
                                        <h3>Movie Experience Details</h3>
                                        <p>Enjoy watching movies from the comfort of this {selectedCar.category} car. Perfect for {getViewingCapacity(selectedCar.category)} to experience cinema in a unique way.</p>
                                    </div>
                                    <div className="booking-section">
                                        <h3>Book this car</h3>
                                        <div className="booking-form">
                                            <div className="form-group">
                                                <label htmlFor="booking-date">Available Date:</label>
                                                <input
                                                    id="booking-date"
                                                    type="date"
                                                    value={bookingDate}
                                                    onChange={(e) => setBookingDate(e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="booking-time">Available Time:</label>
                                                <select
                                                    id="booking-time"
                                                    value={bookingTime}
                                                    onChange={(e) => setBookingTime(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select time</option>
                                                    <option value="17:00">5:00 PM</option>
                                                    <option value="19:00">7:00 PM</option>
                                                    <option value="21:00">9:00 PM</option>
                                                </select>
                                            </div>
                                            <button
                                                className="book-now-button"
                                                onClick={handleBookCar}
                                                disabled={!bookingDate || !bookingTime}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button className="close-button" onClick={handleCloseDetails} aria-label="Close details">×</button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="cars-sections">
                        <h1 className="booking-history-heading">Booking History</h1>
                        <div className="booking-history-section">
                            {bookingHistory.length > 0 ? (
                                <div className="booking-history-cards">
                                    {bookingHistory.map((booking) => (
                                        <div key={booking.booking_id} className="booking-card">
                                            <div className="booking-details">
                                                <div className="booking-info-row"><strong>Car:</strong> {booking.car}</div>
                                                <div className="booking-info-row"><strong>Date:</strong> {booking.booking_date}</div>
                                                <div className="booking-info-row"><strong>Time:</strong> {booking.booking_time}</div>
                                                <div className="booking-info-row"><strong>Price:</strong> {booking.price}</div>
                                            </div>
                                            <button
                                                className="cancel-booking-button"
                                                onClick={() => handleCancelBooking(booking.booking_id)}
                                            >
                                                Cancel Booking
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-bookings-message">No bookings found.</p>
                            )}
                        </div>

                        {Object.entries(cars).map(([category, carList]) => (
                            <div key={category} className="car-category-section">
                                <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Cars</h2>
                                <p className="category-description">
                                    {category === 'luxury' ? 'Premium cars for 2 people - €20 per movie' :
                                     category === 'medium' ? 'Comfortable cars for 3 people - €15 per movie' :
                                     'Affordable cars for 4 people - €10 per movie'}
                                </p>
                                <div className="cars-grid">
                                    {carList.map((car) => (
                                        <div key={car.id} className={`car-card ${category}`}>
                                            <h3>{car.car_name}</h3>
                                            <img src={getCarImageUrl(car)} alt={`${car.car_name}`} />
                                            <div className="car-summary">
                                                <p>Price: {getMoviePrice(car.price_per_day)}</p>
                                                <p>Capacity: {getViewingCapacity(category)}</p>
                                                <p>Seats: {car.number_of_seats}</p>
                                            </div>
                                            <button
                                                className="view-details-button"
                                                onClick={() => handleViewDetails(car, category)}
                                            >
                                                View details
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarsPage;