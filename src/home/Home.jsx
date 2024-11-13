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
                this.setState({ casas: response.data });
                               
            })
            .catch((error) => {
                console.log(error);
            });
    }

    buscador(ciudad_id, tipo_id) {
        console.log(ciudad_id, tipo_id);
        
        this.setState({ casas: [] })

        const url = "http://localhost:4001/api/propiedades/buscador";
        const config = {
            params: {
                ciudad_id,
                tipo_id
            }
        };
        
        axios.get(url, config)
            .then((response) => { 
                this.setState({ casas: response.data }); 
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

                <Buscador 
                    buscador={(ciudad_id, tipo_id) => this.buscador(ciudad_id, tipo_id)}
                />

                <VisualizacionDeCasas  
                    titulo = "Todas las propiedades"  
                    casas = {this.state.casas}
                    mostrarCorazon = {this.state.mostrarHeader}  
                />  

                <Footer />  
            </>  
        );  
    }  
}
