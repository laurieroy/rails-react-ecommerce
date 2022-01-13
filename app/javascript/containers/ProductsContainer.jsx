import React from "react";
import axios from "axios";

import Jumbotron from "../components/products/Jumbotron";
import Product from "../components/products/Product";
import NewProductForm from "../components/products/NewProductForm";

class ProductList extends React.Component {
  state = {
    products: [],
    serverErrors: [],
    saved: false,
  };

  componentDidMount = () => {
    this.loadProductsFromServer();
  };

  handleProductSubmit = (data) => {
    const newProduct = {
      product: { ...data },
    };
    axios
      .post(`/api/v1/products.json`, newProduct)
      .then((response) => {
        const newProducts = [...this.state.products, response.data.product];

        this.setState({
          products: newProducts,
          serverErrors: [],
          saved: true,
        });
      })
      .catch((error) => {
        const msg = error.response.data;

        this.setState({ serverErrors: [...this.state.serverErrors, ...msg] });
      });
  };

  loadProductsFromServer = () => {
    axios
      .get("/api/v1/products.json")
      .then((response) => {
        const { products } = response.data;
        this.setState({ products });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  resetSaved = () => {
    this.setState({
      saved: false,
      serverErrors: [],
    });
  };

  render() {
    const { products } = this.state;
    const productList = products.map((product) => (
      <Product key={product.id} product={product} />
    ));

    return (
      <>
        <Jumbotron />
        <NewProductForm
          onSubmit={this.handleProductSubmit}
          serverErrors={this.state.serverErrors}
          saved={this.state.saved}
          onResetSaved={this.resetSaved}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-2">
              <div className="row">
                <div className="card-deck">{productList}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProductList;
