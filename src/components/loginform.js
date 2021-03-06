import React from "react";
import Joi from "joi-browser";
import Layout from "./layout";
import Form from "./common/form";

import { login } from "../services/authService";

class Loginform extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  doSubmit = async () => {
    try{
      await login(this.state.data);
      window.location = '/';
    }catch(ex){
      if(ex.response && ex.response.status === 400){
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({ errors });     
      }
    }
  };
  render() {
    return (
      <Layout>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </Layout>
    );
  }
}

export default Loginform;
