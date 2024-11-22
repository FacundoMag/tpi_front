import { Component } from 'react';
import axios from 'axios';
import Header from '../comun/header/Header';
import VisualizacionDeCasas from '../comun/visualizaciondecasas/VisualizacionDeCasas';
import Footer from "../comun/Footer";

export default class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            casas: [],
        };
    }

    // Verifica si el usuario tiene la sesión iniciada, sino, lo mandara a /iniciar-sesion.
    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) {
           this.extraerFavoritos(token); 
        } else {
            window.location.href = "/iniciar-sesion";
        } 
    }

    // Extrae las casas favoritas del usuario.
    extraerFavoritos(token) {
        const url = "http://localhost:4001/api/user/favoritos";

        const config = {
            headers: {
                authorization: token,
            },
        };

        axios.get(url, config)
            .then((response) => {
                this.setState({ casas: response.data.favoritos });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <>
                <Header
                    isAuthenticated={true}  // Pasará el estado de autenticación
                    onLogout={this.props.onLogout}
                />

                <VisualizacionDeCasas
                    token = {this.state.token}  
                    titulo = "Acá están tus propiedades favoritas"  
                    casas = {this.state.casas}
                    favoritos = {this.state.casas}
                    mostrarCorazon = {true}  
                />
            </>
        );
    }
}
