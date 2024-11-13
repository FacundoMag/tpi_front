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
            propietario_id: null,
            fechaInicio: "",
            fechaFin: "",
            total: 0,
        };
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.setState({ mostrarHeader: true });
        }
        this.extraerInfoCasa(this.props.id_casa);
    }

    extraerInfoCasa(id) {
        const url = "http://localhost:4001/api/propiedades/propiedad";
        const config = {
            params: { id }
        };
        axios.get(url, config)
            .then((response) => {              
                this.setState({ 
                    precio: response.data.propiedad[0].precio_renta, 
                    propietario_id: response.data.propiedad[0].propietario_id 
                });
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
            return input && input.value.trim() !== "";
        });
    };

    handleReservar = () => {
        const { fechaInicio, fechaFin } = this.calendario.state;
        const datosTarjetaCompletos = this.validarDatosTarjeta();

        if (fechaInicio !== null && fechaFin !== null && datosTarjetaCompletos) {
            const total = this.calcularTotal(this.calendario.calcularDiasSeleccionados());
            this.setState({ 
                validacionCompleta: true,
                fechaInicio: `${fechaInicio.getDate().toString().padStart(2, '0')}-${(fechaInicio.getMonth() + 1).toString().padStart(2, '0')}-${fechaInicio.getFullYear()}`,
                fechaFin: `${fechaFin.getDate().toString().padStart(2, '0')}-${(fechaFin.getMonth() + 1).toString().padStart(2, '0')}-${fechaFin.getFullYear()}`,
                total 
            }, () => {
                console.log("Fecha de Inicio:", this.state.fechaInicio);
                console.log("Fecha de Fin:", this.state.fechaFin);
                console.log("Total:", this.state.total);

                // window.location.href = "/pago-realizado";
                const url = "http://localhost:4001/api/reservacion";

                const config = {
                    
                }

            });
        } else {
            Notificacion.show("Por favor, complete todos los campos y seleccione un rango de fechas.", "error");
        }
    };

    calcularTotal = (dias) => dias * this.state.precio;

    render() {
        return (
            <>
                {this.state.precio !== null ? (
                    <>
                        <Header
                            isAuthenticated={this.state.mostrarHeader}
                            onLogout={this.props.onLogout}
                        />

                        <div className="contenedorPago">
                            <div className="contenedorTarjeta">
                                <DatosTarjeta />
                            </div>
                            <div className="contenedorCalendario">
                                <Calendario
                                    ref={(calendario) => (this.calendario = calendario)}
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
