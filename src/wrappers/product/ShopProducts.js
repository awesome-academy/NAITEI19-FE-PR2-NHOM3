import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";

import { productsData } from "../../data/fake";

const ShopProducts = ({ layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ""}`}>
        <ProductgridList products={productsData} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

export default ShopProducts;
