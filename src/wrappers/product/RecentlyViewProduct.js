import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import { addToCart } from "../../redux/actions/cartActions";


const RecentlyViewProduct = ({
    products,
    addToCart,
    cartItems,
    currency,
    sliderClassName,
    spaceBottomClass,
    colorClass,
    titlePriceClass
}) => {
    return (
        <Fragment>
            {products.map((product) => {
                return (
                    <ProductGridSingleTwo
                        sliderClassName={sliderClassName}
                        spaceBottomClass={spaceBottomClass}
                        colorClass={colorClass}
                        product={product}
                        currency={currency}
                        addToCart={addToCart}
                        cartItem={
                            cartItems.filter((cartItem) => cartItem.id === product.id)[0]
                        }
                        key={product.id}
                        titlePriceClass={titlePriceClass}
                    />
                );
            })}
        </Fragment>
    );
};

RecentlyViewProduct.propTypes = {
    addToCart: PropTypes.func,
    cartItems: PropTypes.array,
    currency: PropTypes.object,
    products: PropTypes.array,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    colorClass: PropTypes.string,
    titlePriceClass: PropTypes.string
};

const mapStateToProps = state => {
    const recentlyViewIds = state.authData.currentUser.recentlyViewIds || []
    const recentlyViewProd = state.productData.products.filter(product => recentlyViewIds.includes(product.id))

    return {
        products: recentlyViewProd,
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

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyViewProduct);
