import { Component } from "react";
import { Redirect, Route, Switch } from "wouter";
import Home from "./home/Home";
import VerCasa from "./verCasa/VerCasa";
import './App.css';

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
            
          </Route>

          <Route path="/iniciar-sesion">
            
          </Route>

          <Route path="/editar-usuario">
            
          </Route>

          <Route path="/publicar-casa">

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