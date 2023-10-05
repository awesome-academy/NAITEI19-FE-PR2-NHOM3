import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import { removeUser } from "../../redux/actions/authAction";
import { Button } from "react-bootstrap";

const IconGroup = ({
  authData,
  currency,
  iconWhiteClass,
  removeUser,
  cartData,
  deleteFromCart,
}) => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      {authData.currentUser?.role === "ADMIN" ? (
        <div style={{ marginTop: "-10px" }}>
          <a href="/admin/categories" class="btn btn-outline-dark">
            Go to admin page
          </a>
        </div>
      ) : (
        <></>
      )}

      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          {authData.currentUser && authData.currentUser.avatar ? (
            <img
              className="rounded-circle"
              src={authData.currentUser.avatar}
              alt="avatar"
              style={{ width: "30px", height: "30px" }}
            />
          ) : (
            <i className="pe-7s-user-female" />
          )}
        </button>
        <div className="account-dropdown">
          <ul>
            {!authData.currentUser && (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    Register
                  </Link>
                </li>
              </>
            )}
            {authData.currentUser && (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    My account
                  </Link>
                </li>
                <hr></hr>
                <li>
                  <Button
                    variant="danger"
                    style={{ width: "100%", fontSize: "1rem", color: "white" }}
                    onClick={() => removeUser()}
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style"></span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style"></span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  authData: PropTypes.object,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  cartData: PropTypes.array,
  deleteFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    authData: state.authData,
    currency: state.currencyData,
    cartData: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => {
      dispatch(removeUser());
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
