import { useState } from 'react';
import { Link } from 'wouter';
import './Login.css';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-page"> {}
      <div className="login-container">
        {}
        <Link to="/" className="back-icon" title="Go Back">
          <i className="bi bi-arrow-left"></i>
        </Link>

        <h2 className="login-title">Sign in</h2>
        <p className="login-text">
          If you don't have an account register{' '}
          <Link to="/crear-cuenta" className="register-link">Register here!</Link>
        </p>

        <form className="login-form">
          <InputField
            type="email"
            id="email"
            label="Email"
            placeholder="Enter your email address"
            iconClass="bi bi-envelope"
          />

          <InputField
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            label="Password"
            placeholder="Enter your Password"
            iconClass="bi bi-lock"
            toggleIconClass={passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'}
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
    </div>
  );
}

function InputField({ type, id, label, placeholder, iconClass, toggleIconClass, onToggle }) {
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">{label}</label>
      <div className="input-wrapper">
        <i className={`${iconClass} icon`}></i>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="input-field"
        />
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
      <i className={`${iconClass}`}></i>
    </a>
  );
}

export default Login;
