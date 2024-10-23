import React, { useState } from 'react';
import './PropertyUpload.css';

function PropertyUpload() {
  const [propertyType, setPropertyType] = useState('');
  const [amenities, setAmenities] = useState({
    wifi: false,
    aireAcondicionado: false,
    tv: false,
    cocina: false,
    piscina: false,
    estacionamiento: false,
    accesoParaDiscapacitados: false,
  });
  
  const handleAmenityChange = (e) => {
    setAmenities({
      ...amenities,
      [e.target.name]: e.target.checked
    });
  };

  return (
    <div className="property-upload-page">
      <div className="property-upload-container">
        <h2>Subir Propiedad para Alquiler</h2>

        {}
        <section>
          <h3>Información del Propietario</h3>
          <div className="input-group">
            <label htmlFor="ownerName">Nombre completo</label>
            <input type="text" id="ownerName" placeholder="Tu nombre completo" required />
          </div>
          <div className="input-group">
            <label htmlFor="ownerEmail">Correo electrónico</label>
            <input type="email" id="ownerEmail" placeholder="Tu correo electrónico" required />
          </div>
          <div className="input-group">
            <label htmlFor="ownerPhone">Teléfono</label>
            <input type="tel" id="ownerPhone" placeholder="Tu número de teléfono" required />
          </div>
        </section>

        {}
        <section>
          <h3>Detalles de la Propiedad</h3>
          <div className="input-group">
            <label htmlFor="title">Título del anuncio</label>
            <input type="text" id="title" placeholder="Ej. Apartamento con vista al mar" required />
          </div>
          <div className="input-group">
            <label htmlFor="description">Descripción</label>
            <textarea id="description" placeholder="Describe tu propiedad..." required></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="propertyType">Tipo de propiedad</label>
            <select id="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required>
              <option value="">Seleccionar</option>
              <option value="apartment">Apartamento</option>
              <option value="house">Casa</option>
              <option value="studio">Estudio</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="location">Ubicación</label>
            <input type="text" id="location" placeholder="Dirección o ciudad" required />
          </div>
          <div className="input-group">
            <label htmlFor="photos">Fotos de la propiedad</label>
            <input type="file" id="photos" multiple accept="image/*" />
          </div>
          <div className="input-group">
            <label htmlFor="video">Video tour (opcional)</label>
            <input type="file" id="video" accept="video/*" />
          </div>
        </section>

        {}
        <section>
          <h3>Comodidades</h3>
          <div className="checkbox-group">
            {Object.keys(amenities).map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  name={amenity}
                  checked={amenities[amenity]}
                  onChange={handleAmenityChange}
                />{' '}
                {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
            ))}
          </div>
        </section>

        {}
        <section>
          <h3>Detalles del Alojamiento</h3>
          <div className="input-group">
            <label htmlFor="bedrooms">Número de habitaciones</label>
            <input type="number" id="bedrooms" placeholder="Ej. 2" required />
          </div>
          <div className="input-group">
            <label htmlFor="bathrooms">Número de baños</label>
            <input type="number" id="bathrooms" placeholder="Ej. 1" required />
          </div>
          <div className="input-group">
            <label htmlFor="capacity">Capacidad máxima de huéspedes</label>
            <input type="number" id="capacity" placeholder="Ej. 4 personas" required />
          </div>
          <div className="input-group">
            <label htmlFor="size">Tamaño (en m² o ft²)</label>
            <input type="number" id="size" placeholder="Tamaño de la propiedad" required />
          </div>
        </section>

        {}
        <section>
          <h3>Precio y Condiciones</h3>
          <div className="input-group">
            <label htmlFor="price">Precio por noche</label>
            <input type="number" id="price" placeholder="Ej. 100" required />
          </div>
          <div className="input-group">
            <label htmlFor="minStay">Estancia mínima (en noches)</label>
            <input type="number" id="minStay" placeholder="Ej. 2 noches" required />
          </div>
          <div className="input-group">
            <label htmlFor="cleaningFee">Costo adicional por limpieza</label>
            <input type="number" id="cleaningFee" placeholder="Ej. 20" />
          </div>
          <div className="input-group">
            <label htmlFor="cancellationPolicy">Política de cancelación</label>
            <select id="cancellationPolicy" required>
              <option value="flexible">Flexible</option>
              <option value="moderate">Moderada</option>
              <option value="strict">Estricto</option>
            </select>
          </div>
        </section>

        {}
        <button type="submit" className="submit-button">Subir Propiedad</button>
      </div>
    </div>
  );
}

export default PropertyUpload;
