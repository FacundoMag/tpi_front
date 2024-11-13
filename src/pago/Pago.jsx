import React, { Component } from "react";
import axios from "axios";
import Header from '../comun/header/Header';
import DatosTarjeta from "./datosTarjeta/DatosTarjeta";
import Calendario from "./calendario/Calendario";
import Footer from "../comun/Footer";
import PantallaDeCarga from "../comun/pantallaDeCarga/PantallaDeCarga";
import Notificacion from "../comun/Notificacion";
import "./Pago.css";

export default class Pago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarHeader: false,
            validacionCompleta: false,
            precio: null,
        };
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.setState({ mostrarHeader: true });
        }
        this.extraerInfoCasa(this.props.id_casa)
    }

    extraerInfoCasa(id) {
        const url = "http://localhost:4001/api/propiedades/propiedad";
        const config = {
            params: {
                id
            }
        };
        axios.get(url, config)
            .then((response) => {              
                this.setState({ precio: response.data.propiedad[0].precio_renta });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    validarDatosTarjeta = () => {
        const camposTarjeta = [
            "tipoTarjeta",
            "nombreTarjeta",
            "numeroTarjeta",
            "fechaVencimiento",
            "cvc",
            "nombre",
            "apellidos",
            "localidad",
            "codigoPostal",
            "direccionFacturacion",
            "pais",
            "telefono",
        ];

        return camposTarjeta.every((campo) => {
            const input = document.getElementById(campo);
            return input && input.value.trim() !== ""; // Verifica que el campo existe y no esté vacío
        });
    };

    handleReservar = () => {
        const fechaInicio = this.calendario.state.fechaInicio;
        const fechaFin = this.calendario.state.fechaFin;
        const datosTarjetaCompletos = this.validarDatosTarjeta();

        if (fechaInicio !== null && fechaFin !== null && datosTarjetaCompletos) {
            this.setState({ validacionCompleta: true }, () => {
                window.location.href = "/pago-realizado";
            });
        } else {
            Notificacion.show("Por favor, complete todos los campos y seleccione un rango de fechas.", "error");
        }
    };

    calcularTotal = (dias) => dias * 100; // Ejemplo de cálculo del total (100 por día)

    render() {
        return (
            <>
                {this.state.precio !== null ? (
                    <>
                        <Header
                            isAuthenticated={this.state.mostrarHeader}  // Pasara el estado de autenticación
                            onLogout={this.props.onLogout} // Llamara a la función de logout del padre
                        />

                        <div className="contenedorPago">
                            <div className="contenedorTarjeta">
                                <DatosTarjeta />
                            </div>
                            <div className="contenedorCalendario">
                                <Calendario
                                    ref={(calendario) => (this.calendario = calendario)}
                                    total={this.calcularTotal}
                                    onReservar={this.handleReservar}
                                    precio={this.state.precio}
                                />
                            </div>
                        </div>

                        <Footer />
                    </>
                ) : (
                    <PantallaDeCarga />
                )}
            </>
        );
    }
}
