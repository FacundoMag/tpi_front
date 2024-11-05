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
            mostrarTodoComentario: false, // Controla si se muestra todo el comentario o solo los primeros 50 caracteres
        };
    }

    componentDidMount() {
        this.extraerPrimeraLetra(this.props.nombre);
        this.actualizarEstrellas();
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

    toggleMostrarTodoComentario = () => {
        this.setState((prevState) => ({
            mostrarTodoComentario: !prevState.mostrarTodoComentario,
        }));
    };

    render() {
        const { nombre, comentario } = this.props;
        const { mostrarTodoComentario, estrellas, primeraLetra } = this.state;
        const comentarioCorto = comentario.length > 50 ? comentario.slice(0, 50) + "..." : comentario;

        return (
            <div className="Reseña">
                <div className="Perfil">{primeraLetra}</div>

                <div className="ComentarioReseña">
                    <h3 style={{textAlign: "left"}}>{nombre}</h3>
                    <span>
                        {mostrarTodoComentario ? comentario : comentarioCorto}
                    </span>
                    {comentario.length > 50 && (
                        <button
                            className="VerMasBtn"
                            onClick={this.toggleMostrarTodoComentario}
                        >
                            {mostrarTodoComentario ? "Ver menos" : "Ver más"}
                        </button>
                    )}
                </div>

                <div className="Estrellas">
                    {estrellas.map((estrella, index) => (
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
