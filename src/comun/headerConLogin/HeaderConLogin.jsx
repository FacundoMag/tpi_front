import { Component } from "react";
import agregar from "../../assets/agregar.png"
import usuario from "../../assets/usuario.png"
import { Link } from 'wouter';
import './HeaderConLogin.css'

export default class HeaderSinLogin extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <header>
                <div className="Secciones" style={{justifyContent: "left", paddingLeft: "50px"}}>SouthernEscapes</div>

                <div className="Secciones"></div>

                <div className="Secciones" style={{justifyContent: "right", marginRight: "60px"}}>

                    <Link to="/publicar-casa" >
                        <div className="BotonPublicar">

                            <img 
                                src={agregar} 
                                alt="ERROR" 
                                style={{height: "35px", marginTop: "22.5px", marginRight: "5px"}} 
                            /> 
                            <p style={{fontSize: "x-large"}}>Publicar</p>

                        </div>
                    </Link>

                    <Link to="/editar-usuario">
                        <div className="Usuario">

                            <img 
                                src={usuario} 
                                alt="ERROR" 
                                style={{height: "25px", width: "35px"}}
                            />

                        </div>
                    </Link>

                </div>
            </header>
        )
    }
}