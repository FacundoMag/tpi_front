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
        }
    }

    render() {
        return(
            <div className="Publicacion">
                <Link to="/ver-casa">
                    <img src={this.props.imagen} alt="ERROR" className="Imagen" />
                </Link>
                <div className="Precio">
                    <h3 style={{color: "#E93740"}}>${this.props.precio}</h3>
                    <h3>/ día</h3>
                </div>
                <h3 style={{marginLeft: "20px"}}>{this.props.direccion}</h3>
                <div className="DatosExtra">
                    <h4>{this.props.habitaciones} Habitaciones</h4>
                    <h4>|</h4>
                    <h4>{this.props.baños} Baños</h4>
                    <h4>|</h4>
                    <h4>{this.props.tipo}</h4>
                </div>
                <img 
                    src={this.state.corazon} 
                    alt="ERROR" 
                    className="ImagenCorazon"
                />
            </div>
        )
    }
}