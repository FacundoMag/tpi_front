import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'wouter';  
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      telefono: '',
      correo: '',
      contraseña: '',
      confirmContraseña: '',
      error: '',
      successMessage: '',
      passwordVisible: false,
      confirmPasswordVisible: false
    };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordVisible: !prevState.passwordVisible
    }));
  };

  toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      confirmPasswordVisible: !prevState.confirmPasswordVisible
    }));
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { contraseña, confirmContraseña, nombre, apellido, telefono, correo } = this.state;

    if (contraseña !== confirmContraseña) {
      this.setState({ error: 'Las contraseñas no coinciden' });
      return;
    }

    axios.post('http://localhost:4001/api/user/registrarse', 
      { nombre, apellido, telefono, correo, contraseña }
    )
    .then((res) => {
      if (res.data.status === 'ok') {
        this.setState({
          successMessage: 'Registro exitoso. Puedes iniciar sesión.',
          error: ''
        });
      } else {
        this.setState({ error: res.data.error || 'Error al registrarse' });
      }
    })
    .catch((error) => {
      this.setState({ error: 'Error de conexión con el servidor' });
      console.error(error);
    });
  };

  render() {
    const { nombre, apellido, telefono, correo, contraseña, confirmContraseña, error, successMessage, passwordVisible, confirmPasswordVisible } = this.state;

    return (
      <div className="register-page">
        <div className="register-container">
          <Link to="/" className="back-icon" title="Go Back">
            <i className="bi bi-arrow-left"></i>
          </Link>

          <h2>Registrarse</h2>
          <p>
            Si ya tienes una cuenta, <a href="/iniciar-sesion">inicia sesión aquí!</a>
          </p>

          {error && <p className="error-text">{error}</p>}
          {successMessage && <p className="success-text">{successMessage}</p>}

          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="nombre"
                  className="input-field"
                  placeholder="Ingresa tu nombre"
                  value={nombre}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="apellido">Apellido</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="apellido"
                  className="input-field"
                  placeholder="Ingresa tu apellido"
                  value={apellido}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="telefono">Teléfono</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="telefono"
                  className="input-field"
                  placeholder="Ingresa tu número de teléfono"
                  value={telefono}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="correo">Correo electrónico</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="correo"
                  className="input-field"
                  placeholder="Ingresa tu dirección de correo electrónico"
                  value={correo}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="contraseña">Contraseña</label>
              <div className="input-wrapper">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="contraseña"
                  className="input-field"
                  placeholder="Ingresa tu contraseña"
                  value={contraseña}
                  onChange={this.handleChange}
                  required
                />
                <i
                  className={`bi ${passwordVisible ? 'bi-eye-slash' : 'bi-eye'} toggle-icon`}
                  onClick={this.togglePasswordVisibility}
                ></i>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmContraseña">Confirmar Contraseña</label>
              <div className="input-wrapper">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="confirmContraseña"
                  className="input-field"
                  placeholder="Confirma tu contraseña"
                  value={confirmContraseña}
                  onChange={this.handleChange}
                  required
                />
                <i
                  className={`bi ${confirmPasswordVisible ? 'bi-eye-slash' : 'bi-eye'} toggle-icon`}
                  onClick={this.toggleConfirmPasswordVisibility}
                ></i>
              </div>
            </div>

            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
