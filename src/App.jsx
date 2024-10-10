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
        </Switch>
      </>
    )
  }

}