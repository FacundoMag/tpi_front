import React, { Component } from "react";
import Header from '../comun/header/Header';
import DatosTarjeta from "./datosTarjeta/DatosTarjeta";
import Calendario from "./calendario/Calendario";
import Footer from "../comun/Footer";
import "./Pago.css";

export default class Pago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validacionCompleta: false,

            precio: 500,
        };
    }

    componentDidMount(){
        
        //JSON.parse(decodeURI(this.props.id))
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
                window.location.href = "/ver-casa/pago/pago-realizado";
            });
        } else {
            alert("Por favor, complete todos los campos y seleccione un rango de fechas.");
        }
    };

    calcularTotal = (dias) => dias * 100; // Ejemplo de cálculo del total (100 por día)

    render() {
        return (
            <>
                <Header
                    mostrarHeader = {true}
                ></Header>
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
        );
    }
}
