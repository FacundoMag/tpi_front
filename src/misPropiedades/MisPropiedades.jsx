import { Component } from 'react';
import axios from 'axios';
import Header from '../comun/header/Header';
import VisualizacionDeCasas from './visualizaciondecasas/VisualizacionDeCasas';
import Footer from "../comun/Footer"

export default class MisPropiedades extends Component {
    constructor(props){
        super(props);
        this.state = {
            casas: [],
        }
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.extraerMisPropiedades(token);
        } 
    }

    extraerMisPropiedades(token) {
        const url = "http://localhost:4001/api/user/mis_propiedades"

        const config = {
            headers: {
                authorization: token
            }
        }

        axios.get(url, config)
            .then((response) => {              
                this.setState({ casas: response.data.result });
                console.log(this.state.casas);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return(
            <>
                <Header
                    isAuthenticated={true}
                    onLogout={this.handleLogout}
                ></Header>

                <VisualizacionDeCasas
                    titulo = "Estas son todas la propiedades que registraste en la página"
                    casas = {this.state.casas}
                />

                <Footer />
            </>
        )
    }
}