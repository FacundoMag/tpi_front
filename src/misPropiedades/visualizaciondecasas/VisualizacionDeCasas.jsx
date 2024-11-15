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
                {this.props.casa.length > 0 ? (
                    <div className="VisualizacionCasas">
                        {this.state.casas.map((cont, index) => 
                            <Publicacion
                                key = {cont.id}
                                id = {cont.id} 
                                direccion = {cont.direccion}
                                precio = {cont.precio}
                                habitaciones = {cont.habitaciones}
                                baños = {cont.baños}
                                tipo = {cont.tipo}
                                imagen = {cont.imagen}
                            />
                        )}
                    </div>
                ) : (
                    <div className="CasasNoDisponibles">
                        <h2>Aún no agregaste ninguna propiedad a la página.</h2>
                        <h2>¿Quiere agregar alguna?</h2>
                        <Boton ruta="/publicar-propiedad" estilo="Publicar">Publicar propiedad</Boton>
                    </div>
                )}
            </div>
        );
    }
}
