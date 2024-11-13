import { Component } from "react";
import { Route } from "wouter";
import Home from "./home/Home";
import Register from "./register/Register";
import Login from "./login/Login";
import Favoritos from "./favoritos/Favoritos";
import MisPropiedades from "./misPropiedades/MisPropiedades";
import VerCasa from "./verCasa/VerCasa";
import Pago from "./pago/Pago";
import PagoRealizado from "./pagoRealizado/PagoRealizado";
import EditarPropiedades from "./editar-propiedades/EditarPropiedades";
import FormularioEntradaPropiedad from "./publicar-casa/FormularioEntradaPropiedad";
import Editar from "./editar-usuario/Editar";
import Notificacion from "./comun/Notificacion";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            usuario_id: null,
        };
    }

    // Verifica el token al montar el componente
    componentDidMount() {
        const token = localStorage.getItem("token");
        console.log(token);
        
        if (token) {
            this.setState({ isAuthenticated: true });
        }
    }

    handleLogin = (usuario_id, token) => {
        sessionStorage.setItem("token", token); // Guardar el token en sessionStorage
        this.setState({ isAuthenticated: true, usuario_id });
    };

    handleLogout = () => {
        this.setState({ isAuthenticated: false, usuario_id: null });
        sessionStorage.removeItem("token"); // Limpiar el token del sessionStorage
        window.location.href = "/"; // Redirigir al usuario a la página principal
    };

    render() {
        return (
            <>
                <Route path="/">
                    <Home
                        isAuthenticated={this.state.isAuthenticated}
                        onLogout={this.handleLogout}
                    />
                </Route>

                <Route path="/crear-cuenta">
                    <Register />
                </Route>

                <Route path="/iniciar-sesion">
                    <Login onLogin={this.handleLogin} />
                </Route>

                <Route path="/editar-usuario">
                    <Editar />
                </Route>

                <Route path="/publicar-casa">
                    <FormularioEntradaPropiedad />
                </Route>

                <Route path="/favoritos">
                    <Favoritos
                        isAuthenticated={this.state.isAuthenticated}
                        onLogout={this.handleLogout}
                    />
                </Route>

                <Route path="/mis-propiedades/editar-casa">
                    <EditarPropiedades />
                </Route>

                <Route path="/mis-propiedades">
                    <MisPropiedades
                        isAuthenticated={this.state.isAuthenticated}
                        onLogout={this.handleLogout}
                    />
                </Route>

                <Route path="/ver-casa/:id_casa">
                    {(params) => (
                        <VerCasa
                            isAuthenticated={this.state.isAuthenticated}
                            onLogout={this.handleLogout}
                            id_casa={params.id_casa}
                            usuario_id = {this.state.usuario_id}
                        />
                    )}
                </Route>

                <Route path="/pago/:id_casa">
                    {(params) => (
                        <Pago 
                            isAuthenticated={this.state.isAuthenticated}
                            onLogout={this.handleLogout}
                            id_casa={params.id_casa}
                        />
                    )}
                    
                </Route>

                <Route path="/pago-realizado">
                    <PagoRealizado />
                </Route>

                <Notificacion />
            </>
        );
    }
}
