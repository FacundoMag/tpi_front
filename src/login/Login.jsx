import React, { Component } from 'react';  
import { Link, Redirect } from 'wouter'; // Cambiar aquí para importar Redirect  
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
      const response = await axios.post('http://localhost:4001/api/user/inicio_sesion', {  
        correo: email,  
        contraseña: password,  
      }, {  
        headers: {  
          'Content-Type': 'application/json',  
        }  
      });  

      const data = response.data;  

      if (data.status === 'ok') {  
        localStorage.setItem('token', data.token);  
        this.props.onLogin(data.userId);  
        this.setState({ isAuthenticated: true }); // Esto activará la redirección  
      } else {  
        this.setState({ error: data.error || 'Error de inicio de sesión' });  
      }  
    } catch (error) {  
      this.setState({ error: 'Error de conexión con el servidor' });  
      console.error(error);  
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

          <h2 className="login-title">Sign in</h2>  
          <p className="login-text">  
            If you don't have an account register{' '}  
            <Link to="/crear-cuenta" className="register-link">Register here!</Link>  
          </p>  

          {error && <p className="error-text">{error}</p>}  

          <form className="login-form" onSubmit={this.handleSubmit}>  
            <InputField  
              type="email"  
              id="email"  
              label="Email"  
              placeholder="Enter your email address"  
              iconClass="bi bi-envelope"  
              value={email}  
              onChange={this.handleChange}  
            />  

            <InputField  
              type={passwordVisible ? 'text' : 'password'}  
              id="password"  
              label="Password"  
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