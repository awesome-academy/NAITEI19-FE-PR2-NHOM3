import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";


const ProductGridTwo = ({
  products,
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
            key={product.id}
            titlePriceClass={titlePriceClass}
          />
        );
      })}
    </Fragment>
  );
};

ProductGridTwo.propTypes = {
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(
      state.productData.products,
      ownProps.category,
      ownProps.type,
      ownProps.limit
    ),
    currency: state.currencyData,
  };
};



export default connect(mapStateToProps)(ProductGridTwo);
