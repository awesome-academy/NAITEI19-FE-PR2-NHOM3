import PropTypes from "prop-types";
import React from "react";

const ShopColor = ({ colors, getFilterParamsBody }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Color </h4>
      <div className="sidebar-widget-list mt-20">
        {colors ? (
          <ul>
            {colors.map((color, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      color-value={color}
                      onClick={() => {
                        getFilterParamsBody("color", color);
                      }}
                    >
                      <span className="checkmark" /> {color}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No colors found"
        )}
      </div>
    </div>
  );
};

ShopColor.propTypes = {
  colors: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopColor;
