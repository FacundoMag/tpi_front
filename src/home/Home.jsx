import { Component } from 'react';
import axios from 'axios';
import Header from '../comun/header/Header';
import Buscador from './buscador/Buscador';
import VisualizacionDeCasas from "../comun/visualizaciondecasas/VisualizacionDeCasas";
import Footer from "../comun/Footer"
import Notificacion from '../comun/Notificacion';

export default class Home extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {
            token: '',
            mostrarHeader: false,  
            casas: [],
            favoritos: [],  
        };  
    }  

    componentDidMount() {
        console.log("Props en Home - usuario_id:", this.props.usuario_id); 
        const token = sessionStorage.getItem('token');
        if (token) {
            this.setState({ mostrarHeader: true, token });
            this.misFavoritos(token);
        }
        this.extraerCasas();
    }

    extraerCasas() {
        const url = "http://localhost:4001/api/propiedades";

        axios.get(url)
            .then((response) => {
                this.setState({ casas: response.data });
                               
            })
            .catch((error) => {
                console.log(error);
            });
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
            })
            .catch((error) => {
                console.error(error);
            });
    }

    buscador(ciudad_id, tipo_id) {
        console.log(ciudad_id, tipo_id);
        
        this.setState({ casas: [] })

        const url = "http://localhost:4001/api/propiedades/buscador";
        const config = {
            params: {
                ciudad_id,
                tipo_id
            }
        };
        
        axios.get(url, config)
            .then((response) => { 
                this.setState({ casas: response.data }); 
                Notificacion.show("Su busqueda se realizó correctamente", "success")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return(
            <>
                <Header
                    isAuthenticated={this.state.mostrarHeader}
                    usuario_id={this.props.usuario_id}  // Pasara el estado de autenticación
                    onLogout={this.props.onLogout} // Llamara a la función de logout del padre
                />

                <Buscador 
                    buscador={(ciudad_id, tipo_id) => this.buscador(ciudad_id, tipo_id)}
                />

                <VisualizacionDeCasas
                    token = {this.state.token}  
                    titulo = "Todas las propiedades"  
                    casas = {this.state.casas}
                    favoritos = {this.state.favoritos}
                    mostrarCorazon = {this.state.mostrarHeader}  
                />  

                <Footer />  
            </>  
        );  
    }  
}
