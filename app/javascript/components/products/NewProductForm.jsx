import React, { Component } from "react";
import PropTypes from "prop-types";

import { inputClasses } from "../../shared/helpers";

class NewProductForm extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    errors: {},
  };

  handleBlur = (e) => {
    const { name } = e.target;
    const fieldError = this.checkErrors(this.state, name);
    const errors = Object.assign({}, this.state.errors, fieldError)
    // const errors = [...this.state.errors, fieldError];

    this.setState({ errors });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, description, price, quantity } = this.state;

    const newProduct = {
      name,
      description,
      price,
      quantity,
    };

    this.props.onSubmit(newProduct);
    this.setState({
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
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

  render() {
    const buttonText = "Create Product";
    const title = "Add New Product";

    return (
      <div className="container mb-4">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card panel-div">
              <h1 className="text-center form-header-style pt-2 pb-3">
                {title}
              </h1>

              <div className="form-body-style px-5 pt-4">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-md-3 col-form-label">
                      Name
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        id="name"
                        className={inputClasses("name", this.state)}
                        placeholder="Item name"
                        autoFocus={true}
                      />
                      {this.state.errors.name ? (
                        <div className="invalid-feedback">
                          {this.state.errors.name}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="price" className="col-md-3 col-form-label">
                      Price
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        name="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        id="price"
                        className={inputClasses("price", this.state)}
                        placeholder="Item price"
                      />
                      {this.state.errors.price ? (
                        <div className="invalid-feedback">
                          {this.state.errors.price}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="description"
                      className="col-md-3 col-form-label"
                    >
                      Description
                    </label>
                    <div className="col-md-9">
                      <textarea
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        onBlur={this.handleblur}
                        id="description"
                        className={inputClasses("description", this.state)}
                        placeholder="Item description here"
                        rows="5"
                      ></textarea>
                      {this.state.errors.description ? (
                        <div className="invalid-feedback">
                          {this.state.errors.description}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="quantity"
                      className="col-md-3 col-form-label"
                    >
                      Quantity
                    </label>
                    <div className="col-md-9">
                      <input
                        type="number"
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.handleChange}
                        onBlur={this.handleblur}
                        id="quantity"
                        className={inputClasses("quantity", this.state)}
                        placeholder="Item quantity"
                      />
                      {this.state.errors.quantity ? (
                        <div className="invalid-feedback">
                          {this.state.errors.quantity}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="image" className="col-md-3 col-form-label">
                      Image
                    </label>
                    <div className="col-md-9">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-9 offset-md-3">
                      <input
                        type="submit"
                        className="btn btn-outline-purple"
                        value={buttonText}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default NewProductForm;
