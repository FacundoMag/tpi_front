import { Component } from "react";
import { Redirect, Route, Switch } from "wouter";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";
import FormularioEntradaPropiedad from "./publicar-casa/FormularioEntradaPropiedad";
import Editar from "./editar-usuario/Editar";
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return(
      <>
        <Switch>
          <Route path="/"><Redirect to="/home"/></Route>
          
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/crear-cuenta">
            <Register/>
          </Route>

          <Route path="/iniciar-sesion">
            <Login />
          </Route>

          <Route path="/editar-usuario">
          <Editar />
          </Route>

          <Route path="/publicar-casa">
          <FormularioEntradaPropiedad/>
          </Route>

          <Route path="/ver-casa">
            
          </Route>
          
          <Route path="/pago">
            
          </Route>
          
          <Route path="/pago-realizado">
            
          </Route>
        </Switch>
      </>
    )
  }

}