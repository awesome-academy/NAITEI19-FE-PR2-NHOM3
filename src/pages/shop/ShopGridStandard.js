import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedProducts, setActiveSort } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";

const ShopGridStandard = ({ location, products }) => {
  const [layout, setLayout] = useState("grid three-column");
  const [filterParamsTypes, setFilterParamsTypes] = useState({
    search: false,
    category: false,
    tag: false,
    color: false,
    price: false,
    sort: false,
  });
  const [filterParamsValues, setFilterParamsValues] = useState({
    search: "",
    category: "",
    tag: "",
    color: "",
    price: "",
    sort: "",
  });
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const pageLimit = 15;
  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getFilterParamsBody = (filterType, filterValue) => {
    const valueParamsBody = { ...filterParamsValues };
    const typeParamsBody = { ...filterParamsTypes };

    if (filterType === "search") {
      valueParamsBody.search = filterValue;
      typeParamsBody.search = true;
    } else if (filterType === "category") {
      valueParamsBody.category = filterValue;
      typeParamsBody.category = true;
    } else if (filterType === "color") {
      valueParamsBody.color = filterValue;
      typeParamsBody.color = true;
    } else if (filterType === "tag") {
      valueParamsBody.tag = filterValue;
      typeParamsBody.tag = true;
    } else if (filterType === "price") {
      valueParamsBody.price = filterValue;
      typeParamsBody.price = true;
    } else if (filterType === "sort") {
      valueParamsBody.sort = filterValue;
      typeParamsBody.sort = true;
    }

    setFilterParamsValues(valueParamsBody);
    setFilterParamsTypes(typeParamsBody);
  };

  useEffect(() => {
    const sortedProducts = getSortedProducts(
      products,
      filterParamsTypes,
      filterParamsValues
    );
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    setActiveSort(filterParamsValues)
  }, [offset, products, filterParamsTypes, filterParamsValues]);

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Shop Page</title>
        <meta
          name="description"
          content="Shop Grid View"
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getFilterParamsBody={getFilterParamsBody}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterParamsBody={getFilterParamsBody}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                {currentData.length > 0 ? (
                  <ShopProducts layout={layout} products={currentData} />
                ) : (
                  "No results"
                )}

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(ShopGridStandard);
