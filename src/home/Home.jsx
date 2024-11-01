import { Component } from 'react';
import HeaderConLogin from '../comun/headerConLogin/HeaderConLogin'
import HeaderSinLogin from '../comun/HeaderSinLogin';
import Buscador from './buscador/Buscador';
import VisualizacionDeCasas from "../comun/visualizaciondecasas/VisualizacionDeCasas"
import Footer from "../comun/Footer"

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            header: false,
            casas: [],
        }
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
                    titulo = "Todas las propiedades"
                    dueño = {false}
                    casas = {this.state.casas}
                />

                <Footer />
            </>
        )
    }
}