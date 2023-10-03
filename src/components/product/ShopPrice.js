import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopPrice = ({ prices, getFilterParamsBody }) => {
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Price </h4>
      <div className="sidebar-widget-list mt-30">
        {prices ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getFilterParamsBody("price", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All
                </button>
              </div>
            </li>
            {prices.map((price) => {
              return (
                <li key={price.id}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        getFilterParamsBody("price", price.range);
                        setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" /> {price.label}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No price found"
        )}
      </div>
    </div>
  );
};

ShopPrice.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopPrice;
