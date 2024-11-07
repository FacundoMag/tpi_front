import { Component } from "react";
import corazonRojo from "../../../assets/corazonRojo.png";
import corazonBlanco from "../../../assets/corazonBlanco.png";
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
        
    }

    botonCorazon() {
        if (this.state.corazon === corazonBlanco) {
            this.setState({
                corazon: corazonRojo
            });
        } else {
            this.setState({
                corazon: corazonBlanco
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
