// src/login/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Asegúrate de importar el archivo de estilos

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <h2>Sign in</h2>
      <p>
        If you don't have an account register{' '}
        <Link to="/register" className="register-link">Register here!</Link>
      </p>

      <form>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="input-field"
            />
            <i className="fas fa-envelope icon"></i>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter your Password"
              className="input-field"
            />
            <i className="fas fa-lock icon"></i>
            <i
              className={passwordVisible ? 'fas fa-eye-slash toggle-icon' : 'fas fa-eye toggle-icon'}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>

        <div className="options">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
          <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
        </div>

        <button type="submit" className="login-button">Login</button>

        <p className="or-text">or continue with</p>
        <div className="social-icons">
          <a href="/#" className="social-icon"><i className="fab fa-facebook"></i></a>
          <a href="/#" className="social-icon"><i className="fab fa-apple"></i></a>
          <a href="/#" className="social-icon"><i className="fab fa-google"></i></a>
        </div>
      </form>
    </div>
  );
}

export default Login;
