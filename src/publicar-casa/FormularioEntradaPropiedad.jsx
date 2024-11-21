import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'wouter';
import Notificacion from '../comun/Notificacion';
import './FormularioEntradaPropiedad.css';

const ciudades = {
  "Ushuaia": 1,
  "Tolhuin": 2,
  "Rio Grande": 3,
};

export default class FormularioEntradaPropiedad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { 
        direccion: '',
        precio: '',
        tipoPropiedad: '',
        num_habitaciones: '',
        num_banos: '',
        capacidad: '',
        tamano_m2: '',
        precio_renta: '',
        tipo_id: '',
        ciudad_id: '',
        descripcion: '',
        caracteristicas: {
          aireAcondicionado: false,
          garaje: false,
          patio: false,
          piscina: false,
          tv: false,
          wifi: false,
        },
        archivos: null,
      },
      error: null,
      successMessage: '',
      usuario_id: this.props.usuario_id || null,
    };
    this.imagenes = React.createRef();
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const usuario_id = localStorage.getItem('userId');
    console.log('Token actual:', token);
    console.log('usuario_id:', usuario_id);
  
    if (!token) {
      console.warn('No hay token almacenado');
      this.setState({
        error: 'No hay sesión activa. Por favor, inicie sesión.'
      });
    } else {
      if (usuario_id) {
        this.setState({ usuario_id }); // Guardar el ID del usuario en el estado
      } else {
        console.warn('No hay ID de usuario almacenado');
      }
    }
  }
  
  handleBackClick = () => {
    this.props.history.push('/');
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && this.state.formData.caracteristicas.hasOwnProperty(name)) {
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          caracteristicas: {
            ...prevState.formData.caracteristicas,
            [name]: checked,
          },
        },
      }));
    } else {
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: type === 'checkbox' ? checked : value,
        },
      }));
    }
  };

  handleCiudadChange = (e) => {
    const ciudad = e.target.value;
    const ciudad_id = ciudades[ciudad] || '';
    console.log(`Ciudad seleccionada: ${ciudad}, Ciudad ID: ${ciudad_id}`);
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        ciudad_id: ciudad_id,
      },
    }));
  }

  handleFileChange = (e) => {
    console.log('Archivos seleccionados:', e.target.files);
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        archivos: e.target.files,
      },
    }));
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    const { ciudad_id, ...restoFormulario } = this.state.formData;
    
    if (!ciudad_id) {
      this.setState({ error: 'El campo "Ciudad" no puede estar vacío.', successMessage: '' });
      return;
    }
    
    const formDataToSend = new FormData();
    
    Object.keys(restoFormulario).forEach(key => {
      if (key === 'caracteristicas') {
        const listaServicios = Object.entries(this.state.formData.caracteristicas);
        const caracteristicas = listaServicios.filter((servicio) => servicio[1] == true).map((servicio) => servicio[0]);
        formDataToSend.append('caracteristicas', caracteristicas.join(','));
      } else if (key === 'archivos') {
        if (this.state.formData.archivos) {
          Array.from(this.state.formData.archivos).forEach(file => {
            formDataToSend.append('archivos', file);
          });
        }
      } else {
        formDataToSend.append(key, this.state.formData[key]);
      }
    });
    
    formDataToSend.append('ciudad_id', ciudad_id);
    formDataToSend.append('propietario_id', this.state.usuario_id);
    
    console.log('Datos del formulario a enviar:', Object.fromEntries(formDataToSend.entries()));
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.setState({
          error: 'No hay token de autenticación. Por favor, inicie sesión nuevamente.',
          successMessage: ''
        });
        return;
      }
    
      const tokenToSend = `Bearer ${token}`;
    
      const response = await axios.post('http://localhost:4001/api/propiedades', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': tokenToSend,
        }
      });
    
      Notificacion.show("Se Publico la Propiedad correctamente","success");
      this.props.history.push('/');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          mensajeError = 'No tiene permisos para realizar esta acción. Verifique su sesión.';
        } else if (error.response.status === 401) {
          mensajeError = 'Sesión expirada. Por favor, inicie sesión nuevamente.';
        }
      } else if (error.request) {
        mensajeError = 'No se pudo conectar con el servidor. Verifique su conexión.';
      }
      this.setState({ error: mensajeError, successMessage: '' });
    }
  };
  

  render() {
    return (
      <div className="contenedor-centro">
        <form onSubmit={this.handleSubmit} className="formulario-entrada-propiedad" method="post">
          <div className="form-header">
                <Link to ="/" className="back-icon" title='Go Back'>
                    <i className="bi bi-arrow-left"></i>  
                </Link>
            <h2>Ingresar Detalles de la Propiedad</h2>
          </div>
  
          {this.state.error && <div className="error-message">{this.state.error}</div>}
          {this.state.successMessage && <div className="success-message">{this.state.successMessage}</div>}
  
          <div className="form-row">
            <div className="form-group">
              <label>Dirección:</label>
              <input type="text" name="direccion" value={this.state.formData.direccion} onChange={this.handleChange} required />
            </div>
  
            <div className="form-group">
              <label>Precio de Renta:</label> {/* Cambiado de 'precio' a 'precio_renta' */}
              <input
                type="number"
                name="precio_renta"
                value={this.state.formData.precio_renta}
                onChange={this.handleChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Tipo de Propiedad:</label>
              <select
                name="tipo_id"
                value={this.state.formData.tipo_id}
                onChange={this.handleChange}
                required
              >
                <option value="">Seleccione Tipo</option>
                <option value="1">Departamento</option>
                <option value="2">Casa</option>
                <option value="3">Condominio</option>
              </select>
            </div>
  
            <div className="form-group">
              <label>Habitaciones:</label>
              <input
                type="number"
                name="num_habitaciones"
                value={this.state.formData.num_habitaciones}
                onChange={this.handleChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Baños:</label>
              <input
                type="number"
                name="num_banos"
                value={this.state.formData.num_banos}
                onChange={this.handleChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Capacidad:</label> {/* Añadido campo capacidad */}
              <input
                type="number"
                name="capacidad"
                value={this.state.formData.capacidad}
                onChange={this.handleChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Área (m²):</label>
              <input
                type="number"
                name="tamano_m2" // Cambiado de 'area' a 'tamano_m2'
                value={this.state.formData.tamano_m2}
                onChange={this.handleChange}
                required
              />
            </div>
  
            <div className="form-group"> 
              <label>Ciudad:</label> 
              <select name="ciudad" value={this.state.formData.ciudad_id ? Object.keys(ciudades).find(key => ciudades[key] === this.state.formData.ciudad_id) : ''} 
              onChange={this.handleCiudadChange} required > 
                <option value="">Seleccionar Ciudad</option> 
                <option value="Ushuaia">Ushuaia</option> 
                <option value="Tolhuin">Tolhuin</option> 
                <option value="Rio Grande">Río Grande</option> 
              </select> 
            </div>
          </div>
  
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={this.state.formData.descripcion}
              onChange={this.handleChange}
              required
            />
          </div>
  
          <label>Características:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="aireAcondicionado"
                checked={this.state.formData.caracteristicas.aireAcondicionado}
                onChange={this.handleChange}
              />
              Aire Acondicionado
            </label>
            <label>
              <input
                type="checkbox"
                name="garaje"
                checked={this.state.formData.caracteristicas.garaje}
                onChange={this.handleChange}
              />
              Garaje
            </label>
            <label>
              <input
                type="checkbox"
                name="patio"
                checked={this.state.formData.caracteristicas.patio}
                onChange={this.handleChange}
              />
              Patio
            </label>
            <label>
              <input
                type="checkbox"
                name="piscina"
                checked={this.state.formData.caracteristicas.piscina}
                onChange={this.handleChange}
              />
              Piscina
            </label>
            <label>
              <input
                type="checkbox"
                name="tv"
                checked={this.state.formData.caracteristicas.tv}
                onChange={this.handleChange}
              />
              Cable
            </label>
            <label>
              <input
                type="checkbox"
                name="wifi"
                checked={this.state.formData.caracteristicas.wifi}
                onChange={this.handleChange}
              />
              Wifi
            </label>
          </div>
  
          <label>Imágenes:</label>
          <input 
            type="file" 
            name="archivos" 
            onChange={this.handleFileChange} 
            ref={this.imagenes}
            multiple 
          />
  
          <button type="submit" className="boton-primario">Publicar</button>
        </form>
      </div>
    );
  }
}  