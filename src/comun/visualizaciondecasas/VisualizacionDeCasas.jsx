import { Component } from "react";
import Publicacion from "./publicacion/Publicacion";
import Boton from "../../comun/Boton";
import "./VisualizacionDeCasas.css"

export default class VisualizacionDeCasas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarVisualizacion: false,
        };
    }
/*
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
*/
    render() {
        const { mostrarVisualizacion } = this.state;

        return (
            <div className="Contenedor">
                <h1 className="Titulo">{this.props.titulo}</h1>
                {this.props.casas.length > 0 ? (
                    <div className="VisualizacionCasas">
                        {this.props.casas.map((cont, index) => 
                            <Publicacion
                                key={cont.id}
                                id_casa={cont.id}
                                direccion = {cont.direccion}
                                ciudad = {cont.ciudad}
                                precio = {cont.precio_renta}
                                habitaciones = {cont.num_habitaciones}
                                baños = {cont.num_banos}
                                tipo = {cont.tipo}
                                imagen = {cont.imagenes}
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
