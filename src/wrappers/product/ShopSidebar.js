import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  getIndividualTags,
  getIndividualColors,
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopTag from "../../components/product/ShopTag";
import ShopPrice from "../../components/product/ShopPrice";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniquePrices, setUniquePrices] = useState([]);
  const uniqueColors = getIndividualColors(products);
  const uniqueTags = getIndividualTags(products);

  useEffect(() => {
    const fetchData = async () => {
      const responseCategory = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/categories/"
      );
      const responsePrice = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/prices/"
      );
      const categories = await responseCategory.json();
      setUniqueCategories(categories);

      const prices = await responsePrice.json();
      setUniquePrices(prices);
    };

    fetchData();
  }, []);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />

      {/* filter by color */}
      <ShopColor colors={uniqueColors} getSortParams={getSortParams} />

      {/* filter by tag */}
      <ShopTag tags={uniqueTags} getSortParams={getSortParams} />

      {/* filter by price */}
      <ShopPrice prices={uniquePrices} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
