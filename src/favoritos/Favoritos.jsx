import { Component } from 'react';
import Header from '../comun/header/Header';
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
                <Header
                    mostrarHeader = {true}
                ></Header>

                <VisualizacionDeCasas
                    titulo="Tus propiedades favoritas"
                />

                <Footer />
            </>
        )
    }
}