import { Component } from 'react';
import HeaderConLogin from '../comun/headerConLogin/HeaderConLogin';
import HeaderSinLogin from '../comun/HeaderSinLogin';
import VisualizacionDeCasas from './visualizaciondecasas/VisualizacionDeCasas';
import Footer from "../comun/Footer"

export default class MisPropiedades extends Component {
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
                <HeaderConLogin />

                <VisualizacionDeCasas
                    titulo = "Estas son todas la propiedades que registraste en la página"
                />

                <Footer />
            </>
        )
    }
}