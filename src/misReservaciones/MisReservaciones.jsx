import { Component } from "react";
import axios from "axios";
import Header from "../comun/header/Header";
import TablaDeReservaciones from "./tablaDeReservaciones/TablaDeReservaciones";
import Footer from "../comun/Footer";
import PantallaDeCarga from "../comun/pantallaDeCarga/PantallaDeCarga"; 

export default class MisReservaciones extends Component {
    constructor(props){
        super(props);
        this.state = {
            reservaciones: [],
        }
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.extraerReservaciones(token);
        } 
    }

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

    render() {
        return(
            <> 
                <Header
                    isAuthenticated={true}  // Pasará el estado de autenticación
                    onLogout={this.props.onLogout}
                />

                <TablaDeReservaciones
                    token = {this.state.token}  
                    titulo = "Acá estan la reservaciones que hiciste en la página"  
                    reservaciones = {this.state.reservaciones}
                />
            </>
        )
    }
}