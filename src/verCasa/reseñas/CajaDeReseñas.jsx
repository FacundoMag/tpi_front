import { Component } from "react";
import estrellaLlena from "../../assets/estrellaLlena.png";
import Reseña from "./reseña/Reseña";
import ComentarioInput from "./comentarioInput/ComentarioInput";

export default class CajaDeReseñas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nota: 0
        };
    }

    componentDidMount() {  
        if (!isNaN(this.props.nota)) {
            this.setState({ nota: this.props.nota });
        } else {
            this.setState({ nota: 0 });
        }
    }

    render() {
        return (
            <div className="CajaReseñas">
                <h1 
                    className="Manrope" 
                    style={{ float: "left" }}
                >
                    Puntuación: {Math.round(this.state.nota)} 
                    <img 
                        src={estrellaLlena} 
                        alt="ERROR" 
                        style={{ height: "20px", margin: "0 0 2.5px 2.5px" }} 
                    />
                </h1>

                {this.props.inputComentario && (
                    <ComentarioInput 
                        token = {this.props.token}
                        id_casa = {this.props.id_casa}
                        extraerInfoCasa = {this.props.extraerInfoCasa}
                    />
                )}

                <div className="VisualizacionReseñas">
                    {this.props.reseñas && this.props.reseñas.length > 0 ? (
                        this.props.reseñas.map((cont) => (
                            <Reseña
                                key = {cont.id}
                                id_casa = {cont.id}
                                nombre = {cont.usuarios}
                                comentario = {cont.comentario}
                                calificacion = {cont.valoracion}
                            />
                        ))
                    ) : (
                        <h2>Ahora mismo no hay reseñas disponibles. Por favor agregue una.</h2>
                    )}
                </div>
            </div>
        );
    }
}
