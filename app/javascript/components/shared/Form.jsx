import React from "react";
import PropTypes from "prop-types";

import Form from "../shared/Form";

const ProductForm = (props) => {
  return (
    <div className="form-body-style px-5 pt-4">
      <form className="form-horizontal" onSubmit={props.onSubmit} noValidate>
        {props.children}
      </form>
    </div>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
};

export default ProductForm;
