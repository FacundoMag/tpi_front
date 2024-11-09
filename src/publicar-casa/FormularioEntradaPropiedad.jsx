import React, { Component } from 'react';
import axios from 'axios';
import './FormularioEntradaPropiedad.css';

export default class FormularioEntradaPropiedad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        nombrePropiedad: '',
        precio: '',
        direccion: '',
        contacto: '',
        tipoPropiedad: '',
        habitaciones: '',
        banos: '',
        area: '',
        ciudad: '',
        descripcion: '',
        caracteristicas: {
          cocina: false,
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
      successMessage: '', // Mensaje de éxito
    };
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

  handleFileChange = (e) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        archivos: e.target.files,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.keys(this.state.formData).forEach(key => {
      if (key === 'caracteristicas') {
        Object.keys(this.state.formData.caracteristicas).forEach(caracteristica => {
          formDataToSend.append(`caracteristicas[${caracteristica}]`, this.state.formData.caracteristicas[caracteristica]);
        });
      } else if (key === 'archivos' && this.state.formData.archivos) {
        Array.from(this.state.formData.archivos).forEach(file => {
          formDataToSend.append('archivos', file);
        });
      } else {
        formDataToSend.append(key, this.state.formData[key]);
      }
    });
  
    try {
      const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
  
      const response = await axios.post('http://localhost:4001/api/propiedades', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Agrega el token al encabezado
        }
      });
      console.log(response.data);
      this.setState({ successMessage: 'Propiedad publicada con éxito', error: null });
      this.props.history.push('/');  // Redirige después de publicar
    } catch (error) {
      console.error('Hubo un error al publicar la propiedad:', error);
      this.setState({ error: 'Hubo un error al publicar la propiedad', successMessage: '' });
    }
  };
  render() {
    return (
      <div className="contenedor-centro">
        <form onSubmit={this.handleSubmit} className="formulario-entrada-propiedad">
          <div className="form-header">
            <i
              className="bi bi-arrow-left back-icon"
              title="Go Back"
              onClick={this.handleBackClick}
            ></i>
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
              <label>Precio:</label>
              <input
                type="number"
                name="precio"
                value={this.state.formData.precio}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tipo de Propiedad:</label>
              <select
                name="tipoPropiedad"
                value={this.state.formData.tipoPropiedad}
                onChange={this.handleChange}
                required
              >
                <option value="">Seleccione Tipo</option>
                <option value="departamento">Departamento</option>
                <option value="casa">Casa</option>
                <option value="condominio">Condominio</option>
              </select>
            </div>

            <div className="form-group">
              <label>Habitaciones:</label>
              <input
                type="number"
                name="habitaciones"
                value={this.state.formData.habitaciones}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Baños:</label>
              <input
                type="number"
                name="banos"
                value={this.state.formData.banos}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Área (m²):</label>
              <input
                type="number"
                name="area"
                value={this.state.formData.area}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ciudad:</label>
              <select
                name="ciudad"
                value={this.state.formData.ciudad}
                onChange={this.handleChange}
                required
              >
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
              <input type="checkbox" name="tv" checked={this.state.formData.caracteristicas.tv} onChange={this.handleChange} />
              Cable
            </label>
            <label>
              <input
                type="checkbox"
                name="wifi"
                checked={this.state.formData.caracteristicas.wifi}
                onChange={this.handleChange}
              />
              WI-FI
            </label>
          </div>

          <label>Subir Imágenes:</label>
          <input type="file" name="archivos" multiple onChange={this.handleFileChange} />

          <button type="submit" className="submit-button">Publicar</button>
        </form>
      </div>
    );
  }
}