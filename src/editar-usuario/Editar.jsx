import React, { useState } from 'react';
import { Link } from 'wouter';  
import './Editar.css';

function Editar() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="editar-page">
      <div className="editar-container">
        <Link to="/" className="back-icon" title="Go Back">
          <i className="bi bi-arrow-left"></i>
        </Link>
        <form>

          <h2>Editar Perfil</h2>

          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-wrapper">
              <i className="bi bi-envelope icon"></i> {/* Icono de correo */}
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
            <label htmlFor="nombre">Nombre</label>
            <div className="input-wrapper">
              <i className="bi bi-person icon"></i> {/* Icono de nombre */}
              <input
                type="text"
                id="nombre"
                className="input-field"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="apellido">Apellido</label>
            <div className="input-wrapper">
              <i className="bi bi-person icon"></i> {/* Icono de apellido */}
              <input
                type="text"
                id="apellido"
                className="input-field"
                placeholder="Ingresa tu apellido"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <i className="bi bi-lock icon"></i> {/* Icono de candado */}
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
            <label htmlFor="password">Confirmar Contraseña</label>
            <div className="input-wrapper">
              <i className="bi bi-lock icon"></i> {/* Icono de candado */}
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

          <button type="submit" className="submit-button">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
}

export default Editar;
