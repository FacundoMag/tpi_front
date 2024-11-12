import { Component } from "react";
import estrellaVacia from "../../../assets/estrellaVacia.png";
import estrellaLlena from "../../../assets/estrellaLlena.png";
import "./ComentarioInput.css";

export default class ComentarioInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: "",
      caracteresRestantes: 150,
      calificacion: 0,
    };
  }

  manejarCambio(event) {
    const comentario = event.target.value;
    if (comentario.length <= 150) {
      this.setState({
        comentario: comentario,
        caracteresRestantes: 150 - comentario.length,
      });
    }
  };

  publicarComentario() {
    if (this.state.comentario.length > 0) {
      // alert("Comentario enviado: " + this.state.comentario);
      
    }
  };

  setearCalificacion(calificacion) {
    this.setState({ calificacion });
  };

  render() {
    return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className="ComentarioInput">
          <div className="Rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={star <= this.state.calificacion ? estrellaLlena : estrellaVacia}
                className="estrella"
                onClick={() => this.setearCalificacion(star)}
                alt={`${star} estrellas`}
              />
            ))}
          </div>
          <textarea
              className="CajaComentario"
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
              onClick={this.publicarComentario}
              disabled={this.state.comentario.length === 0}
            >
              Comentar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
