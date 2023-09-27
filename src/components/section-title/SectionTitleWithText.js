import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ header, body, spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h1>{header}</h1>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  header: PropTypes.string,
  body: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
