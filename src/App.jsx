import { Component } from "react";
import { Redirect, Route, Switch } from "wouter";
import Home from "./home/Home";
import VerCasa from "./verCasa/VerCasa";
import Login from "./login/Login";
import Register from "./register/Register";
import PropertyUpload from "./publicar-casa/PropertyUpload";
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
          <Route path="/">
            <Home />
          </Route>

          <Route path="/crear-cuenta">
            <Register/>
          </Route>

          <Route path="/iniciar-sesion">
            <Login />
          </Route>

          <Route path="/editar-usuario">
            
          </Route>

          <Route path="/publicar-casa">
          <PropertyUpload/>
          </Route>

          <Route path="/ver-casa">
            <VerCasa />
          </Route>
          
          <Route path="/ver-casa/pago">
            
          </Route>
          
          <Route path="/ver-casa/pago/pago-realizado">
            
          </Route>

        
        </Switch>
      </>
    )
  }

}