import { Component } from "react";
import axios from "axios";
import editar from "../../../assets/editar.png";
import eliminar from "../../../assets/eliminar.png";
import "./Publicacion.css";
import { Link } from "wouter";
import Notificacion from "../../../comun/Notificacion";

export default class Publicacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Puedes inicializar valores aquí si son necesarios
        };

        // Enlazar métodos para asegurar el contexto correcto
        this.botonEliminar = this.botonEliminar.bind(this);
    }

    botonEliminar(id) {
        const url = "http://localhost:4001/api/propiedades";

        const config = {
            headers: {
                authorization: this.props.token,
            },
            params: {
                id,
            },
        };

        axios
            .delete(url, config)
            .then((response) => {
                Notificacion.show("Se eliminó la casa correctamente.", "success");
                this.props.extraerMisPropiedades(this.props.token)
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error al eliminar la propiedad:", error);
                Notificacion.show("Hubo un error al eliminar la propiedad.", "error");
            });
    }

    render() {
        const rutaVerCasa = `/ver-casa/${this.props.id_casa}`;
        const rutaEditarCasa = `/mis-propiedades/editar-casa/${this.props.id_casa}`;
        const urlImagen = `http://localhost:4001/api/imagenes/${this.props.imagen}`;

        return (
            <div className="Publicacion">
                <Link to={rutaVerCasa}>
                    <img src={urlImagen} alt="ERROR" className="Imagen" />
                </Link>
                <div className="PrecioHome">
                    <h3 style={{ color: "#E93740" }}>${this.props.precio}</h3>
                    <h3>/ día</h3>
                </div>

                <div className="Acciones">
                    <button
                        className="BotonInvisible"
                        onClick={() => this.botonEliminar(this.props.id_casa)}
                    >
                        <img alt="Eliminar" className="IconoBoton" src={eliminar} />
                    </button>

                    <Link to={rutaEditarCasa}>
                        <button className="BotonInvisible">
                            <img alt="Editar" className="IconoBoton" src={editar} />
                        </button>
                    </Link>
                </div>

                <h3 className="Direccion">
                    {this.props.direccion}, {this.props.ciudad}
                </h3>

                <div className="DatosExtraHome">
                    <h4>{this.props.habitaciones} Habitaciones</h4>
                    <h4>|</h4>
                    <h4>{this.props.baños} Baños</h4>
                    <h4>|</h4>
                    <h4>{this.props.tipo}</h4>
                </div>
            </div>
        );
    }
}
