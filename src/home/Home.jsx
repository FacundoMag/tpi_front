import { Component } from 'react';
import axios from 'axios';
import Header from '../comun/header/Header';
import Buscador from './buscador/Buscador';
import VisualizacionDeCasas from "../comun/visualizaciondecasas/VisualizacionDeCasas"
import Footer from "../comun/Footer"

export default class Home extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {
            mostrarHeader: false,  
            casas: [],  
        };  
    }  

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.setState({ mostrarHeader: true });
        }
        this.extraerCasas();
    }

    extraerCasas() {
        const url = "http://localhost:4001/api/propiedades";

        axios.get(url)
            .then((response) => {
                this.setState({ casas: response.data.propiedadesConimg });
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
                    isAuthenticated={this.state.mostrarHeader}  // Pasara el estado de autenticación
                    onLogout={this.props.onLogout} // Llamara a la función de logout del padre
                />

                <Buscador /> 

                <VisualizacionDeCasas  
                    titulo="Todas las propiedades"  
                    casas={this.state.casas}  
                />  

                <Footer />  
            </>  
        );  
    }  
}
