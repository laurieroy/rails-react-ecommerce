import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Button from "../components/shared/Button";
import ErrorMessages from "../components/shared/ErrorMessages";
import Input from "../components/shared/Input";
import SigninForm from "../components/shared/Form";
import { EMAIL_REGEX, verifyAndSetFieldErrors } from "../shared/helpers";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    toHomePage: false,
    saved: false,
    serverErrors: [],
  };

  componentDidUpdate = () => {
    if (this.state.saved) {
      this.setState({
        email: "",
        password: "",
        toHomePage: true,
      });

      this.resetSaved();
    }
  };

  componentWillUnmount = () => {
    if (this.state.serverErrors.length > 0) {
      this.resetSaved();
    }
  };

  handleBlur = (e) => {
    const { name } = e.target;
    const fieldError = this.checkErrors(this.state, name);
    const errors = Object.assign({}, this.state.errors, fieldError);

    this.setState({ errors });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    this.clearErrors(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const fieldNames = ["email", "password"];

    verifyAndSetFieldErrors(this, fieldNames);

    if (Object.keys(this.state.errors).length === 0) {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };

      this.handleSignin(user);
    }
  };

  handleSignin = (user) => {
    axios
      .post("/api/v1/signin.json", user)
      .then((resp) => {
        this.setState(
          {
            toHomePage: true,
            serverErrors: [],
            saved: true,
          },
          () => {
            this.props.onFetchCurrentUser();
          }
        );
      })
      .catch((error) => {
        // console.log(error.resp)
        const msg = error.resp.data.error;
        const idx = this.state.serverErrors.indexOf(msg);

        if (idx == -1) {
          this.setState({
            serverErrors: [...this.state.serverErrors, msg],
          });
        }
      });
  };

  checkErrors = (state, fieldName) => {
    const error = {};

    switch (fieldName) {
      case "email":
        if (!state.email || !EMAIL_REGEX.test(state.email)) {
          error.email = "Please provide a valid email address";
        }
        break;

      case "password":
        if (!state.password) {
          error.password = "Please provide a password";
        }
        break;
      default:
    }

    return error;
  };

  clearErrors = (name, value) => {
    let errors = { ...this.state.errors };

    switch (name) {
      case "password":
        if (value.length > 0) {
          delete errors["password"];
        }
        break;
      case "email":
        if (value.length > 0 && EMAIL_REGEX.test(this.state.email)) {
          delete errors["email"];
        }
        break;

      default:
    }
    this.setState({ errors });
  };

  resetSaved = () => {
    this.setState({
      saved: false,
      serverErrors: [],
    });
  };

  render() {
    if (this.state.toHomePage || this.props.currentUser) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container mt-4">
        <div className="row">
          {this.state.serverErrors.length > 0 && (
            <ErrorMessages errors={this.state.serverErrors} />
          )}
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center form-header-style mt-5 pt-2 pb-3">
              Sign In
            </h1>
            <SigninForm onSubmit={this.handleSubmit}>
              <Input
                title="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="jane_doe@example.com"
                autoFocus={true}
                state={this.state}
              />
              <Input
                title="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="password"
                autoFocus={false}
                state={this.state}
              />
              <Button>Sign in</Button>
            </SigninForm>
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  currentUser: PropTypes.object,
  onFetchCurrentUser: PropTypes.func.isRequired,
};

export default Signin;
