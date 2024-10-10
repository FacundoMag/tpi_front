import React, { useState } from 'react';


function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div>
      <h2>Sign up</h2>
      <p>
        If you already have an account register{' '}
        <a href="/login">Login here!</a>
      </p>

      <form>
        <div>
          <label htmlFor="email">Email</label>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
            />
            <i className="fas fa-envelope"></i>
          </div>
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <div>
            <input
              type="text"
              id="username"
              placeholder="Enter your User name"
            />
            <i className="fas fa-user"></i>
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter your Password"
            />
            <i className="fas fa-lock"></i>
            <i
              className={passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div>
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm your Password"
            />
            <i className="fas fa-lock"></i>
            <i
              className={confirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}
              onClick={toggleConfirmPasswordVisibility}
            ></i>
          </div>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
