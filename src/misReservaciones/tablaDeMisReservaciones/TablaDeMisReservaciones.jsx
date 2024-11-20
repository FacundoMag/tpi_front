import { Component } from "react";
import FilaReservacion from "./FilaReservacion";
import "./TablaDeMisReservaciones.css"

export default class TablaDeMisReservaciones extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="Contenedor">
                <h1 className="Titulo">{this.props.titulo}</h1>

                {this.props.reservaciones.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Dirección</th>
                                <th>Fecha de incio</th>
                                <th>Fecha de fin</th>
                                <th>Fecha de la reservacion</th>
                                <th>Monto total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.reservaciones.map((cont, index) => 
                                <FilaReservacion 
                                    key = {index}
                                    id_casa = {cont.propiedad_id}
                                    fecha_inicio = {cont.fecha_inicio}
                                    fecha_final = {cont.fecha_fin}
                                    fecha_reserva = {cont.fecha_reserva}
                                    monto_total = {cont.monto_total}
                                />
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div className="CasasNoDisponibles">
                        <h2>Ahora mismo no tenés reservaciones hechas.</h2>
                    </div>
                )}
            </div>
        )
    }
}