import { Component } from "react";
import axios from "axios";
import Header from '../comun/header/Header';
import Casa from "./casa/Casa";
import CajaDeReseñas from "./reseñas/CajaDeReseñas";
import Footer from "../comun/Footer";
import "./VerCasa.css";

export default class VerCasa extends Component {
    constructor(props){
        super(props);
        this.state = {
            mostrarHeader: false,
            id: 1, 
            casa: null,
            promedio: 0,
            reseñas: [],
        }
    }

    componentDidMount() {
        this.extraerInfoCasa(this.props.id_casa)
    }

    extraerInfoCasa(id) {
        const url = "http://localhost:4001/api/propiedades/propiedad";
        const config = {
            params: {
                id
            }
        };
        axios.get(url, config)
            .then((response) => {              
                this.setState({ casa: response.data });
                this.calcularPromedioCasa(response.data.reseñas)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    calcularPromedioCasa(reseñas) {
        let total = 0

        for (let i = 0; i < reseñas.length; i++) {
            total = total+reseñas[i].valoracion;
        }

        const promedio = total / reseñas.length
        this.setState({ promedio });
    }

    render(){
        return(
            <>
                <Header
                    mostrarHeader = {this.state.mostrarHeader}
                ></Header>

                {this.state.casa !== null  &&
                    <>
                        <Casa
                            telefono = {this.state.casa.propiedad[0].telefono_propietario}
                            direccion = {this.state.casa.propiedad[0].direccion}
                            ciudad = {this.state.casa.propiedad[0].ciudades}
                            precio = {this.state.casa.propiedad[0].precio_renta} 
                            habitaciones = {this.state.casa.propiedad[0].num_habitaciones}
                            baños = {this.state.casa.propiedad[0].num_banos}
                            imagenes = {this.state.casa.urls}
                            nota = {this.state.promedio}
                            tamaño = {this.state.casa.propiedad[0].tamano_m2}
                            descripcion = {this.state.casa.propiedad[0].descripcion}
                            servicios = {this.state.casa.servicios}
                            botonCorazon = {true}
                        />

                        <CajaDeReseñas 
                            nota = {this.state.promedio}
                            reseñas = {this.state.casa.reseñas}
                            inputComentario = {true}
                        />
                    </>   
                }

                <Footer />

            </>
        )
    }
}