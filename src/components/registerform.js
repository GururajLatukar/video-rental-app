import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Layout from "./layout";

import { register } from "../services/userService";
import { loginWithJWT } from "../services/authService";

class Registerform extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().min(2).max(10).label("Name"),
  };
  doSubmit = async () => {
    try{
      const response = await register(this.state.data);
      loginWithJWT(response.headers['x-auth-token']);
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </Layout>
    );
  }
}

export default Registerform;
