// src/Components/Header/Header.jsx
import { Link } from "react-router-dom";
import "./Header.css";
// Remove the import for the panda icon

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/home">Street Movie Car Booking</Link>
        </div>
        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/account">Account</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/foods">Foods</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;