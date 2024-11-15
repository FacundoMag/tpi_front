import { Component } from "react";
import axios from "axios";
import { Link } from "wouter";

export default class FilaReservacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            direccion: ''
        }
    }

    componentDidMount(){
        this.extraerDireccion();
    }

    extraerDireccion() {
        const url = "http://localhost:4001/api/propiedades/propiedad";

        const config = {
            params: {
                id: this.props.id_casa
            }
        };

        axios.get(url, config)
            .then((response) => {
                this.setState({ direccion: response.data.propiedad[0].direccion })
                console.log(this.state.direccion);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const rutaCodificada = `/ver-casa/${this.props.id_casa}`

        return(
            <tr>
                <th><Link to = {rutaCodificada}>{ this.state.direccion }</Link></th>
                <th>{this.props.fecha_inicio.slice(0, 10)}</th>
                <th>{this.props.fecha_final.slice(0, 10)}</th>
                <th>{this.props.fecha_reserva.slice(0, 10)}</th>
                <th>{this.props.monto_total}</th>
            </tr>
        )
    }
}