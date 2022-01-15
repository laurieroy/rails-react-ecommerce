import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Redirect } from "react-router-dom";
import axios from "axios";

import Button from "../components/shared/Button";
import ErrorMessages from "../components/shared/ErrorMessages";
import ProductForm from "../components/products/ProductForm";
import { EMAIL_REGEX, verifyAndSetFieldErrors } from "../shared/helpers";

class EditProductForm extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    errors: {},
    serverErrors: [],
    saved: false,
  };

  componentDidMount = () => {
    const id = this.props.match && +this.props.match.params.id;

    if (id) {
      this.getProduct(id);
    }
  };

  getProduct = (id) => {
    axios
      .get(`/api/v1/products/${id}.json`)
      .then((resp) => {
        product = resp.data.product;
        idx = product.price.search(/\d/);
        product.price = product.price.slice(idx);

        this.setState(
          {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
          },
          () => {
            this.props.onEdit();
          }
        );
      })
      .catch((error) => console.log(error));
  };

  handleBlur = (e) => {
    const { name } = e.target;
    const fieldError = this.checkErrors(this.state, name);
    const errors = Object.assign({}, this.state.errors, fieldError);
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    this.clearErrors(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault;

    const fieldNames = ["name", "description", "price", "quantity"];

    verifyAndSetFieldErrors(this, fieldNames);

		if (Object.keys(this.state.errors).length === 0) {    
				const { id, name, description, price, quantity } = this.state
				const editedProduct = {
				id,
				name,
				description,
				price: parseFloat(price),
				quantity: parseInt(quantity),
			};

			this.handleProductUpdate(editedProduct);
		}
	};
	
  handleProductUpdate = () => {};

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

  resetSaved = () => {
    this.setState({
      saved: false,
      serverErrors: [],
    });
  };

  render() {
    const buttonText = "Update Product";
    const title = "Editing Product";

    return (
      <div className="container">
        {this.state.serverErrors.length > 0 && (
          <ErrorMessages errors={this.state.serverErrors} />
        )}
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card panel-div">
              <h1 className="text-center form-heaader-style pt-2 pb-3">
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

EditProductForm.propTypes = {
  saved: PropTypes.bool.isRequired,
  serverErrors: PropTypes.array.isRequired,
  onResetSaved: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditProductForm;
