// Home.js  
import { Component } from 'react';  
import axios from 'axios';  
import HeaderConLogin from '../comun/headerConLogin/HeaderConLogin';  
import HeaderSinLogin from '../comun/HeaderSinLogin';  
import Buscador from './buscador/Buscador';  
import VisualizacionDeCasas from "../comun/visualizaciondecasas/VisualizacionDeCasas";  
import Footer from "../comun/Footer";  

export default class Home extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            casas: [],  
        };  
    }  

    // Este método se ejecuta cuando el componente se monta  
    componentDidMount() {  
        axios.get('http://localhost:4001/api/casas')  
            .then(response => {  
                this.setState({ casas: response.data });  
            })  
            .catch(error => {  
                console.error('Error al obtener las casas:', error);  
            });  
    }  

    render() {  
        const { isAuthenticated, onLogout } = this.props;  

        return (  
            <>  
                {isAuthenticated ? (  
                    <HeaderConLogin onLogout={onLogout} /> // Pasamos onLogout props  
                ) : (  
                    <HeaderSinLogin />  
                )}  

                <Buscador />  

                <VisualizacionDeCasas  
                    titulo="Todas las propiedades"  
                    casas={this.state.casas}  
                />  

                <Footer />  
            </>  
        );  
    }  
}