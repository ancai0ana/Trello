import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faTimes,
  faTrash,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
import MainPage from './components/MainPage'
import AuthPage from './components/Authentication/AuthPage'
library.add(faSearch)
library.add(faTimes)
library.add(faTrash)
library.add(faPencilAlt)

class App extends Component {
  render() {
    const loggedIn = true
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
    )
  }
}

export default App
