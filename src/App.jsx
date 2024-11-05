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
import EditarPropiedades from "./editar-propiedades/EditarPropiedades";

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
          <Editar />
          </Route>

          <Route path="/publicar-casa">
            < FormularioEntradaPropiedad/>
          </Route>

          <Route path="/favoritos">
            <Favoritos />
          </Route>

          <Route path="/mis-propiedades/editar-casa">
          <EditarPropiedades/>
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