import React, { Component } from "react";
import axios from "axios";
import { Link } from "wouter";
import "./Editar.css"; // Importa tu CSS
import Notificacion from "../comun/Notificacion";

export default class Editar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            apellido: "",
            telefono: "",
            correo: "",
            loading: true, // Indicador de carga
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (!token) {
            Notificacion.show("No se encontró un token. Por favor, inicia sesión.", "error");
            return;
        }

        // Realizar la solicitud al backend para obtener los datos del usuario
        axios
            .get("http://localhost:4001/api/user/mi_perfil", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.data.status === "ok") {
                    const { nombre, apellido, telefono, correo } = response.data.result;
                    this.setState({ nombre, apellido, telefono, correo, loading: false });
                } else {
                    Notificacion.show("Error al obtener los datos del usuario.", "error");
                }
            })
            .catch((error) => {
                console.error("Error al cargar perfil:", error);
                Notificacion.show("Hubo un problema al conectar con el servidor.", "error");
            });
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
            Notificacion.show("Por favor, completa todos los campos.", "warn");
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
                window.location.href = "/";
            } else {
                Notificacion.show(
                    `Error al actualizar perfil: ${response.data.error || "Error desconocido"}`,
                    "error"
                );
            }
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            Notificacion.show("Hubo un problema con la conexión al servidor.", "error");
        }
    };

    render() {
        const { correo, nombre, apellido, telefono, loading } = this.state;

        if (loading) {
            return <p>Cargando datos del usuario...</p>;
        }

        return (
            <div className="editar-page">
                <div className="editar-container">
                    <Link to="/">
                        <i className="bi bi-arrow-left "></i>
                    </Link>
                    <h2>Editar Usuario</h2>
                    <form className="editar-form" onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <div className="input-wrapper">
                                <i className="bi bi-person icon"></i>
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
                                <i className="bi bi-person icon"></i>
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
                                <i className="bi bi-envelope-at icon"></i>
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
                                <i className="bi bi-telephone icon"></i>
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
