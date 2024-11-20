import React, { Component } from 'react';  
import { Link, Redirect } from 'wouter';   
import axios from 'axios';   
import './Login.css';  

class Login extends Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      passwordVisible: false,  
      email: '',  
      password: '',  
      error: '',  
      isAuthenticated: false,  
    };  
  }  

  togglePasswordVisibility = () => {  
    this.setState((prevState) => ({  
      passwordVisible: !prevState.passwordVisible,  
    }));  
  };  

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
        const response = await axios.post(
            'http://localhost:4001/api/user/inicio_sesion',
            {
                correo: email,
                contraseña: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = response.data;

        if (data.status === 'ok') {
            localStorage.setItem('token', data.token);

            this.props.onLogin(data.usuario_id, data.token);
            
            this.setState({ isAuthenticated: true, error: null }); // Limpia errores previos si el inicio es exitoso
        } else {
            this.setState({ error: data.error || 'Error de inicio de sesión' });
        }
    } catch (error) {
        // Verifica si el error proviene de la respuesta del servidor o de la conexión
        const errorMessage =
            error.response?.data?.error || 'Error de conexión con el servidor';
        this.setState({ error: errorMessage });
        console.error('Error en el inicio de sesión:', error);
    }
  };

  handleChange = (e) => {  
    this.setState({ [e.target.id]: e.target.value });  
  };  

  render() {  
    const { email, password, passwordVisible, error, isAuthenticated } = this.state;  

    if (isAuthenticated) {  
      return <Redirect to="/" />;  // Redirige a la página de inicio si está autenticado  
    }  

    return (  
      <div className="login-page">  
        <div className="login-container">  
          <Link to="/" className="back-icon" title="Go Back">  
            <i className="bi bi-arrow-left"></i>  
          </Link>  

          <h2 className="login-title">Iniciar Sesión</h2>  
          <p className="login-text">  
          Si no tienes una cuenta registrate{' '}  
            <Link to="/crear-cuenta" className="register-link">Registrarme!</Link>  
          </p>  

          {error && <p className="error-text">{error}</p>}  

          <form className="login-form" onSubmit={this.handleSubmit}>  
            <InputField  
              type="email"  
              id="email"  
              label="Correo Electronico"  
              placeholder="Enter your email address"  
              iconClass="bi bi-envelope"  
              value={email}  
              onChange={this.handleChange}  
            />  

            <InputField  
              type={passwordVisible ? 'text' : 'password'}  
              id="password"  
              label="Contraseña"  
              placeholder="Enter your Password"  
              iconClass="bi bi-lock"  
              toggleIconClass={passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'}  
              onToggle={this.togglePasswordVisibility}  
              value={password}  
              onChange={this.handleChange}  
            />  

            <div className="options">  
              <label className="checkbox-container">  
                <input type="checkbox" id="rememberMe" />  
                Recuerdame  
              </label>  
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
}  

class InputField extends Component {  
  render() {  
    const { type, id, label, placeholder, iconClass, toggleIconClass, onToggle, value, onChange } = this.props;  

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
            value={value}  
            onChange={onChange}  
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
}  

class SocialIcon extends Component {  
  render() {  
    const { iconClass, onClick } = this.props;  

    return (  
      <a href="/#" className="social-icon" onClick={onClick}>  
        <i className={`${iconClass}`}></i>  
      </a>  
    );  
  }  
}  

export default Login;