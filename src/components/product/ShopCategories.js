import PropTypes from "prop-types";
import React, { useState } from "react";

const ShopCategories = ({ categories, getFilterParamsBody }) => {
  const [currentOpenCategoryId, setCurrentOpenCategoryId] = useState();

  const handleCurrentOpenCategory = (categories, category) => {
    const foundCategory = categories.find(
      (categoryItem) =>
        categoryItem.id === category.id || categoryItem.id === category.parentId
    );

    setCurrentOpenCategoryId(foundCategory.id);
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            {categories.map((category) => {
              return category.parentId ? (
                category.parentId === currentOpenCategoryId ? (
                  <li key={category.id}>
                    <div className="sidebar-widget-list-left">
                      <button
                        category-id={category.id}
                        onClick={() => {
                          getFilterParamsBody("category", category.id);
                          handleCurrentOpenCategory(categories, category);
                        }}
                      >
                        <span className="checkmark" />
                        <p style={{ marginLeft: "20px" }}>{category.name}</p>
                      </button>
                    </div>
                  </li>
                ) : (
                  <></>
                )
              ) : (
                <li key={category.id}>
                  <div className="sidebar-widget-list-left">
                    <button
                      category-id={category.id}
                      onClick={() => {
                        getFilterParamsBody("category", category.id);
                        handleCurrentOpenCategory(categories, category);
                      }}
                    >
                      <span className="checkmark" /> {category.name}{" "}
                      <img
                        src={
                          currentOpenCategoryId === category.id
                            ? process.env.PUBLIC_URL +
                              "/assets/img/chevron-down.svg"
                            : process.env.PUBLIC_URL +
                              "/assets/img/chevron-up.svg"
                        }
                        alt="chevron-icon"
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
