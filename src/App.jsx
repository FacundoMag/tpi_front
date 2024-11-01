import { Component } from "react";
import { Redirect, Route, Switch } from "wouter";
import Home from "./home/Home";
import Register from "./register/Register";
import Login from "./login/Login";
import PropertyUpload from "./publicar-casa/PropertyUpload";
import Favoritos from "./favoritos/Favoritos";
import MisPropiedades from "./misPropiedades/MisPropiedades";
import VerCasa from "./verCasa/VerCasa";
import Pago from "./pago/Pago";
import PagoRealizado from "./pagoRealizado/PagoRealizado";
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
            <PropertyUpload />
          </Route>

          <Route path="/favoritos">
            <Favoritos />
          </Route>

          <Route path="/favoritos/editar-casa">

          </Route>

          <Route path="/mis-propiedades">
            <MisPropiedades />
          </Route>

          <Route path="/ver-casa">
            <VerCasa />
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