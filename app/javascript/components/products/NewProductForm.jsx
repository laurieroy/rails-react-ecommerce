import React, { Component } from "react";
import PropTypes from "prop-types";

import ErrorMessage from "../shared/ErrorMessages";
import ProductForm from "../shared/Form";

class NewProductForm extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    errors: {},
  };

  componentDidUpdate() {
    if (this.props.saved) {
      this.setState({
        name: "",
        description: "",
        price: "",
        quantity: "",
      });
      this.props.onResetSaved();
    }
  }

  handleBlur = (e) => {
    const { name } = e.target;
    const fieldError = this.checkErrors(this.state, name);
    const errors = Object.assign({}, this.state.errors, fieldError);
    // const errors = [...this.state.errors, fieldError];

    this.setState({ errors });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.clearErrors(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const fieldNames = ["name", "description", "price", "quantity"];

    this.verifyAndSetFieldErrors(fieldNames);

    if (Object.keys(this.state.errors).length === 0) {
      const { name, description, price, quantity } = this.state;

      const newProduct = {
        name,
        description,
        price,
        quantity,
      };

      this.props.onSubmit(newProduct);
    }
  };

  checkErrors = (state, fieldName) => {
    const error = {};

    switch (fieldName) {
      case "name":
        if (!state.name) {
          error.name = "Please provide a name";
        }
        break;

      case "description":
        if (!state.description) {
          error.description = "Please provide a description";
        }
        break;

      case "price":
        if (
          parseFloat(state.price) <= 0.0 ||
          !state.price.toString().match(/^\d{1,}(\.\d{0,2})?$/)
        ) {
          error.price = "Price has to be a postiive number";
        }
        break;

      case "quantity":
        if (
          parseInt(state.quantity) <= 0 ||
          !state.quantity.toString().match(/^\d{1,}$/)
        ) {
          error.quantity = "Quantity has to be a postiive integer";
        }
        break;
    }

    return error;
  };

  clearErrors = (name, value) => {
    let errors = { ...this.state.errors };

    switch (name) {
      case "name":
        if (value.length > 0) {
          delete errors["name"];
        }
        break;
      case "description":
        if (value.length > 0) {
          delete errors["description"];
        }
        break;
      case "price":
        if (parseFloat(value) > 0.0 || value.match(/^\d{1,}(\.\d{0,2})?s/)) {
          delete errors["price"];
        }
        break;
      case "quantity":
        if (parseInt(value > 0) || value.match(/^\d{1,}$/)) {
          delete errors["quantity"];
        }
        break;
      default:
    }
    this.setState({ errors });
  };

  verifyAndSetFieldErrors = (fieldNames) => {
    let errors = {};

    fieldNames.forEach((fieldName) => {
      const fieldError = this.checkErrors(this.state, fieldName);

      errors = { ...errors, ...fieldError };
    });

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    }
  };

  render() {
    const buttonText = "Create Product";
    const title = "Add New Product";

    return (
      <div className="container mb-4">
        <div className="row">
          {this.props.serverErrors.length > 0 && (
            <ErrorMessage errors={this.props.serverErrors} />
          )}
          <div className="col-md-8 offset-md-2">
            <div className="card panel-div">
              <h1 className="text-center form-header-style pt-2 pb-3">
                {title}
              </h1>

              <ProductForm
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                state={this.state}
                buttonText={buttonText}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  serverErrors: PropTypes.array.isRequired,
  saved: PropTypes.bool.isRequired,
  onResetSaved: PropTypes.func.isRequired,
};
export default NewProductForm;
