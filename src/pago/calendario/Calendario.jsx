import React, { Component } from "react";
import "./Calendario.css";

export default class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaInicio: null,
            fechaFin: null,
            mes: new Date().getMonth(),
            año: new Date().getFullYear(),
        };
    }

    seleccionarFecha = (dia) => {
        const { fechaInicio, fechaFin } = this.state;

        if (fechaInicio === null || (fechaInicio !== null && fechaFin !== null)) {
            this.setState({ fechaInicio: dia, fechaFin: null });
        } else if (fechaInicio !== null && fechaFin === null) {
            if (dia >= fechaInicio) {
                this.setState({ fechaFin: dia });
            } else {
                this.setState({ fechaInicio: dia });
            }
        }
    };

    calcularDiasSeleccionados = () => {
        const { fechaInicio, fechaFin } = this.state;
        return fechaInicio !== null && fechaFin !== null ? fechaFin - fechaInicio + 1 : 0;
    };

    avanzarMes = () => {
        this.setState((prevState) => {
            let nuevoMes = prevState.mes + 1;
            let nuevoAño = prevState.año;

            if (nuevoMes > 11) {
                nuevoMes = 0;
                nuevoAño += 1;
            }

            return { mes: nuevoMes, año: nuevoAño };
        });
    };

    retrocederMes = () => {
        this.setState((prevState) => {
            let nuevoMes = prevState.mes - 1;
            let nuevoAño = prevState.año;

            if (nuevoMes < 0) {
                nuevoMes = 11;
                nuevoAño -= 1;
            }

            return { mes: nuevoMes, año: nuevoAño };
        });
    };

    generarDiasDelMes = () => {
        const { mes, año } = this.state;
        const fecha = new Date(año, mes + 1, 0);
        const diasEnMes = fecha.getDate();
        return Array.from({ length: diasEnMes }, (_, i) => i + 1);
    };

    obtenerFechaFormateada = (dia) => {
        const { mes, año } = this.state;
        const mesFormateado = (mes + 1).toString().padStart(2, "0");
        const diaFormateado = dia.toString().padStart(2, "0");
        return `${diaFormateado}/${mesFormateado}/${año}`;
    };

    render() {
        const { fechaInicio, fechaFin, mes, año } = this.state;
        const { total, onReservar, precio } = this.props;
        const dias = this.generarDiasDelMes();

        const diasSeleccionados = this.calcularDiasSeleccionados();
        const totalReservado = diasSeleccionados * precio;

        return (
            <div className="CalendarioContainer">
                <div className="Calendario">
                    <h3>¿Cuántos días va a estar?</h3>
                    <div className="mesNavegacion">
                        <button onClick={this.retrocederMes}>⟨</button>
                        <span>{`${new Date(año, mes).toLocaleString("es-ES", { month: "long" })} de ${año}`}</span>
                        <button onClick={this.avanzarMes}>⟩</button>
                    </div>
                    <div className="calendarioGrid">
                        {dias.map((dia) => (
                            <button
                                key={dia}
                                className={`dia ${
                                    fechaInicio !== null &&
                                    fechaFin !== null &&
                                    dia >= fechaInicio &&
                                    dia <= fechaFin
                                        ? "seleccionado"
                                        : ""
                                }`}
                                onClick={() => this.seleccionarFecha(dia)}
                            >
                                {dia}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="totalReservar">
                    <div className="total">
                        Total: ${totalReservado}
                    </div>
                    <button className="botonReservar" onClick={onReservar}>
                        Reservar
                    </button>
                </div>
            </div>
        );
    }
}
