import { useState } from 'react';
import { Link } from 'wouter';
import './Login.css';

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

      <form className="login-form">
        <InputField
          type="email"
          id="email"
          label="Email"
          placeholder="Enter your email address"
          iconClass="bi bi-envelope" // Bootstrap Icon for email
        />

        <InputField
          type={passwordVisible ? 'text' : 'password'}
          id="password"
          label="Password"
          placeholder="Enter your Password"
          iconClass="bi bi-lock" // Bootstrap Icon for lock
          toggleIconClass={passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'} // Bootstrap Icon for eye
          onToggle={togglePasswordVisibility}
        />

        <div className="options">
          <label className="checkbox-container">
            <input type="checkbox" id="rememberMe" />
            Remember me
          </label>
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        </div>

        <button type="submit" className="login-button">Login</button>

        <p className="or-text">or continue with</p>
        <div className="social-icons">
          <SocialIcon 
            iconClass="bi bi-facebook" 
            onClick={() => console.log('Facebook clicked')} 
          />
          <SocialIcon 
            iconClass="bi bi-google" 
            onClick={() => console.log('Google clicked')} 
          />
        </div>
      </form>
    </div>
  );
}

function InputField({ type, id, label, placeholder, iconClass, toggleIconClass, onToggle }) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="input-field"
        />
        <i className={`${iconClass} icon`}></i>
        {toggleIconClass && (
          <i
            className={`${toggleIconClass} toggle-icon`}
            onClick={onToggle}
          ></i>
        )}
      </div>
    </div>
  );
}

function SocialIcon({ iconClass, onClick }) {
  return (
    <a href="/#" className="social-icon" onClick={onClick}>
      <i className={`${iconClass} social-icon-img`}></i> {/* Usando el icono de Bootstrap */}
    </a>
  );
}

export default Login;
