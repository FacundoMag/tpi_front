import { Component } from "react";
import estrellaLlena from "../../assets/estrellaLlena.png";
import Reseña from "./reseña/Reseña";
import ComentarioInput from "./comentarioInput/ComentarioInput";

export default class CajaDeReseñas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
         
    }

    render() {
        return(
            <div className="CajaReseñas">
                <h1 
                    className="Manrope" 
                    style={{float: "left"}}
                >
                    Reseñas: {Math.round(this.props.nota)} 
                    <img 
                        src = { estrellaLlena} 
                        alt = "ERROR" 
                        style = { { height: "20px", margin: "0 0 2.5px 2.5px" } } 
                    />
                </h1>

                {this.props.inputComentario && (
                    <ComentarioInput 
                        id_usuario = {this.props.id_usuario}
                    />
                )}

                <div className="VisualizacionReseñas">
                    {this.props.reseñas && this.props.reseñas.length > 0 ? (
                        this.props.reseñas.map((cont, index) => (
                            <Reseña
                                key = { cont.id }
                                nombre = { cont.usuarios }
                                comentario = { cont.comentario }
                                calificacion = { cont.valoracion }
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