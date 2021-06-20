import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from "./Home";
import Area from "./Area";
import Local from "./Local";
import Login from "./login";




export default class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
      
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/areamain">
            <Area />
          </Route>
          <Route path="/localmain">
            <Local />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      
      </Router>
    )
  }
}
