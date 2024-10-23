import { Component } from "react";
import estrellaVacia from "../../../assets/estrellaVacia.png";
import estrellaLlena from "../../../assets/estrellaLlena.png";
import "./Reseña.css";

export default class Reseña extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primeraLetra: "",
            estrellas: [estrellaVacia, estrellaVacia, estrellaVacia, estrellaVacia, estrellaVacia],
        }
    }

    componentDidMount() {
        this.extraerPrimeraLetra(this.props.nombre);
        this.actualizarEstrellas(); // Cambié el nombre de 'estrellas' a 'actualizarEstrellas' por claridad
    }

    extraerPrimeraLetra(nombre) {
        if (nombre && nombre.length > 0) {
            this.setState({ primeraLetra: nombre[0] });
        }
    }

    actualizarEstrellas() {
        let { calificacion } = this.props;

        // Asegurarse de que 'calificacion' esté entre 0 y 5
        calificacion = Math.min(Math.max(calificacion, 0), 5);

        const estrellasActualizadas = this.state.estrellas.map((_, index) =>
            index < calificacion ? estrellaLlena : estrellaVacia
        );

        this.setState({ estrellas: estrellasActualizadas });
    }

    render() {
        return (
            <div className="Reseña">
                <div className="Perfil">{this.state.primeraLetra}</div>

                <div className="ComentarioReseña">
                    <h3>{this.props.nombre}</h3>
                    <span>{this.props.comentario}</span>
                </div>

                <div className="Estrellas">
                    {this.state.estrellas.map((estrella, index) => (
                        <img
                            key={index}
                            src={estrella}
                            alt="Estrella"
                            style={{ height: "10px", paddingLeft: index > 0 ? "5px" : "0px" }}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
