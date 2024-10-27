import { Component } from "react";
import HeaderConLogin from "../comun/headerConLogin/HeaderConLogin";
import DatosTarjeta from "./datosTarjeta/DatosTarjeta";
import Calendario from "./calendario/Calendario";
import Footer from "../comun/Footer";
import { Link } from "wouter";
import "./pago.css";

export default class Pago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: false
        };
        this.handleReservar = this.handleReservar.bind(this);
    }

    handleReservar() {
        const inputs = document.querySelectorAll("input");
        let isEmpty = false;
        
        inputs.forEach((input) => {
            if (input.value.trim() === "") {
                isEmpty = true;
            }
        });

        if (!isEmpty) {
            this.setState({ isValid: true });
        } else {
            alert("Todos los campos deben estar completos.");
        }
    }

    render() {
        return (
            <>
                <HeaderConLogin />
                <div className="contenedorPago">
                    <div className="contenedorTarjeta">
                        <DatosTarjeta />
                    </div>
                    <div className="contenedorCalendario">
                        <Calendario price={100} />
                    </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    {this.state.isValid ? (
                        <Link href="/ver-casa/pago/pago-realizado">
                            <button className="botonReservar">Reservar</button>
                        </Link>
                    ) : (
                        <button className="botonReservar" onClick={this.handleReservar}>Reservar</button>
                    )}
                </div>
                <Footer />
            </>
        );
    }
}
