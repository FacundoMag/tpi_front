import { Component } from "react";
import estrellaVacia from "../../../assets/estrellaVacia.png";
import estrellaLlena from "../../../assets/estrellaLlena.png";
import BotonReservar from "./extra/BotonReservar";
import corazonBlanco from "../../../assets/corazonBlanco.png";
import corazonRojo from "../../../assets/corazonRojo.png";

export default class DatosPrincipales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estrellas: [estrellaVacia, estrellaVacia, estrellaVacia, estrellaVacia, estrellaVacia],
            rutaReservar: "/iniciar-sesion",
            corazon: corazonBlanco,
            imagenActual: 0,
        };
        this.botonCorazon = this.botonCorazon.bind(this);
        this.siguienteImagen = this.siguienteImagen.bind(this);
        this.anteriorImagen = this.anteriorImagen.bind(this);
    }

    componentDidMount() {
        if (this.props.mostrarRuta) {
            this.setState({ rutaReservar: `/pago/${this.props.id_casa}` });
        }
        this.estrellas();
    }

    estrellas() {
        let { nota } = this.props;

        // Redondear calificación al entero más cercano
        nota = Math.round(nota);

        // Asegurarse de que 'calificacion' esté entre 0 y 5
        nota = Math.min(Math.max(nota, 0), 5);

        // Actualizar las estrellas según la calificación redondeada
        const estrellasActualizadas = this.state.estrellas.map((_, index) =>
            index < nota ? estrellaLlena : estrellaVacia
        );

        this.setState({ estrellas: estrellasActualizadas });
    }

    botonCorazon() {
        this.setState((prevState) => ({
            corazon: prevState.corazon === corazonBlanco ? corazonRojo : corazonBlanco,
        }));
    }

    siguienteImagen() {
        this.setState((prevState) => ({
            imagenActual: (prevState.imagenActual + 1) % this.props.imagenes.length,
        }));
    }

    anteriorImagen() {
        this.setState((prevState) => ({
            imagenActual: (prevState.imagenActual - 1 + this.props.imagenes.length) % this.props.imagenes.length,
        }));
    }

    render() {
        const { telefono, direccion, ciudad, tamaño, habitaciones, baños, precio } = this.props;
        const { estrellas, corazon, rutaReservar, imagenActual } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%", position: "relative", overflow: "hidden", height: "300px" }}>
                    <button
                        onClick={this.anteriorImagen}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            zIndex: 1,
                            backgroundColor: "transparent",
                            border: "none",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "white",
                        }}
                    >
                        &#10094;
                    </button>

                    <img
                        src={`http://localhost:4001/api/imagenes/${this.props.imagenes[imagenActual].url}`}
                        alt="ERROR"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                        }}
                    />

                    <button
                        onClick={this.siguienteImagen}
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            zIndex: 1,
                            backgroundColor: "transparent",
                            border: "none",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "white",
                        }}
                    >
                        &#10095;
                    </button>
                    
                    {this.props.botonCorazon && (
                        <button
                            className="BotonInvisible"
                            onClick={this.botonCorazon}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                zIndex: 2,
                            }}
                        >
                            <img alt="ERROR" style={{ height: "30px" }} src={corazon} />
                        </button>  
                    )}
                    
                </div>

                <div className="DatosPrincipales" style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {estrellas.map((estrella, index) => (
                            <img key={index} src={estrella} alt="ERROR" style={{ height: "20px", paddingLeft: index > 0 ? "5px" : "0px" }} />
                        ))}
                    </div>

                    <span className="PublicSans" style={{ fontSize: "x-large", fontWeight: "bold" }}>
                        {direccion}, {ciudad}
                    </span>
                    
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
                        <span style={{ color: "black" }}>
                            Tamaño: <span style={{ fontWeight: "bold" }}>{tamaño} m<span dangerouslySetInnerHTML={{ __html: "&sup2;" }} /></span>
                        </span>
                        <span style={{ color: "black", marginLeft: "100px" }}>
                            Contacto: <span style={{ fontWeight: "bold" }}>{telefono}</span>
                        </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
                        <span style={{ color: "black" }}>
                            Habitaciones: <span style={{ fontWeight: "bold" }}>{habitaciones}</span>
                        </span>
                        <span style={{ color: "black", marginLeft: "100px" }}>
                            Baños: <span style={{ fontWeight: "bold" }}>{baños}</span>
                        </span>
                    </div>

                    <span className="PrecioCasa">${precio}</span>

                    <div className="LineaHorizontal" />

                    <BotonReservar ruta={rutaReservar} estilo="BotonReservar">
                        RESERVAR
                    </BotonReservar>
                </div>
            </div>
        );
    }
}
