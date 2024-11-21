import { Component } from "react";
import Publicacion from "./publicacion/Publicacion";
import Boton from "../../comun/Boton";

export default class VisualizacionDeCasas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarVisualizacion: false,
        };
    }

    render() {
        return (
            <div className="Contenedor">
                <h1 className="Titulo">{this.props.titulo}</h1>
                {this.props.casas.length > 0 ? (
                    <div className="VisualizacionCasas">
                        {this.props.casas.map((cont, index) => 
                            <Publicacion
                                token = {this.props.token}
                                key = {cont.id}
                                id_casa = {cont.id}
                                ciudad = {cont.ciudad} 
                                direccion = {cont.direccion}
                                precio = {cont.precio_renta}
                                habitaciones = {cont.num_habitaciones}
                                baños = {cont.num_banos}
                                tipo = {cont.tipo}
                                imagen = {cont.url}
                                extraerMisPropiedades = {this.props.extraerMisPropiedades}
                            />
                        )}
                    </div>
                ) : (
                    <div className="CasasNoDisponibles">
                        <h2>Aún no agregaste ninguna propiedad a la página.</h2>
                        <h2>¿Quiere agregar alguna?</h2>
                        <Boton ruta="/publicar-casa" estilo="Publicar">Publicar propiedad</Boton>
                    </div>
                )}
            </div>
        );
    }
}
