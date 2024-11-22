import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'wouter';
import Notificacion from '../comun/Notificacion';
import './EditarPropiedades.css';

export default class EditarPropiedades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        direccion: '',
        ciudad_id: '',
        num_habitaciones: '',
        num_banos: '',
        capacidad: '',
        tamano_m2: '',
        precio_renta: '',
        tipo_id: '',
        descripcion: '',
      },
      error: null,
      successMessage: '',
    };
  }

  async componentDidMount() {
    const { id_casa } = this.props;
    const token = localStorage.getItem('token');

    if (!token) {
      this.setState({ error: 'No hay sesión activa. Por favor, inicie sesión.' });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4001/api/propiedades/${id_casa}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const propiedad = response.data;

      this.setState({
        formData: {
          ...this.state.formData,
          ...propiedad,
        },
      });
    } catch (error) {
      console.error('Error al cargar la propiedad:', error);
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id_casa } = this.props;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.setState({
          error: 'No hay token de autenticación. Por favor, inicie sesión nuevamente.',
          successMessage: '',
        });
        return;
      }

      await axios.put(
        `http://localhost:4001/api/propiedades?propiedad_id=${id_casa}`,
        this.state.formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Notificacion.show('Propiedad actualizada correctamente', 'success');
       window.location.href ("/") // Redirige después de editar
    } catch (error) {
      this.setState({
      });
    }
  };

  render() {
    const { formData, error, successMessage } = this.state;

    return (
      <div className="contenedor-centro" style={{position: 'relative'}}>
        <form onSubmit={this.handleSubmit} className="editarpropiedades">
          <div className="form-header">
            <Link href="/mis-propiedades" className="back-icon">
              <i className="bi bi-arrow-left"></i>
            </Link>
            <h2>Editar Propiedad</h2>
          </div>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div className="form-row">
            <div className="form-group">
              <label>Dirección:</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ciudad:</label>
              <select
                name="ciudad_id"
                value={formData.ciudad_id}
                onChange={this.handleChange}
                required
              >
                <option value="">Seleccione Ciudad</option>
                <option value="1">Ushuaia</option>
                <option value="2">Tolhuin</option>
                <option value="3">Rio Grande</option>
              </select>
            </div>

            <div className="form-group">
              <label>Habitaciones:</label>
              <input
                type="number"
                name="num_habitaciones"
                value={formData.num_habitaciones}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Baños:</label>
              <input
                type="number"
                name="num_banos"
                value={formData.num_banos}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Capacidad:</label>
              <input
                type="number"
                name="capacidad"
                value={formData.capacidad}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Área (m²):</label>
              <input
                type="number"
                name="tamano_m2"
                value={formData.tamano_m2}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Precio de Renta:</label>
              <input
                type="number"
                name="precio_renta"
                value={formData.precio_renta}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Tipo de Propiedad:</label>
              <select
                name="tipo_id"
                value={formData.tipo_id}
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
              <label>Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Actualizar Propiedad
          </button>
        </form>
      </div>
    );
  }
}
