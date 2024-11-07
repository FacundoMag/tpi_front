import React, { useState } from 'react';
import axios from 'axios';
import './FormularioEntradaPropiedad.css'; 

function FormularioEntradaPropiedad() {
  const [formData, setFormData] = useState({
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
  });

  const handleBackClick = () => {
    window.location.href = '/';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && formData.caracteristicas.hasOwnProperty(name)) {
      setFormData((prev) => ({
        ...prev,
        caracteristicas: {
          ...prev.caracteristicas,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      archivos: e.target.files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    // Agregar datos del formulario
    Object.keys(formData).forEach(key => {
      if (key === 'caracteristicas') {
        Object.keys(formData.caracteristicas).forEach(caracteristica => {
          formDataToSend.append(`caracteristicas[${caracteristica}]`, formData.caracteristicas[caracteristica]);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Agregar archivos
    if (formData.archivos) {
      Array.from(formData.archivos).forEach(file => {
        formDataToSend.append('archivos', file);
      });
    }

    axios.post('http://localhost:4001/api/propiedades', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
      alert('Propiedad publicada con éxito');
    })
    .catch(error => {
      console.error('Hubo un error al publicar la propiedad:', error);
      alert('Hubo un error al publicar la propiedad');
    });
  };

  return (
    <div className="contenedor-centro">
      <form onSubmit={handleSubmit} className="formulario-entrada-propiedad">
        <div className="form-header">
          <i
            className="bi bi-arrow-left back-icon"
            title="Go Back"
            onClick={handleBackClick}
          ></i>
          <h2>Ingresar Detalles de la Propiedad</h2>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Dirección:</label>
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tipo de Propiedad:</label>
            <select
              name="tipoPropiedad"
              value={formData.tipoPropiedad}
              onChange={handleChange}
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
              value={formData.habitaciones}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Baños:</label>
            <input
              type="number"
              name="banos"
              value={formData.banos}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Área (m²):</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ciudad:</label>
            <select
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
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
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <label>Características:</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="aireAcondicionado"
              checked={formData.caracteristicas.aireAcondicionado}
              onChange={handleChange}
            />
            Aire Acondicionado
          </label>
          <label>
            <input
              type="checkbox"
              name="garaje"
              checked={formData.caracteristicas.garaje}
              onChange={handleChange}
            />
            Garaje
          </label>
          <label>
            <input
              type="checkbox"
              name="patio"
              checked={formData.caracteristicas.patio}
              onChange={handleChange}
            />
            Patio
          </label>
          <label>
            <input
              type="checkbox"
              name="piscina"
              checked={formData.caracteristicas.piscina}
              onChange={handleChange}
            />
            Piscina
          </label>
          <label>
            <input type="checkbox" name="cable" checked={formData.caracteristicas.tv} onChange={handleChange} />
            Cable
          </label>
          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={formData.caracteristicas.wifi}
              onChange={handleChange}
            />
            WI-FI
          </label>
        </div>

        <label>Subir Imágenes:</label>
        <input type="file" name="archivos" multiple onChange={handleFileChange} />

        <button type="submit" className="submit-button">Publicar</button>
      </form>
    </div>
  );
}

export default FormularioEntradaPropiedad;
