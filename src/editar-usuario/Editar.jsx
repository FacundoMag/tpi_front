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
        
        <h2 className="editar-title">Editar Perfil</h2>

        <form className="editar-form">
          <InputField
            type="email"
            id="email"
            label="Correo electrónico"
            placeholder="Ingresa tu dirección de correo electrónico"
            iconClass="bi bi-envelope"
          />

          <InputField
            type="text"
            id="nombre"
            label="Nombre"
            placeholder="Ingresa tu nombre"
            iconClass="bi bi-person"
          />

          <InputField
            type="text"
            id="apellido"
            label="Apellido"
            placeholder="Ingresa tu apellido"
            iconClass="bi bi-person"
          />

          <InputField
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            iconClass="bi bi-lock"
            toggleIconClass={passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'}
            onToggle={togglePasswordVisibility}
          />

          <InputField
            type={passwordVisible ? 'text' : 'password'}
            id="confirm-password"
            label="Confirmar Contraseña"
            placeholder="Confirma tu contraseña"
            iconClass="bi bi-lock"
            toggleIconClass={passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'}
            onToggle={togglePasswordVisibility}
          />

          <button type="submit" className="editar-button">Guardar Cambios</button>
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

export default Editar;
