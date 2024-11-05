import { Component } from "react";
import Publicacion from "./publicacion/publicacion";
import Boton from "../../comun/Boton";
import "./VisualizacionDeCasas.css"

export default class VisualizacionDeCasas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarVisualizacion: false,
        };
    }

    componentDidMount() {
        this.queMostrar(); 
    }

    queMostrar() {
        if (this.props.casas == "") {
            this.setState({ mostrarVisualizacion: false });
        } else {
            this.setState({ mostrarVisualizacion: true });
        }
    }

    render() {
        const { mostrarVisualizacion } = this.state;

        return (
            <div className="Contenedor">
                <h1 className="Titulo">{this.props.titulo}</h1>
                {mostrarVisualizacion ? (
                    <div className="VisualizacionCasas">
                        {this.props.casas.map((cont, index) => 
                            <Publicacion
                                key={cont.id}
                                ruta = "/ver-casa" 
                                direccion = {cont.direccion}
                                precio = {cont.precio_renta}
                                habitaciones = {cont.num_habitaciones}
                                baños = {cont.num_banos}
                                tipo = {cont.nombre}
                                imagen = {cont.url}
                            />
                        )}
                    </div>
                ) : (
                    <div className="CasasNoDisponibles">
                        <h2>Ahora mismo no hay ninguna propiedad de este tipo en la plataforma.</h2>
                        <h2>¿Quiere agregar alguna?</h2>
                        <Boton ruta="//publicar-casa" estilo="Publicar">Publicar propiedad</Boton>
                    </div>
                )}
            </div>
        );
    }
}
