import { Component } from 'react';
import axios from 'axios';
import HeaderConLogin from '../comun/headerConLogin/HeaderConLogin'
import HeaderSinLogin from '../comun/HeaderSinLogin';
import Buscador from './buscador/Buscador';
import VisualizacionDeCasas from "../comun/visualizaciondecasas/VisualizacionDeCasas"
import Footer from "../comun/Footer"

export default class Home extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            casas: [],  
        };  
    }  

    componentDidMount() {
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
                {this.state.header ? (
                    <HeaderConLogin />
                ) : (
                    <HeaderSinLogin />   
                )}

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