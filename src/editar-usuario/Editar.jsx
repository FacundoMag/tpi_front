import React, { Component } from 'react';  
import { Link } from 'wouter';  
import axios from 'axios';  
import './Editar.css';  

class Editar extends Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      email: '',  
      nombre: '',  
      apellido: '',  
      telefono: '',  
    };  
  }  

  handleChange = (e) => {  
    const { id, value } = e.target;  
    this.setState({ [id]: value });  
  };  

  handleSubmit = async (e) => {  
    e.preventDefault();  
    const { email, nombre, apellido, telefono } = this.state;  
    
    // Recuperar el token de localStorage  
    const token = localStorage.getItem('token');  

    try {  
      const response = await axios.put('http://localhost:4001/api/user/edit', {  
        email,  
        nombre,  
        apellido,  
        telefono,  
      }, {  
        headers: {  
          Authorization: `Bearer ${token}`,  
        }  
      });  

      if (response.data.status === 'ok') {  
        alert("Perfil actualizado correctamente");  
      } else {  
        alert("Error al actualizar perfil: " + response.data.error);  
      }  
    } catch (error) {  
      console.error("Error al conectar con el servidor", error);  
      alert("Hubo un problema con la conexión al servidor");  
    }  
  };  

  render() {  
    const { email, nombre, apellido, telefono } = this.state;  

    return (  
      <div className="editar-page">  
        <div className="editar-container">  
          <Link to="/" className="back-icon" title="Go Back">  
            <i className="bi bi-arrow-left"></i>  
          </Link>  

          <h2 className="editar-title">Editar Perfil</h2>  

          <form className="editar-form" onSubmit={this.handleSubmit}>  
            <InputField  
              type="email"  
              id="email"  
              label="Correo electrónico"  
              placeholder="Ingresa tu dirección de correo electrónico"  
              iconClass="bi bi-envelope"  
              value={email}  
              onChange={this.handleChange}  
            />  

            <InputField  
              type="text"  
              id="nombre"  
              label="Nombre"  
              placeholder="Ingresa tu nombre"  
              iconClass="bi bi-person"  
              value={nombre}  
              onChange={this.handleChange}  
            />  

            <InputField  
              type="text"  
              id="apellido"  
              label="Apellido"  
              placeholder="Ingresa tu apellido"  
              iconClass="bi bi-person"  
              value={apellido}  
              onChange={this.handleChange}  
            />  

            <InputField  
              type="text"  
              id="telefono"  
              label="Teléfono"  
              iconClass="bi bi-telephone"  
              placeholder="Ingresa el número telefónico"  
              value={telefono}  
              onChange={this.handleChange}  
            />  

            <button type="submit" className="editar-button">Guardar Cambios</button>  
          </form>  
        </div>  
      </div>  
    );  
  }  
}  

class InputField extends Component {  
  render() {  
    const { type, id, label, placeholder, iconClass, value, onChange } = this.props;  

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
        </div>  
      </div>  
    );  
  }  
}  

export default Editar;