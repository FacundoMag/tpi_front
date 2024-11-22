import { Component } from "react";
import axios from "axios";
import Notificacion from "../../../comun/Notificacion";
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
            primeraLetra: "",
        };

        this.botonCorazon = this.botonCorazon.bind(this);
        this.siguienteImagen = this.siguienteImagen.bind(this);
        this.anteriorImagen = this.anteriorImagen.bind(this);
    }

    componentDidMount() {
        if (this.props.mostrarRuta) {
            this.setState({ rutaReservar: `/pago/${this.props.id_casa}` });
            this.verificarCorazon();
        }
        this.estrellas();
        this.extraerPrimeraLetra(this.props.nombre)
    }

    // Extrae la primera letra del nombre propietario de la casa
    extraerPrimeraLetra(nombre) {
        if (nombre && nombre.length > 0) {
            this.setState({ primeraLetra: nombre[0] });
        }
    }

    // Verifica si la casa está en los favoritos del usuario
    verificarCorazon() {
        const { id_casa, favoritos } = this.props;
        
        for (let i = 0; i < favoritos.length; i++) {
            if (id_casa == favoritos[i].id) {
                this.setState({ corazon: corazonRojo })
            }
        }
    }

    // Muestra la calificación promedio de la casa
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

    // agrega o elimina la casa de favoritos
    botonCorazon() {
        const url = "http://localhost:4001/api/user/favoritos";

        const config = {
            headers: {
                authorization: this.props.token,
            },
            params: {
                propiedad_id: this.props.id_casa,
            },
        };

        if (this.state.corazon === corazonBlanco) {
            axios.post(url, null, config)
                .then((response) => {
                    Notificacion.show("Se ha agregado la casa a favoritos.", "success");
                    this.setState({ corazon: corazonRojo });
                    console.log(response.data);
                    
                })
                .catch((error) => {
                    console.log(error);
                });  
        } else if (this.state.corazon === corazonRojo) {
            axios.delete(url, config)
                .then((response) => {
                    Notificacion.show("Se eliminó la casa de favoritos.", "success");
                    this.setState({ corazon: corazonBlanco });
                    console.log(response.data);
                    
                })
                .catch((error) => {
                    console.log(error);
                }); 
        }
    }

    // Pasa a la siguiente imagen del carrousel
    siguienteImagen() {
        this.setState((prevState) => ({
            imagenActual: (prevState.imagenActual + 1) % this.props.imagenes.length,
        }));
    }

    // Pasa a la anterior imagen del carrousel
    anteriorImagen() {
        this.setState((prevState) => ({
            imagenActual: (prevState.imagenActual - 1 + this.props.imagenes.length) % this.props.imagenes.length,
        }));
    }

    render() {
        const { telefono, nombre, apellido, direccion, ciudad, tamaño, habitaciones, baños, capacidad, precio } = this.props;
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

                    <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
                        <div className="Usuario" style={{height: "20px", width: "20px", textAlign: "center" }}>
                            <span style={{ fontSize: "large", color: "white" }}>
                                {this.state.primeraLetra}
                            </span>
                        </div>
                        <span className="PublicSans" style={{ fontSize: "large", margin: "4px 0 0 6px" }}>
                            {nombre} {apellido}
                        </span>
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

                    <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
                        <span style={{ color: "black" }}>
                            Capacidad: <span style={{ fontWeight: "bold" }}>{capacidad}</span>
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
