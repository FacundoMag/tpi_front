import { Component } from "react";
import axios from "axios"; // Importa axios
import estrellaVacia from "../../../assets/estrellaVacia.png";
import estrellaLlena from "../../../assets/estrellaLlena.png";
import Notificacion from "../../../comun/Notificacion";
import "./ComentarioInput.css";

export default class ComentarioInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: "",
      caracteresRestantes: 150,
      calificacion: 0,
    };
    // Enlaza los métodos para asegurar que `this` funcione correctamente
    this.manejarCambio = this.manejarCambio.bind(this);
    this.publicarComentario = this.publicarComentario.bind(this);
    this.setearCalificacion = this.setearCalificacion.bind(this);
  }

  manejarCambio(event) {
    const comentario = event.target.value;
    if (comentario.length <= 150) {
      this.setState({
        comentario,
        caracteresRestantes: 150 - comentario.length,
      });
    }
  }

  publicarComentario() {
    if (this.state.comentario.length > 0) {
      const url = "http://localhost:4001/api/propiedades/propiedad/resena";

      const data = {
        comentario: this.state.comentario,
        puntuacion: this.state.calificacion,
      };

      const config = {
        headers: {
          authorization: this.props.token,
        },
        params: {
          propiedad_id: this.props.id_casa,
        },
      };

      axios.post(url, data, config)
        .then((response) => {
          Notificacion.show("Comentario publicado.", "success");
          this.props.extraerInfoCasa(this.props.id_casa);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  setearCalificacion(calificacion) {
    this.setState({ calificacion });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
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
