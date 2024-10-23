import { Component } from "react";
import estrellaLlena from "../../assets/estrellaLlena.png";
import Reseña from "./reseña/Reseña";

export default class CajaDeReseñas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        console.log(this.props.reseñas);
        
    }

    render() {
        return(
            <div className="CajaReseñas">
                <h1 
                    className="Manrope" 
                    style={{float: "left"}}
                >
                    Reseñas: {this.props.nota} 
                    <img 
                        src = { estrellaLlena} 
                        alt = "ERROR" 
                        style = { { height: "20px", margin: "0 0 2.5px 2.5px" } } 
                    />
                </h1>

                <div className="VisualizacionCasas">
                    {this.props.reseñas && this.props.reseñas.length > 0 ? (
                        this.props.reseñas.map((cont, index) => (
                            <Reseña
                                key = { cont.id }
                                nombre = { cont.nombre }
                                comentario = { cont.comentario }
                                calificacion = { cont.calificacion }
                            />
                        ))
                    ) : (
                        <h2>Ahora mismo no hay reseñas disponibles. Por favor agregue una.</h2>
                    )}
                </div>

            </div>
        )
    }
}