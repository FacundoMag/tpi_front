import { Component } from "react";
import Boton from "./Boton"

export default class HeaderSinLogin extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <header>
                <div className="Secciones" style={{justifyContent: "left", paddingLeft: "50px"}}>SouthernEscapes</div>

                <div className="Secciones"></div>

                <div className="Secciones" style={{paddingRight: "20px"}}>
                    <Boton ruta="/crear-cuenta" estilo="BotonCc">Crear cuenta</Boton>
                    <Boton ruta="/iniciar-sesion" estilo="BotonIs">Iniciar sesión</Boton>
                </div>
            </header>
        )
    }
}