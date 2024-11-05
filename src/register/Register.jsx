import React, { useState } from 'react';
import { Link } from 'wouter';  
import './Register.css';

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
    <div className="register-page">
      <div className="register-container">
        {}
        <Link to="/" className="back-icon" title="Go Back">
          <i className="bi bi-arrow-left"></i>
        </Link>

        <h2>Registrarse</h2>
        <p>
          Si ya tienes una cuenta, regístrate{' '}
          <a href="/iniciar-sesion">Inicia sesión aquí!</a>
        </p>

        <form>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-wrapper">
              <i className="bi bi-envelope icon"></i>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Ingresa tu dirección de correo electrónico"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="username">Nombre de usuario</label>
            <div className="input-wrapper">
              <i className="bi bi-person icon"></i>
              <input
                type="text"
                id="username"
                className="input-field"
                placeholder="Ingresa tu nombre de usuario"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <i className="bi bi-lock icon"></i>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                className="input-field"
                placeholder="Ingresa tu contraseña"
                required
              />
              <i
                className={`bi ${passwordVisible ? 'bi-eye-slash' : 'bi-eye'} toggle-icon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <div className="input-wrapper">
              <i className="bi bi-lock icon"></i>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                className="input-field"
                placeholder="Confirma tu contraseña"
                required
              />
              <i
                className={`bi ${confirmPasswordVisible ? 'bi-eye-slash' : 'bi-eye'} toggle-icon`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            </div>
          </div>

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
