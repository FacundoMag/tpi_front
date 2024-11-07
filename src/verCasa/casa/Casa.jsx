import { Component } from "react";
import DatosPrincipales from "./secciones/DatosPrincipales";
import DatosExtra from "./secciones/DatosExtra";

export default class Casa extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Casa">
                <DatosPrincipales 
                    telefono = {this.props.telefono}
                    direccion = {this.props.direccion}
                    ciudad = {this.props.ciudad}
                    precio = {this.props.precio} 
                    habitaciones = {this.props.habitaciones}
                    baños = {this.props.baños}
                    imagenes = {this.props.imagenes}
                    nota = {this.props.nota}
                    tamaño = {this.props.tamaño}
                    botonCorazon = {this.props.botonCorazon}
                />

                <DatosExtra  
                    descripcion = {this.props.descripcion}
                    servicios = {this.props.servicios}
                />
            </div>
        )
    }
}