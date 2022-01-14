import React from "react";
import PropTypes from "prop-types";

const ProductForm = (props) => {
  <Form onSubmit={props.onSubmit}>
    <Input
      title="Name"
      name="name"
      placeholder="Item name"
      type="text"
      value={props.state.name}
      onBlur={props.onBlur}
      onChange={props.onChange}
      autoFocus={true}
      state={props.state}
    />

    <Input
      id="price"
      title="Price"
      name="price"
      placeholder="Item price"
      type="text"
      value={props.state.price}
      onBlur={props.onBlur}
      onChange={props.onChange}
      autoFocus={false}
      state={props.state}
    />

    <TextArea
      id="description"
      title="Description"
      name="description"
      placeholder="Item description"
      type="text"
      value={props.state.description}
      onBlur={props.onBlur}
      onChange={props.onChange}
      autoFocus={false}
      rows="5"
      state={props.state}
    />

    <Input
      id="quantity"
      title="Quantity"
      name="quantity"
      placeholder="Item quantity"
      type="number"
      value={props.state.quantity}
      onBlur={props.onBlur}
      onChange={props.onChange}
      autoFocus={false}
      state={props.state}
    />

    <Input
      id="image"
      title="Image"
      name="image"
      placeholder="Item image"
      type="file"
      value={props.state.image}
      onBlur={props.onBlur}
      onChange={props.onChange}
      autoFocus={false}
      state={props.state}
    />

    <Button>{props.buttonText}</Button>
  </Form>;
};

ProductForm.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ProductForm;
