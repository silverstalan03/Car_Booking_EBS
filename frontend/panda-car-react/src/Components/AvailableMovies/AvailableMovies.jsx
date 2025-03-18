// Components/AvailableMovies/AvailableMovies.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './AvailableMovies.css';

const AvailableMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/movies/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="movies-container">
        <h1>Available Movies</h1>
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster_url} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <p>Duration: {movie.duration} min</p>
              <p>Rating: {movie.rating}/10</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AvailableMovies;