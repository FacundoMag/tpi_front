import { Component } from "react";
import axios from "axios";
import Header from "../comun/header/Header";
import TablaDeMisReservaciones from "./tablaDeMisReservaciones/TablaDeMisReservaciones";
import TablaReservacionesMisCasas from "./tablaReservacionesMisCasas/TablaReservacionesMisCasas";
import Footer from "../comun/Footer";
import PantallaDeCarga from "../comun/pantallaDeCarga/PantallaDeCarga"; 

export default class MisReservaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoReservacion: "mis_reservaciones",
            reservaciones: [],
            reservacionesMisCasas: [],
        };
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token");
        if (token) {
            this.extraerReservaciones(token);
            this.extraerReservacionesMisCasas(token);
        } else {
            window.location.href = "/iniciar-sesion";
        }
    }

    // Esta función va a extraer las reservas que hiciste en otras propiedades de la página.
    extraerReservaciones(token) {
        const url = "http://localhost:4001/api/reservacion/mis_reservaciones";

        const config = {
            headers: {
                authorization: token,
            },
        };

        axios.get(url, config)
            .then((response) => {
                this.setState({ reservaciones: response.data.results });
                console.log(this.state.reservaciones);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Esta función va a extraer las reservaciones que hayan hecho otros usuarios a tus propiedades.
    extraerReservacionesMisCasas(token) {
        const url = "http://localhost:4001/api/reservacion/reservaciones_propietario";

        const config = {
            headers: {
                authorization: token,
            },
        };

        axios.get(url, config)
            .then((response) => {
                this.setState({ reservacionesMisCasas: response.data.results });
                console.log(this.state.reservacionesMisCasas);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Esta función cambia el valor del select.
    manejarCambio = (event) => {
        this.setState({ tipoReservacion: event.target.value });
    };

    render() {
        return (
            <> 
                <Header
                    isAuthenticated={true}  // Pasará el estado de autenticación
                    onLogout={this.props.onLogout}
                />
                
                <div style={{ margin: "20px 0", textAlign: "center" }}>
                    <label htmlFor="tipoReservacion" style={{ marginRight: "10px" }}>
                        Selecciona una opción:
                    </label>
                    <select
                        id="tipoReservacion"
                        value={this.state.tipoReservacion}
                        onChange={this.manejarCambio}
                        style={{ padding: "5px", fontSize: "16px" }}
                    >
                        <option value="mis_reservaciones">Mis reservaciones</option>
                        <option value="reservaciones_de_mis_casas">Reservaciones de mis casas</option>
                    </select>
                </div>

                {this.state.tipoReservacion === "mis_reservaciones" ? (
                    <TablaDeMisReservaciones
                        token = {this.state.token}
                        titulo = "Acá están las reservaciones que hiciste en la página"
                        reservaciones = {this.state.reservaciones}
                    />
                ) : (
                    <TablaReservacionesMisCasas
                        token = {this.state.token}
                        titulo = "Reservaciones de tus casas en la página"
                        reservaciones = {this.state.reservacionesMisCasas}
                    />
                )}
            </>
        );
    }
}
