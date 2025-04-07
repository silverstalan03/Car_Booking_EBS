import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { FaUser, FaLock, FaCar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { checkBackendStatus, loginUser } from "../../api/apiService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState("unknown"); // 'online', 'offline', 'unknown'

  // Check backend status on component mount
  useEffect(() => {
    const checkBackend = async () => {
      const result = await checkBackendStatus();
      setBackendStatus(result.status);
    };
    
    checkBackend();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    console.log("Attempting login with:", formData);
    
    try {
      const data = await loginUser(formData);
      console.log("Login successful:", data);
      
      // Navigate based on role
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Server connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBypassLogin = () => {
    console.log("Bypassing login for development");
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userId', '1');
    localStorage.setItem('userEmail', 'dev@example.com');
    localStorage.setItem('userName', 'Developer');
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="logo-container">
          <FaCar size={50} color="#003580" />
          <h1>Street Movie Car Booking</h1>
        </div>
        
        {backendStatus === "offline" && (
          <div className="backend-warning">
            Backend server appears to be offline. 
            <button onClick={handleBypassLogin}>Bypass Login</button>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;