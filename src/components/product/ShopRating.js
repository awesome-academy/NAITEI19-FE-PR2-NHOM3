import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopRating = ({ rates, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Price </h4>
      <div className="sidebar-widget-list mt-30">
        {rates ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("price", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All
                </button>
              </div>
            </li>
            {rates.map((rate) => {
              return (
                <li key={rate.id}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        getSortParams("rate", rate.id);
                        setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" /> {rate.label}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No rate found"
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
