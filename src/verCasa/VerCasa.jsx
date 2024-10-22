import { Component } from "react";
import HeaderConLogin from "../comun/headerConLogin/HeaderConLogin";
import HeaderSinLogin from "../comun/HeaderSinLogin";
import Casa from "./casa/Casa"

export default class VerCasa extends Component {
    constructor(props){
        super(props);
        this.state = {
            header: false,
            id: 1, 
            direccion: "Kuanip 1253", 
            ciudad: "Ushuaia",
            precio: 80000, 
            habitaciones: 3, 
            baños: 2, 
            imagen: "https://i.pinimg.com/originals/8e/42/c7/8e42c70ed80a21ce69142dea8f8b0ab2.jpg",
            notaPromedio: 4,
            tamaño: 26,
            disponibilidad: "disponible",
        }
    }

    render(){
        return(
            <>
                {this.state.header ? (
                    <HeaderConLogin />
                ) : (
                    <HeaderSinLogin />   
                )}

                <Casa 
                    direccion={this.state.direccion}
                    ciudad={this.state.ciudad}
                    precio={this.state.precio} 
                    habitaciones={this.state.habitaciones}
                    baños={this.state.baños}
                    imagen={this.state.imagen}
                    nota={this.state.notaPromedio}
                    tamaño={this.state.tamaño}
                />

            </>
        )
    }
}