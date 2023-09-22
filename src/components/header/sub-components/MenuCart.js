import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const MenuCart = ({currency }) => {
  return (
    <div className="shopping-cart-content">
      <Fragment>
          <ul>
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :
           
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout
            </Link>
          </div>
      </Fragment>
    </div>
  );
};

MenuCart.propTypes = {
  currency: PropTypes.object,
};

export default MenuCart;
