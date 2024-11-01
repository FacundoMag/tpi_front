import { Component } from "react";
import agregar from "../../assets/agregar.png";
import usuario from "../../assets/usuario.png";
import { Link } from 'wouter';
import './HeaderConLogin.css';

export default class HeaderSinLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        };
    }

    toggleMenu = () => {
        this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
    };

    render() {
        return (
            <header>
                <div className="Secciones" style={{ justifyContent: "left", paddingLeft: "50px" }}>
                    SouthernEscapes
                </div>

                <div className="Secciones"></div>

                <div className="Secciones" style={{ justifyContent: "right", marginRight: "60px" }}>
                    <Link to="/publicar-casa">
                        <div className="BotonPublicar">
                            <img 
                                src={agregar} 
                                alt="ERROR" 
                                style={{ height: "35px", marginTop: "22.5px", marginRight: "5px" }} 
                            /> 
                            <p style={{ fontSize: "x-large" }}>Publicar</p>
                        </div>
                    </Link>

                    <div className="Usuario" onClick={this.toggleMenu}>
                        <img 
                            src={usuario} 
                            alt="ERROR" 
                            style={{ height: "25px", width: "35px" }}
                        />
                    </div>

                    {this.state.isMenuOpen && (
                        <div className="MenuDesplegable">
                            <Link to="/editar-usuario" className="MenuLink">Editar usuario</Link>
                            <Link to="/favoritos" className="MenuLink">Favoritos</Link>
                            <button className="CerrarSesion">Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </header>
        );
    }
}
