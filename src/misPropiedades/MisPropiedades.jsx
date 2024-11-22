import { Component } from 'react';
import axios from 'axios';
import Header from '../comun/header/Header';
import VisualizacionDeCasas from './visualizaciondecasas/VisualizacionDeCasas';
import Footer from '../comun/Footer';

export default class MisPropiedades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            casas: [],
        };
    }

    // Verifica si el usuario tiene sesión iniciada para activar las funciones, porque sino, lo manda a /iniciar-sesion.
    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.setState({ token });
            this.extraerMisPropiedades(token);
        } else {
            window.location.href = "/iniciar-sesion";
        }
    }

    // Extrae las propiedades que le pertenecen al usuario.
    extraerMisPropiedades(token) {
        const url = "http://localhost:4001/api/user/mis_propiedades";

        const config = {
            headers: {
                authorization: token
            }
        }

        axios.get(url, config)
            .then((response) => {
                const { result } = response.data;
                if (Array.isArray(result)) {
                    this.setState({ casas: result });
                } else {
                    console.warn("Formato de respuesta inesperado:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error al obtener propiedades:", error);
            });
    }

    render() {
        const { token, casas } = this.state;

        return (
            <>
                <Header
                    isAuthenticated={!!token}
                    onLogout={this.handleLogout}
                />

                <VisualizacionDeCasas
                    token={token}
                    titulo="Estas son todas las propiedades que registraste en la página"
                    casas={casas}
                    extraerMisPropiedades = {(token) => this.extraerMisPropiedades(token)}
                />
            </>
        );
    }
}
