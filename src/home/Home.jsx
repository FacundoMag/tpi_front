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
                console.log(this.state.casas);               
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return(
            <>
                {/* {this.state.header ? (
                    <HeaderConLogin />
                ) : (
                    <HeaderSinLogin />   
                )} */}

                <Header
                    mostrarHeader = {this.state.mostrarHeader}
                ></Header>

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