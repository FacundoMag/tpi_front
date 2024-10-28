import React, { Component } from "react";
import "./Calendario.css";

export default class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaInicio: null,
            fechaFin: null,
        };
    }

    seleccionarFecha = (index) => {
        const { fechaInicio, fechaFin } = this.state;

        if (fechaInicio === null || (fechaInicio !== null && fechaFin !== null)) {
            this.setState({ fechaInicio: index, fechaFin: null });
        } else if (fechaInicio !== null && fechaFin === null) {
            if (index >= fechaInicio) {
                this.setState({ fechaFin: index });
            } else {
                this.setState({ fechaInicio: index });
            }
        }
    };

    calcularDiasSeleccionados = () => {
        const { fechaInicio, fechaFin } = this.state;
        return fechaInicio !== null && fechaFin !== null ? fechaFin - fechaInicio + 1 : 0;
    };

    render() {
        const { fechaInicio, fechaFin } = this.state;
        const { total, onReservar } = this.props;
        const dias = Array.from({ length: 30 }, (_, i) => i + 1);

        return (
            <div className="CalendarioContainer">
                <div className="Calendario">
                    <h3>¿Cuántos días va a estar?</h3>
                    <div className="calendarioGrid">
                        {dias.map((dia, index) => (
                            <button
                                key={index}
                                className={`dia ${
                                    fechaInicio !== null && fechaFin !== null && index >= fechaInicio && index <= fechaFin
                                        ? "seleccionado"
                                        : ""
                                }`}
                                onClick={() => this.seleccionarFecha(index)}
                            >
                                {dia}
                            </button>
                        ))}
                    </div>
                    
                </div>
                
                <div className="totalReservar">
                    <div className="total">
                        Total: ${total(this.calcularDiasSeleccionados())}
                    </div>
                    <button className="botonReservar" onClick={onReservar}>
                        Reservar
                    </button>
                </div>
            </div>
        );
    }
}
