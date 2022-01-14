import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ProductList from "./ProductsContainer";
import ProductDetail from "./ProductDetailContainer";
import Signup from "./SignupFormContainer";
import Signin from "./SigninFormContainer";

class App extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount = () => {
    this.fetchCurrentUser();
  };

  fetchCurrentUser = () => {
    axios
      .get("/api/v1/users/get_current_user.json")
      .then((resp) => {
        let currentUser = resp.data.currentUser || null;

        this.setCurrentUser(currentUser);
      })
      .catch((error) => console.log(error.response.data));
  };

  handleSignout = (e, location, history) => {
    e.preventDefault();

    axios
      .delete("/api/v1/signout.json")
      .then((resp) => {
        this.setState({ currentUser: null });
        if (location.pathname !== "/") {
          history.push("/");
        }
      })
      .catch((error) => console.log(error.resp));
  };

  setCurrentUser = (currentUser) => {
    this.setState({ currentUser });
  };

  render() {
    return (
      <BrowserRouter>
        <>
          <Header
            currentUser={this.state.currentUser}
            onSignout={this.handleSignout}
          />

          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route
              path="/register"
              render={() => (
                <Signup
                  onFetchCurrentUser={this.fetchCurrentUser}
                  currentUser={this.state.currentUser}
                />
              )}
            />
            <Route path="/signin" component={Signin} />
            {/* 						<Route path="/newProduct" component={NewProductForm} /> */}
            <Route
              render={() => (
                <div className="container">
                  <div className="row">
                    <div className="card col-md-8 offset-md-2 form-headre-style">
                      <h1 className="text-center m-4">404: Not Found</h1>
                      <p className="text-center m-4">
                        The resource you are looking for could not be found.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            />
          </Switch>
          <Footer />
          {/*	<Route path="/" component={} />  */}
        </>
      </BrowserRouter>
    );
  }
}

export default App;
