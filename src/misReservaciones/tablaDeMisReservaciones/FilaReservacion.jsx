import { Component } from "react";
import axios from "axios";
import { Link } from "wouter";

export default class FilaReservacion extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const rutaCodificada = `/ver-casa/${this.props.id_casa}`

        return(
            <tr>
                <th><Link to = {rutaCodificada}>{ this.props.direccion }</Link></th>
                <th>{this.props.fecha_inicio.slice(0, 10)}</th>
                <th>{this.props.fecha_final.slice(0, 10)}</th>
                <th>{this.props.fecha_reserva.slice(0, 10)}</th>
                <th>{this.props.monto_total}</th>
            </tr>
        )
    }
}