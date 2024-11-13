import { Component } from 'react';
import Header from '../comun/header/Header';
import VisualizacionDeCasas from './visualizaciondecasas/VisualizacionDeCasas';
import Footer from "../comun/Footer"

export default class MisPropiedades extends Component {
    constructor(props){
        super(props);
        this.state = {
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
                    titulo = "Estas son todas la propiedades que registraste en la página"
                />

                <Footer />
            </>
        )
    }
}