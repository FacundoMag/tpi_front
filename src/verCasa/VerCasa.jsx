import { Component } from "react";
import HeaderConLogin from "../comun/headerConLogin/HeaderConLogin";
import HeaderSinLogin from "../comun/HeaderSinLogin";
import Casa from "./casa/Casa";
import CajaDeReseñas from "./reseñas/CajaDeReseñas";
import Footer from "../comun/Footer";
import "./VerCasa.css"

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
            nota: 3,
            tamaño: 26,
            descripcion: "Una casa u hogar (del latín casa, choza) es una edificación destinada para ser habitada. ​ Puede organizarse en una o varias plantas, y normalmente, aunque no exclusivamente, se refiere a un edificio destinado a vivienda unifamiliar.",
            wifi: true,
            cable: true,
            pileta: true,

            reseñas: [
                {id: 1, nombre: "María", comentario: "Me gustó mucho la casa", calificacion: 5},
                {id: 2, nombre: "Adrían", comentario: "Me gustó mucho la casa, pero pudo ser mejor", calificacion: 4},
                {id: 3, nombre: "Lionel", comentario: "No me gustó la casa", calificacion: 1},
                {id: 4, nombre: "Lionel", comentario: "No me gustó la casa", calificacion: 1},
                {id: 5, nombre: "Lionel", comentario: "No me gustó la casa", calificacion: 1},
                {id: 6, nombre: "Lionel", comentario: "No me gustó la casa", calificacion: 1},
                {id: 7, nombre: "Lionel", comentario: "No me gustó la casa", calificacion: 1},
                {id: 8, nombre: "Lionel", comentario: "No me gustó la casa", calificacion: 1},
            ]
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
                    nota={this.state.nota}
                    tamaño={this.state.tamaño}
                    descripcion={this.state.descripcion}
                    wifi={this.state.wifi}
                    cable={this.state.cable}
                    pileta={this.state.pileta}
                />

                <CajaDeReseñas 
                    nota = {this.state.nota}
                    reseñas = {this.state.reseñas}
                />

                <Footer />

            </>
        )
    }
}