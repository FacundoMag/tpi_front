import React, { useState } from 'react';
import './PropertyUpload.css';

const PropertyUpload = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    direccion: '',
    ciudad_id: '',
    tipo_id: '',
    num_habitaciones: '',
    num_banos: '',
    tamano_m2: '',
    precio_renta: '',
    descripcion: ''
  });

  const [amenities, setAmenities] = useState({
    wifi: false,
    aireAcondicionado: false,
    tv: false,
    cocina: false,
    piscina: false,
    estacionamiento: false,
    accesoParaDiscapacitados: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAmenityChange = (e) => {
    setAmenities({ ...amenities, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form values submitted:', formValues);
    console.log('Amenities:', amenities);
  };

  return (
    <div className="upload-property-page">
      <div className="upload-property-container">
        <h2>Subir Nueva Propiedad</h2>
        <form onSubmit={handleSubmit}>

          {/* Sección de detalles de la propiedad */}
          <div className="property-details">
            <div className="input-group">
              <label htmlFor="nombre">Nombre de la Propiedad</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
                placeholder="Ej. Apartamento con vista al mar"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formValues.direccion}
                onChange={handleChange}
                placeholder="Dirección o ciudad"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="ciudad_id">Ciudad</label>
              <select
                id="ciudad_id"
                name="ciudad_id"
                value={formValues.ciudad_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="ushuaia">Ushuaia</option>
                <option value="rio_grande">Río Grande</option>
                <option value="tolhuin">Tolhuin</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="tipo_id">Tipo de Propiedad</label>
              <select
                id="tipo_id"
                name="tipo_id"
                value={formValues.tipo_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="apartment">Apartamento</option>
                <option value="house">Casa</option>
                <option value="studio">Estudio</option>
              </select>
            </div>
          </div>

          {/* Sección de comodidades */}
          <div className="property-amenities">
            <h4>Comodidades</h4>
            <div className="checkbox-group">
              {Object.keys(amenities).map((amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    name={amenity}
                    checked={amenities[amenity]}
                    onChange={handleAmenityChange}
                  />
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
              ))}
            </div>
          </div>

          {/* Sección de detalles adicionales */}
          <div className="property-extra-details">
            <div className="input-group">
              <label htmlFor="num_habitaciones">Número de Habitaciones</label>
              <input
                type="number"
                id="num_habitaciones"
                name="num_habitaciones"
                value={formValues.num_habitaciones}
                onChange={handleChange}
                placeholder="Ej. 2"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="num_banos">Número de Baños</label>
              <input
                type="number"
                id="num_banos"
                name="num_banos"
                value={formValues.num_banos}
                onChange={handleChange}
                placeholder="Ej. 1"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="tamano_m2">Tamaño (en m²)</label>
              <input
                type="number"
                id="tamano_m2"
                name="tamano_m2"
                value={formValues.tamano_m2}
                onChange={handleChange}
                placeholder="Tamaño de la propiedad"
                required
              />
            </div>
          </div>

          {/* Botón de envío */}
          <button type="submit" className="submit-button">Subir Propiedad</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyUpload;
