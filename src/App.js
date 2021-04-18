import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { getCurrentUser } from "./services/authService";

import Cutomers from "./components/customers";
import Rentals from "./components/rentals";
import Notfound from "./components/notfound";
import Movies from "./components/movies/index";
import Movieform from "./components/movieform";
import Loginform from "./components/loginform";
import Registerform from "./components/registerform";
import Logout from "./components/logout";

class App extends Component {
  render() {
    const user = getCurrentUser();
    return (
      <div>
        <ToastContainer />
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Loginform} />
          <Route path="/register" component={Registerform} />
          <Route path="/customers" component={Cutomers} />
          <Route path="/rentals" component={Rentals} />
          <Route 
            path="/movies/:id" 
            render={props => {
              if(!user) return <Redirect to="/login" />;
              return <Movieform {...props} />;
            }} 
          />
          <Route path="/movies" component={Movies} />
          <Route path="/not-found" component={Notfound} />
          <Route path="/" exact component={Movies} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
