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
            token: '',
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
            this.setState({ mostrarHeader: true, token });
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
                fechaInicio: `${fechaInicio.getFullYear()}-${(fechaInicio.getMonth() + 1).toString().padStart(2, '0')}-${fechaInicio.getDate().toString().padStart(2, '0')}`,
                fechaFin: `${fechaFin.getFullYear()}-${(fechaFin.getMonth() + 1).toString().padStart(2, '0')}-${fechaFin.getDate().toString().padStart(2, '0')}`,
                total 
            }, () => {
                console.log("Fecha de Inicio:", this.state.fechaInicio);
                console.log("Fecha de Fin:", this.state.fechaFin);
                console.log("Total:", this.state.total);
                const fechaActual = new Date();
                const dia = String(fechaActual.getDate()).padStart(2, '0');
                const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
                const año = fechaActual.getFullYear();

                const fechaActualFormateada = `${año}-${mes}-${dia}`;
                
                const url = "http://localhost:4001/api/reservacion";

                const config = {
                    headers: {
                        authorization: this.state.token,
                    },
                    params: {
                        propiedad_id: this.props.id_casa,
                        propietario_id: this.state.propietario_id
                    },
                };

                const data = {
                    fecha_inicio: this.state.fechaInicio, 
                    fecha_fin: this.state.fechaFin, 
                    fecha_reserva: fechaActualFormateada, 
                    monto_total: this.state.total
                }

                axios.post(url, data, config)
                .then((response) => {
                    alert("Se agregó la reservación.")
                    console.log(response.data);
                    window.location.href = "/pago-realizado";
                })
                .catch((error) => {
                    console.log(error);
                });

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
