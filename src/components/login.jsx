import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(3).required().label("Password"),
  };

  doSubmit = () => {
    // save data on server.
    console.log("submitted");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="mt-4">
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
