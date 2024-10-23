import { Component } from "react";
import "./ComentarioInput.css";

export default class ComentarioInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: "",
            caracteresRestantes: 150,
        };
    }

    manejarCambio = (event) => {
        const comentario = event.target.value;
        if (comentario.length <= 150) {
            this.setState({
                comentario: comentario,
                caracteresRestantes: 150 - comentario.length,
            });
        }
    };

    manejarComentario = () => {
        // Aquí podrías manejar el envío del comentario (por ejemplo, llamar una API o actualizar un estado).
        if (this.state.comentario.length > 0) {
            alert("Comentario enviado: " + this.state.comentario);
        }
    };

    render() {
        return (
            <div className="ComentarioInput">
                <textarea
                    value={this.state.comentario}
                    onChange={this.manejarCambio}
                    placeholder="Agrega un comentario..."
                    maxLength="150"
                />
                <div className="ControlesComentario">
                    <div className="Contador">
                        {this.state.caracteresRestantes} caracteres restantes
                    </div>
                    <button
                        className="ComentarBtn"
                        onClick={this.manejarComentario}
                        disabled={this.state.comentario.length === 0}
                    >
                        Comentar
                    </button>
                </div>
            </div>
        );
    }
}
