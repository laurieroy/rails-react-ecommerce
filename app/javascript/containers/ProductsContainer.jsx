import React from "react";
import axios from "axios"

import Product from "../components/products/Product";
import Jumbotron from "../components/products/Jumbotron"

class ProductList extends React.Component {
	constructor(props) {
		super(props)

  return (
		<>
			<Jumbotron />
			<div className="container">
				<div className="row">
					<div className="col-md-12 mb-2">
						<div className="row">
							<div className="card-deck">
								{productList}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
  );
};

export default ProductList;
