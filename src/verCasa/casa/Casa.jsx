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
                    direccion = {this.props.direccion}
                    ciudad = {this.props.ciudad}
                    precio = {this.props.precio} 
                    habitaciones = {this.props.habitaciones}
                    baños = {this.props.baños}
                    imagenes = {this.props.imagenes}
                    nota = {this.props.nota}
                    tamaño = {this.props.tamaño}
                />

                <DatosExtra  
                    descripcion = {this.props.descripcion}
                    wifi = {this.props.wifi}
                    cable = {this.props.cable}
                    pileta = {this.props.pileta}
                />
            </div>
        )
    }
}