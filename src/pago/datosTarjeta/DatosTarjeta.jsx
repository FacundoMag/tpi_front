import { Component } from "react";
import "./DatosTarjeta.css";

export default class DatosTarjeta extends Component {
    verificarCampos = () => {
        // Collect all input elements
        const inputs = document.querySelectorAll(".DatosTarjeta input, .DatosTarjeta select");

        // Check if each input/select has a value
        return Array.from(inputs).every(input => input.value.trim());
    };

    render() {
        return (
            <div className="DatosTarjeta">
                <h2 className="PublicSans">Información de pago</h2>

                <label htmlFor="tipoTarjeta">Tipo de tarjeta:</label>
                <select id="tipoTarjeta" className="SelectTarjeta">
                    <option value="">Seleccione</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                </select>

                <label htmlFor="nombreTarjeta">Nombre en la tarjeta:</label>
                <input id="nombreTarjeta" type="text" className="InputTarjeta" />

                <label htmlFor="numeroTarjeta">Número de tarjeta:</label>
                <input id="numeroTarjeta" type="number" className="InputTarjeta" />

                <div className="flexRow">
                    <div className="halfColumn">
                        <label htmlFor="fechaVencimiento">Fecha de vencimiento:</label>
                        <input id="fechaVencimiento" type="date" className="InputTarjeta" />
                    </div>
                    <div className="halfColumn">
                        <label htmlFor="cvc">CVC:</label>
                        <input id="cvc" type="number" className="InputTarjeta" />
                    </div>
                </div>

                <h2 className="PublicSans">Información de facturación</h2>

                <div className="flexRow">
                    <div className="halfColumn">
                        <label htmlFor="nombre">Nombre:</label>
                        <input id="nombre" type="text" className="InputTarjeta" />
                    </div>
                    <div className="halfColumn">
                        <label htmlFor="apellidos">Apellidos:</label>
                        <input id="apellidos" type="text" className="InputTarjeta" />
                    </div>
                </div>

                <div className="flexRow">
                    <div className="halfColumn">
                        <label htmlFor="localidad">Localidad:</label>
                        <input id="localidad" type="text" className="InputTarjeta" />
                    </div>
                    <div className="halfColumn">
                        <label htmlFor="codigoPostal">Código postal o zip:</label>
                        <input id="codigoPostal" type="number" className="InputTarjeta" />
                    </div>
                </div>

                <label htmlFor="direccionFacturacion">Dirección de facturación:</label>
                <input id="direccionFacturacion" type="text" className="InputTarjeta" />

                <div className="flexRow">
                    <div className="halfColumn">
                        <label htmlFor="pais">País:</label>
                        <select id="pais" className="InputTarjeta">
                            <option value="">Seleccione</option>
                            <option value="afganistan">Afganistán</option>
                            <option value="alemania">Alemania</option>
                            <option value="andorra">Andorra</option>
                            <option value="angola">Angola</option>
                            <option value="antigua">Antigua y Barbuda</option>
                            <option value="arabia_saudita">Arabia Saudita</option>
                            <option value="argentina">Argentina</option>
                            <option value="australia">Australia</option>
                            <option value="austria">Austria</option>
                            <option value="bahamas">Bahamas</option>
                            <option value="bangladesh">Bangladesh</option>
                            <option value="barbados">Barbados</option>
                            <option value="belgica">Bélgica</option>
                            <option value="belice">Belice</option>
                            <option value="bolivia">Bolivia</option>
                            <option value="brasil">Brasil</option>
                            <option value="canada">Canadá</option>
                            <option value="chile">Chile</option>
                            <option value="china">China</option>
                            <option value="colombia">Colombia</option>
                            <option value="corea_sur">Corea del Sur</option>
                            <option value="costa_rica">Costa Rica</option>
                            <option value="cuba">Cuba</option>
                            <option value="dinamarca">Dinamarca</option>
                            <option value="dominica">Dominica</option>
                            <option value="ecuador">Ecuador</option>
                            <option value="egipto">Egipto</option>
                            <option value="el_salvador">El Salvador</option>
                            <option value="emiratos_arabes">Emiratos Árabes Unidos</option>
                            <option value="eslovaquia">Eslovaquia</option>
                            <option value="eslovenia">Eslovenia</option>
                            <option value="espana">España</option>
                            <option value="estados_unidos">Estados Unidos</option>
                            <option value="etiopia">Etiopía</option>
                            <option value="filipinas">Filipinas</option>
                            <option value="finlandia">Finlandia</option>
                            <option value="francia">Francia</option>
                            <option value="grecia">Grecia</option>
                            <option value="guatemala">Guatemala</option>
                            <option value="honduras">Honduras</option>
                            <option value="india">India</option>
                            <option value="indonesia">Indonesia</option>
                            <option value="irlanda">Irlanda</option>
                            <option value="israel">Israel</option>
                            <option value="italia">Italia</option>
                            <option value="jamaica">Jamaica</option>
                            <option value="japon">Japón</option>
                            <option value="kenia">Kenia</option>
                            <option value="marruecos">Marruecos</option>
                            <option value="mexico">México</option>
                            <option value="nicaragua">Nicaragua</option>
                            <option value="noruega">Noruega</option>
                            <option value="nueva_zelanda">Nueva Zelanda</option>
                            <option value="panama">Panamá</option>
                            <option value="paraguay">Paraguay</option>
                            <option value="peru">Perú</option>
                            <option value="polonia">Polonia</option>
                            <option value="portugal">Portugal</option>
                            <option value="reino_unido">Reino Unido</option>
                            <option value="republica_dominicana">República Dominicana</option>
                            <option value="rusia">Rusia</option>
                            <option value="suecia">Suecia</option>
                            <option value="suiza">Suiza</option>
                            <option value="uruguay">Uruguay</option>
                            <option value="venezuela">Venezuela</option>
                            <option value="vietnam">Vietnam</option>
                        </select>
                    </div>
                    <div className="halfColumn">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input id="telefono" type="number" className="InputTarjeta" />
                    </div>
                </div>
            </div>
        );
    }
}
