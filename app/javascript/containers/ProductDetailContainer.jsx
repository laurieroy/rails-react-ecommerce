import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

import EditProductForm from "./EditProductFormContainer";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      editing: false,
      updated: false,
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  componentDidUpdate = () => {
    if (this.state.editing && this.state.updated) {
      this.getProduct();
    }
  };

  editingProduct = (value) => {
    if (value === undefined) {
      this.setState({ editing: true });
    } else if (value === "edited") {
      this.setState({ editing: false });
    }
  };

  getProduct = () => {
    const id = this.props.match && this.props.match.params.id;

    axios
      .get(`/api/v1/products/${id}.json`)
      .then((response) => {
        this.setState({ product: response.data.product });
      })
      .catch((error) => console.log(error.respose));
  };

  isOwner = (user, product) => {
    if (Object.keys(product).length > 0) {
      return user && user.id === product.user_id;
    }

    return false;
  };

  setUpdated = (value) => {
    this.setState({ updated: value });
  };

  render() {
    const id = this.props.match && this.props.match.params.id;
    const { product } = this.state;
    const { currentUser } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <img
              className="img-fluid"
              src="http://placehold.it/350x150"
              width="100%"
            />
          </div>

          <div className="col-md-10 offset-md-1">
            <div className="float-right">
              <h3>
                <span className="badge badge-pill badge-purple">
                  {product.price}
                </span>
              </h3>
            </div>
            <div>
              <h3>{product.name}</h3>
            </div>

            <div className="mb-4">{product.description}</div>

            {this.isOwner(currentUser, product) && !this.state.editing ? (
              <>
                <div className="float-right btn-edit-del">
                  <Link
                    to={`/products/${id}`}
                    className="btn btn-outline-danger btn-lg"
                  >
                    Delete
                  </Link>
                </div>

                <div className="btn-edit-del">
                  <Link
                    to={`/products/${id}/edit`}
                    className="btn btn-outline-purple btn-lg"
                  >
                    Edit
                  </Link>
                </div>
              </>
            ) : null}
          </div>

          {this.isOwner(currentUser, product) ? (
            <Route
              path="/products/:id/edit"
              render={(props) => (
                <EditProductForm
                  {...props}
                  onEdit={this.editingProduct}
                  onUpdate={this.setUpdated}
                />
              )}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  currentUser: PropTypes.object,
};

export default ProductDetail;
