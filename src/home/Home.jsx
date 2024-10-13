import { Component } from 'react';
import HeaderSinLogin from '../comun/HeaderSinLogin';
import Buscador from './buscador/Buscador';
import VisualizacionDeCasas from './visualizaciondecasas/VisualizacionDeCasas'
import Footer from "../comun/Footer"

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            casas: [],
        }
    }

    render() {
        return(
            <>
                <HeaderSinLogin />

                <Buscador />

                <VisualizacionDeCasas 
                    casas={this.state.casas}
                />

                <Footer />
            </>
        )
    }
}