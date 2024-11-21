import React, { Component } from "react";
import axios from "axios";
import "./Editar.css"; // Importa tu CSS
import Boton from "../comun/Boton";
import Notificacion from "../comun/Notificacion";

export default class Editar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            apellido: "",
            telefono: "",
            correo: "",
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { correo, nombre, apellido, telefono } = this.state;
        const token = localStorage.getItem("token");

        if (!nombre || !apellido || !telefono || !correo) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:4001/api/user/mi_perfil`,
                { correo, nombre, apellido, telefono },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status === "ok") {
              Notificacion.show("Se ha actualizado el usuario correctamente.", "success");
            } else {
                alert("Error al actualizar perfil: " + (response.data.error || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            alert("Hubo un problema con la conexión al servidor.");
        }
    };

    render() {
        const { correo, nombre, apellido, telefono } = this.state;
        return (
            <div className="editar-page">
                <div className="editar-container">
                <Boton to="/" className="back-icon" title="Go Back">  
                  <i className="bi bi-arrow-left "></i>  
                 </Boton>  
                    <h2>Editar Usuario</h2>
                    <form className="editar-form" onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <div className="input-wrapper">
                               <i class="bi bi-person icon"></i>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input-wrapper">
                                 <i class="bi bi-person icon"></i>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="apellido"
                                    placeholder="Apellido"
                                    value={apellido}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input-wrapper">
                               <i class="bi bi-envelope-at icon"></i>
                                <input
                                    className="input-field"
                                    type="email"
                                    name="correo"
                                    placeholder="Correo"
                                    value={correo}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input-wrapper">
                               <i class="bi bi-telephone icon"></i>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={telefono}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <button className="editar-button" type="submit">
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
