import { Component } from 'react';
import HeaderConLogin from '../comun/headerConLogin/HeaderConLogin';
import HeaderSinLogin from '../comun/HeaderSinLogin';
import VisualizacionDeCasas from '../comun/visualizaciondecasas/VisualizacionDeCasas';
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

                <VisualizacionDeCasas
                
                >Tus propiedades favoritas</VisualizacionDeCasas>

                <Footer />
            </>
        )
    }
}