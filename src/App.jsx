import { Component } from "react";
import { Redirect, Route, Switch } from "wouter";
import Home from "./home/Home";
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
          <Route path="/"><Redirect to="/home"/></Route>
          
          <Route path="/home">
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