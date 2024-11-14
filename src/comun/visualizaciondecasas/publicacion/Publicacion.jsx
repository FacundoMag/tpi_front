import { Component } from "react";
import axios from "axios";
import corazonRojo from "../../../assets/corazonRojo.png";
import corazonBlanco from "../../../assets/corazonBlanco.png";
import Notificacion from "../../Notificacion";
import "./Publicacion.css";
import { Link } from "wouter";

export default class Publicacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            corazon: corazonBlanco,
        };
        // Enlaza el método con "this" para que funcione correctamente en el evento onClick
        this.botonCorazon = this.botonCorazon.bind(this);
    }

    componentDidMount() {
        if (this.props.mostrarCorazon) {
            this.verificarCorazon();
        }
    }

    verificarCorazon() {
        const { id_casa, favoritos } = this.props;
        
        for (let i = 0; i < favoritos.length; i++) {
            if (id_casa == favoritos[i].id) {
                this.setState({ corazon: corazonRojo })
            }
        }
    }

    botonCorazon() {
        const url = "http://localhost:4001/api/user/favoritos";

        const config = {
            headers: {
                authorization: this.props.token,
            },
            params: {
                propiedad_id: this.props.id_casa,
            },
        };

        if (this.state.corazon === corazonBlanco) {
            axios.post(url, null, config)
                .then((response) => {
                    Notificacion.show("Se ha agregado la casa a favoritos.", "success");
                    this.setState({ corazon: corazonRojo });
                    console.log(response.data);
                    
                })
                .catch((error) => {
                    console.log(error);
                });  
        } else if (this.state.corazon === corazonRojo) {
            axios.delete(url, config)
                .then((response) => {
                    Notificacion.show("Se eliminó la casa de favoritos.", "success");
                    this.setState({ corazon: corazonBlanco });
                    console.log(response.data);
                    
                })
                .catch((error) => {
                    console.log(error);
                }); 
        }
    }

    render() {
        const rutaCodificada = `/ver-casa/${this.props.id_casa}`;
        const urlImagen = `http://localhost:4001/api/imagenes/${this.props.imagen}`;

        return (
            <div className="Publicacion">
                <Link to={rutaCodificada}>
                    <img src={urlImagen} alt="ERROR" className="Imagen" />
                </Link>

                <div className="PrecioHome">
                    <h3 style={{color: "#E93740"}}>${this.props.precio}</h3>
                    <h3>/ día</h3>
                </div>

                {this.props.mostrarCorazon && (
                   <button 
                        className="BotonInvisible"
                        style={{marginRight: "35px"}}
                        onClick={this.botonCorazon}
                    >
                        <img
                            alt="ERROR" 
                            className="IconoBoton"
                            src={this.state.corazon}
                        />
                    </button> 
                )}
                   
                <h3 style={{float: "left", marginLeft: "20px"}}>{this.props.direccion}, {this.props.ciudad}</h3>

                <div className="DatosExtraHome">
                    <h4>{this.props.habitaciones} Habitaciones</h4>
                    <h4>|</h4>
                    <h4>{this.props.baños} Baños</h4>
                    <h4>|</h4>
                    <h4>{this.props.tipo}</h4>
                </div>
            </div>
        );
    }
}
