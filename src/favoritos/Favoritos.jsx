import { Component } from 'react';
import HeaderConLogin from '../comun/headerConLogin/HeaderConLogin';
import VisualizacionDeCasas from '../comun/visualizaciondecasas/VisualizacionDeCasas';
import Footer from "../comun/Footer"

export default class Favoritos extends Component {
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
                    titulo="Tus propiedades favoritas"
                />

                <Footer />
            </>
        )
    }
}