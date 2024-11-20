import { Component } from "react";
import axios from "axios";
import Header from '../comun/header/Header';
import Casa from "./casa/Casa";
import CajaDeReseñas from "./reseñas/CajaDeReseñas";
import Footer from "../comun/Footer";
import PantallaDeCarga from "../comun/pantallaDeCarga/PantallaDeCarga";
import "./VerCasa.css";

export default class VerCasa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            mostrarHeader: false, 
            casa: null,
            favoritos: null,
            promedio: 0,
            reseñas: [],
        };
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.setState({ mostrarHeader: true, token });
            this.misFavoritos(token);
        }

        this.extraerInfoCasa(this.props.id_casa);          
    }

    misFavoritos(token) {
        const url = "http://localhost:4001/api/user/favoritos";

        const config = {
            headers: {
                authorization: token,
            },
        };

        axios.get(url, config)
            .then((response) => {
                this.setState({ favoritos: response.data.favoritos });
                console.log(response.data.favoritos);
                
            })
            .catch((error) => {
                console.error(error);
            });
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
        let total = 0;

        for (let i = 0; i < reseñas.length; i++) {
            total += reseñas[i].valoracion;
        }

        const promedio = total / reseñas.length;
        this.setState({ promedio });
    }

    render() {
        return (
            <>
                {this.state.casa !== null ? (
                    <>
                        <Header
                            isAuthenticated={this.state.mostrarHeader}  // Pasará el estado de autenticación
                            onLogout={this.props.onLogout}
                        />

                        <Casa
                            token = {this.state.token}
                            id_casa = {this.props.id_casa}
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
                            botonCorazon = {this.state.mostrarHeader}
                            mostrarRuta = {this.state.mostrarHeader}
                            favoritos = {this.state.favoritos}
                        />

                        <CajaDeReseñas
                            token = {this.state.token}
                            id_casa={this.props.id_casa} 
                            nota = {this.state.promedio}
                            reseñas = {this.state.casa.reseñas}
                            inputComentario = {this.state.mostrarHeader}
                            extraerInfoCasa={(id) => this.extraerInfoCasa(id)}
                        />

                        <Footer />
                    </>   
                ) : (
                    <PantallaDeCarga />
                )}
            </>
        );
    }
}
