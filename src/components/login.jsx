import React, { Component } from "react";
import Input from "./common/input";

class Login extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { username, password } = this.state.account;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="mt-4">
          <Input
            name="username"
            onChange={this.handleChange}
            label="Username"
            value={username}
          />
          <Input
            name="password"
            onChange={this.handleChange}
            label="Password"
            value={password}
          />
          <button className="btn btn-primary mt-2">Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
