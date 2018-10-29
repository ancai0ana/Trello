import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MainPage from "./components/MainPage";
import AuthPage from "./components/Authentication/AuthPage";
library.add(faSearch);

class App extends Component {
  render() {
    const loggedIn = false;
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={() =>
              loggedIn ? <Redirect to="/MainPage" /> : <AuthPage />
            }
          />
          <Route path="/MainPage" component={MainPage} />
        </div>
      </Router>
    );
  }
}

export default App;
