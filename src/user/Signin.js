import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { login, authenticate } from "../auth";
class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    open: false,
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    login(user)
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          authenticate(data, () => {
            this.setState({
              error: "",
              email: "",
              password: "",
              open: true,
            });
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign In</h2>

        <div
          className="alert alert-primary"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
        {this.state.open && (
          <div
            className="alert alert-info"
            style={{ display: this.state.open ? "" : "none" }}
          >
            Successfully Login.
            <Redirect to="/"></Redirect>
          </div>
        )}

        <form>
          <div className="form-group">
            <lable className="text-muted">Email</lable>
            <input
              type="email"
              className="form-control"
              onChange={this.handleChange("email")}
              value={this.state.email}
            ></input>
          </div>
          <div className="form-group">
            <lable className="text-muted">Password</lable>
            <input
              type="password"
              className="form-control"
              onChange={this.handleChange("password")}
              value={this.state.password}
            ></input>
          </div>
          <button
            className="btn btn-raised btn-primary"
            onClick={this.clickSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signin;
