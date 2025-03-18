import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock, FaCar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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
  React.useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/movies/', {
        method: 'GET',
      });
      
      if (response.ok) {
        setBackendStatus("online");
      } else {
        setBackendStatus("offline");
      }
    } catch (err) {
      console.error("Backend connection error:", err);
      setBackendStatus("offline");
    }
  };

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
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      console.log("Login response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        
        // Store authentication state and user information
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', data.user_id || '1');
        localStorage.setItem('userEmail', formData.email); // Store the email entered by user
        
        // Try to extract name from email (as a fallback)
        const userName = formData.email.split('@')[0];
        localStorage.setItem('userName', userName);
        
        // Navigate based on role
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        let errorMessage = 'Invalid credentials';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server connection error. Please try again later.");
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