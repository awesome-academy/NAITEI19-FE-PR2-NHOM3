import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";

const ProductGrid = ({
  products,
  currency,
  addToCart,
  cartItems,
  sliderClassName,
  spaceBottomClass,
}) => {
  return (
    <Fragment>
      {products.map((product) => {
        return (
          <ProductGridListSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            cartItem={
              cartItems.filter(cartItem => cartItem.id === product.id)[0]
            }
            key={product.id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
