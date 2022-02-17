import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Success } from "./pages";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <main>
          <Route path="/" component={Home} />
          <Route path="/success" component={Success} />
        </main>
      </Router>
    );
  }
}
