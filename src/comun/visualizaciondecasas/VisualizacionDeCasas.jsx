import { Component } from "react";
import Publicacion from "./publicacion/publicacion";
import Boton from "../../comun/Boton";
import "./VisualizacionDeCasas.css"

export default class VisualizacionDeCasas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            casas: [
                {id: 1, direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "casa", imagen: "https://i.pinimg.com/originals/8e/42/c7/8e42c70ed80a21ce69142dea8f8b0ab2.jpg"}, 
                {id: 2, direccion: "Kuanip 1253", precio: 90000, habitaciones: 3, baños: 2, tipo: "Departamento", imagen: "https://i.pinimg.com/originals/8e/42/c7/8e42c70ed80a21ce69142dea8f8b0ab2.jpg"}, 
                {id: 3, direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "Hotel", imagen: "https://i.pinimg.com/originals/8e/42/c7/8e42c70ed80a21ce69142dea8f8b0ab2.jpg"},
                {id: 4, direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "Hotel", imagen: "https://i.pinimg.com/originals/8e/42/c7/8e42c70ed80a21ce69142dea8f8b0ab2.jpg"},
                {id: 5, direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "Hotel", imagen: "https://i.pinimg.com/originals/8e/42/c7/8e42c70ed80a21ce69142dea8f8b0ab2.jpg"},
                {id: 6, direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "Hotel", imagen: "https://i.pinimg.com/originals/8e/42/c7/8e42c70ed80a21ce69142dea8f8b0ab2.jpg"},
                {id: 7, direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "Hotel", imagen: "https://i.pinimg.com/originals/8e/42/c7/8e42c70ed80a21ce69142dea8f8b0ab2.jpg"},
                {id: 8, direccion: "Kuanip 1253", precio: 80000, habitaciones: 3, baños: 2, tipo: "Hotel", imagen: "https://i.pinimg.com/originals/8e/42/c7/8e42c70ed80a21ce69142dea8f8b0ab2.jpg"}, 
            ],
            mostrarVisualizacion: false,
        };
    }

    componentDidMount() {
        this.queMostrar();
    }

    queMostrar() {
        if (this.state.casas == "") {
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
                        {this.state.casas.map((cont, index) => 
                            <Publicacion
                                key={cont.id}
                                ruta = "/ver-casa" 
                                direccion = {cont.direccion}
                                precio = {cont.precio}
                                habitaciones = {cont.habitaciones}
                                baños = {cont.baños}
                                tipo = {cont.tipo}
                                imagen = {cont.imagen}
                                dueño = {this.props.dueño}
                            />
                        )}
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
