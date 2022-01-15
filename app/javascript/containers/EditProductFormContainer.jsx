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
				idx = product.price.search(/\d/)
				product.price = product.price.slice(idx)

				this.setState({
					id: product.id,
					name: product.name,
					description: product.description,
					price: product.price,
					quantity: product.quantity,
				}, () => {
					this.props.onEdit()
				})
      })
      .catch((error) => console.log(error));
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
