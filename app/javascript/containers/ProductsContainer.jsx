import React from "react";
import axios from "axios";

import Jumbotron from "../components/products/Jumbotron";
import Product from "../components/products/Product";
import NewProductForm from "../components/products/NewProductForm";

class ProductList extends React.Component {
  state = {
    products: [],
  };

  componentDidMount = () => {
    this.loadProductsFromServer();
  };

  handleProductSubmit = (data) => {
    const newProduct = {
      product: { ...data }
    }
    axios.post(`/api/v1/products.json`, newProduct)
    .then(response => {
      const newProducts = [...this.state.products, response.data.product]

      this.setState( {products: newProducts} )
    })
    .catch(error => console.log(error))
  };

  loadProductsFromServer = () => {
    axios
      .get("/api/v1/products.json")
      .then((response) => {
        const { products } = response.data;
        this.setState({ products });
      })
      .catch((error) => console.log(error.response.data));
  };

  render() {
    const { products } = this.state;
    const productList = products.map((product) => (
      <Product key={product.id} product={product} />
    ));

    return (
      <>
        <Jumbotron />
        <NewProductForm onSubmit={this.handleProductSubmit} />
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
