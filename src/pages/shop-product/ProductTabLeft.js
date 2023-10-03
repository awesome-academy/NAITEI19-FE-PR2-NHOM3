import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useDispatch } from "react-redux";
import { updateRecentlyView } from "../../redux/actions/authAction";

const ProductTabLeft = ({ location, product }) => {
  const { pathname } = location;
  const dispatch = useDispatch();

  function setRecentView() {
    dispatch(updateRecentlyView(product.id))
  }

  useEffect(()=>setRecentView(),[])

  return (
    <Fragment>
      <MetaTags>
        <title>Ecom | Product Detail</title>
        <meta
          name="description"
          content="Product page of ecom website"
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb  */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
          galleryType="leftThumb"
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.fullDescription}
          id={product.id}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        />

        {/* facebook comment */}
        <div className="d-flex justify-content-center">
          {/* <div class="fb-comments" data-href={`${process.env.REACT_APP_DEPLOY_FB_COMMENT+product.id}`} data-width="600" data-numposts="2"></div> */}
          <div class="fb-comments" data-href={``} data-width="600" data-numposts="2"></div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ProductTabLeft.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      single => single.id === itemId
    )[0]
  };
};

export default connect(mapStateToProps)(ProductTabLeft);
