import { Component } from "react";
import { Redirect, Route, Switch } from "wouter";
import Home from "./home/Home";
import Register from "./register/Register";
import Login from "./login/Login";
import Favoritos from "./favoritos/Favoritos";
import MisPropiedades from "./misPropiedades/MisPropiedades";
import VerCasa from "./verCasa/VerCasa";
import Pago from "./pago/Pago";
import PagoRealizado from "./pagoRealizado/PagoRealizado";
import './App.css';
import FormularioEntradaPropiedad from "./publicar-casa/FormularioEntradaPropiedad";
import Editar from "./editar-usuario/Editar";
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default class App extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            isAuthenticated: false,  
            userId: null,  
        };  
    }  

    handleLogin = (userId) => {  
        this.setState({ isAuthenticated: true, userId });  
    };  

    handleLogout = () => {  
        this.setState({ isAuthenticated: false, userId: null });  
        localStorage.removeItem("token"); // Limpiar el token del localStorage  
    };  

    render() {  
        return (  
            <>  
                <Switch>  
                    <Route path="/" >  
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
                        <Favoritos />  
                    </Route>  

                    <Route path="/mis-propiedades/editar-casa">  
                        <EditarPropiedades />  
                    </Route>  
 
                   <Route path="/mis-propiedades">
                    <MisPropiedades />
                   </Route>

                    <Route path="/ver-casa/:id_casa?">
                        {params => <VerCasa id_casa={params.id_casa}/>}
                    </Route>
          
                    <Route path="/ver-casa/pago/:id?">
                      {params => <Pago id={params.id}/>}
                    </Route>
          
                    <Route path="/ver-casa/pago/pago-realizado">
                        <PagoRealizado />
                    </Route>
        </Switch>
      </>
    )
  }
}