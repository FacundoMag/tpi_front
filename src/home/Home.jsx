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
        this.extraerCasas();
        const token = sessionStorage.getItem('token');

    }

    extraerCasas() {
        const url = "http://localhost:4001/api/propiedades";

        axios.get(url)
            .then((response) => {
                this.setState({ casas: response.data.propiedadesConimg });
                console.log(response.data.propiedadesConimg);
                               
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

        console.log(config);
        
        axios.get(url, config)
            .then((response) => { 
                console.log({response});
                             
                this.setState({ casas: response.data.propiedadesConimg }); 
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return(
            <>
                <Header
                    mostrarHeader = {this.state.mostrarHeader}
                ></Header>

                <Buscador 
                    buscador = {() => this.buscador(1,  1)}
                />

                <VisualizacionDeCasas  
                    titulo="Todas las propiedades"  
                    casas={this.state.casas}  
                />  

                <Footer />  
            </>  
        );  
    }  
}