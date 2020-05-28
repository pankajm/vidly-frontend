import React, { Component } from "react";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="m-4">
          <main className="container">
            <Switch>
              <Route path="/movies" component={Movies}></Route>
              <Route path="/customers" component={Customers}></Route>
              <Route path="/rentals" component={Rentals}></Route>
              <Route path="/not-found" component={NotFound}></Route>
              <Route path="/" exact component={Movies} />
              <Redirect to="/not-found"></Redirect>
            </Switch>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
