import React, { useRef } from "react";

const ShopSearch = ({ getFilterParamsBody }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    getFilterParamsBody("search", inputRef.current.value);
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input type="text" ref={inputRef} placeholder="Search here..." />
          <button onClick={(e) => handleSubmit(e)}>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;
