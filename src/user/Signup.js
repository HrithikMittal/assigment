import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
class Signup extends Component {
  state = {
    name: "",
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
    const { name, email, password } = this.state;
    const user = { name, email, password };
    signup(user)
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            error: "",
            email: "",
            password: "",
            name: "",
            open: true,
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
        <h2 className="mt-5 mb-5">Signup</h2>

        <div
          className="alert alert-primary"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: this.state.open ? "" : "none" }}
        >
          New Account is succesfully created. Please{" "}
          <Link to="/signin">Sign In</Link>.
        </div>

        <form>
          <div className="form-group">
            <lable className="text-muted">Name</lable>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange("name")}
              value={this.state.name}
            ></input>
          </div>
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

export default Signup;
