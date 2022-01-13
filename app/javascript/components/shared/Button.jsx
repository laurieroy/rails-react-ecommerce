import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  <div className="form-group row">
    <div className="col-md-9 offset-md-3">
      <button type="submit" className="btn btn-outline-purple btn-lg">
        {props.buttonText}
      </button>
    </div>
  </div>;
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default Button;