import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import Button from "../components/shared/Button";
import { EMAIL_REGEX, verifyAndSetFieldErrors } from "../shared/helpers";
import ErrorMessages from "../components/shared/ErrorMessages";
import Input from "../components/shared/Input";
import SignupForm from "../components/shared/Form";

class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    errors: {},
    saved: false,
    serverErrors: [],
    toHomePage: false,
  };

  componentDidUpdate = () => {
    if (this.state.saved) {
      this.setState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        errors: {},
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
    const errors = Object.assign({}, this.state.errors, fieldError)

    this.setState({ errors });
  };

  handleChange = (e) => {
		const { name, value } = e.target;
		
    this.setState({ [name]: value });
    this.clearErrors(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const fieldNames = ["firstname", "lastname", "email", "password"];
		if(Object.keys(this.state.errors).length === 0){
			const { firstname, lastname, email, password } = this.state;
			const newUser = {
				user: {
					first_name: firstname,
					last_name: lastname,
					email,
					password,
				},
			};

			this.handleSignup(newUser);

			verifyAndSetFieldErrors(this, fieldNames);
		}
  };

  handleSignup = (user) => {
    axios
      .post("/api/v1/users.json", user)
      .then((resp) => {
        this.setState(
          {
            serverErrors: [],
            saved: true,
          },
          () => {
            this.props.onFetchCurrentUser();
          })
      })
      .catch((error) => {
        this.setState({
          serverErrors: [...error.resp.data],
        });
      });
  };

  checkErrors = (state, fieldName) => {
    const error = {};

    switch (fieldName) {
      case "firstname":
        if (!state.firstname) {
          error.firstname = "Please provide a first name";
        }
        break;
      case "lastname":
        if (!state.lastname) {
          error.lastname = "Please provide a last name";
        }
        break;

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
      case "firstname":
        if (value.length > 0) {
          delete errors["firstname"];
        }
        break;
      case "lastname":
        if (value.length > 0) {
          delete errors["lastname"];
        }
        break;
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
              Sign up
            </h1>
            <SignupForm onSubmit={this.handleSubmit}>
              <Input
                title="First Name"
                type="text"
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Your first name, e.g., Jane"
                autoFocus={true}
                state={this.state}
              />

              <Input
                title="Last Name"
                type="text"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Your last name, e.g., Doe"
                autoFocus={false}
                state={this.state}
              />
              <Input
                title="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="jane_doe@example.com"
                autoFocus={false}
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
              <Button>Sign up</Button>
            </SignupForm>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  currentUser: PropTypes.object,
  onFetchCurrentUser: PropTypes.func.isRequired,
};

export default Signup;
