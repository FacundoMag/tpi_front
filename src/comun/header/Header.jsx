import { Component } from "react";
import Boton from "../Boton";
import agregar from "../../assets/agregar.png";
import usuario from "../../assets/usuario.png";
import { Link } from 'wouter';
import './HeaderConLogin.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        };
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    };

    handleLogout = () => {
        console.log("Logout clicked in Header"); // Verifica el click
        sessionStorage.removeItem("token");
        if (this.props.onLogout) {
            this.props.onLogout(); // Llama al método que recibe el logout
        }
    };

    render() {
        return(
            <header>
                {this.props.isAuthenticated ? (  // Verifica si está autenticado
                    <>
                        <div className="Secciones" style={{ justifyContent: "left", paddingLeft: "50px" }}>
                            SouthernEscapes
                        </div>

                        <div className="Secciones"></div>

                        <div className="Secciones" style={{ justifyContent: "right", marginRight: "60px" }}>
                            <Link to={"/publicar-casa/"}>
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
                                    <Link to={`/editar-usuario/${this.props.usuario_id}`} className="MenuLink">Editar usuario</Link>
                                    <Link to="/favoritos" className="MenuLink">Favoritos</Link>
                                    <Link to="/mis-propiedades" className="MenuLink">Mis propiedades</Link>
                                    <Link to="/mis-reservaciones" className="MenuLink">Mis reservaciones</Link>
                                    <button className="CerrarSesion" onClick={() => this.props.onLogout()}>Cerrar sesión</button>
                                    </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="Secciones" style={{justifyContent: "left", paddingLeft: "50px"}}>SouthernEscapes</div>

                        <div className="Secciones"></div>

                        <div className="Secciones" style={{paddingRight: "20px"}}>
                            <Boton ruta="/crear-cuenta" estilo="BotonCc">Crear cuenta</Boton>
                            <Boton ruta="/iniciar-sesion" estilo="BotonIs">Iniciar sesión</Boton>
                        </div>
                    </>
                )}
            </header>
        );
    }
}
