import { Component } from "react";
import Boton from "../../comun/Boton";
import "./VisualizacionDeCasas.css"

export default class VisualizacionDeCasas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            casa: [
                {direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "casa"}, 
                {direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "casa"}, 
                {direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "casa"}, 
            ],
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
                <h1 className="Titulo">Todas Las Propiedades</h1>
                {mostrarVisualizacion ? (
                    <div className="visualizacionCasas">
                        <h1>Visualización de casas</h1>
                    </div>
                ) : (
                    <div className="CasasNoDisponibles">
                        <h2>Ahora mismo no hay ninguna propiedad de este tipo en la plataforma.</h2>
                        <h2>¿Quiere agregar alguna?</h2>
                        <Boton ruta="/publicar-propiedad" estilo="Publicar">Publicar propiedad</Boton>
                    </div>
                )}
            </div>
        );
    }
}
