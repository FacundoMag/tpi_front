import { Component } from "react";
import estrellaVacia from "../../assets/estrellaVacia.png";
import estrellaLlena from "../../assets/estrellaLlena.png";
import BotonReservar from "./BotonReservar";
import corazonBlanco from "../../assets/corazonBlanco.png";
import corazonRojo from "../../assets/corazonRojo.png";
import "./Casa.css";

export default class Casa extends Component {
    constructor(props){
        super(props);
        this.state = {
            star1: estrellaLlena,
            star2: estrellaLlena,
            star3: estrellaLlena,
            star4: estrellaLlena,
            star5: estrellaLlena,

            corazon: corazonBlanco
        }
        this.botonCorazon = this.botonCorazon.bind(this);
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

    render(){
        return(
            <div className="Casa">
                <div style={{display: "flex", flexDirection: "row"}}>

                    <div style={{width: "50%"}}>
                        <img src={this.props.imagen} alt="ERROR" style={{width: "100%"}} />
                    </div>

                    <div style={{width: "50%", flexDirection: "column", marginTop: "20px", marginLeft: "20px", textAlign: "left"}}>

                        <div style={{flexDirection: "row"}}>
                            <img src={this.state.star1} alt="ERROR" style={{height: "20px"}} />
                            <img src={this.state.star2} alt="ERROR" style={{height: "20px", paddingLeft: "5px"}} />
                            <img src={this.state.star3} alt="ERROR" style={{height: "20px", paddingLeft: "5px"}} />
                            <img src={this.state.star4} alt="ERROR" style={{height: "20px", paddingLeft: "5px"}} />
                            <img src={this.state.star5} alt="ERROR" style={{height: "20px", paddingLeft: "5px"}} />
                        </div>

                        <span className="PublicSans" style={{fontSize: "x-large", fontWeight: "bold"}}>{this.props.direccion}, {this.props.ciudad}</span>
                        
                        <p style={{color: "black"}}>Tamaño: <span style={{fontWeight: "bold"}}>{this.props.tamaño}</span></p>

                        <div style={{flexDirection: "row"}}>
                            <span style={{color: "black"}}>Habitaciones: <span style={{fontWeight: "bold"}}>{this.props.habitaciones}</span></span>
                            <span style={{color: "black", marginLeft: "100px"}}>Baños: <span style={{fontWeight: "bold"}}>{this.props.baños}</span></span>
                        </div>

                        <span className="PrecioCasa">${this.props.precio}</span>

                        <div className="LineaSeccion" />

                        <BotonReservar 
                            ruta="/ver-casa/pago"
                            estilo="BotonReservar"
                        >RESERVAR</BotonReservar>
                        
                        <button 
                            className="BotonInvisible"
                            onClick={this.botonCorazon}
                            style={{marginRight: "575px", marginTop: "10px"}}
                        >
                            <img
                                alt="ERROR" 
                                style={{height: "45px"}}
                                src={this.state.corazon}
                            />
                        </button>
                        
                    </div>

                </div>
            </div>
        )
    }
}