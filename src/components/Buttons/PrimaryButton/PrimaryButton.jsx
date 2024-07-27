import React from "react";
import PropTypes from "prop-types";
import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({
  onClick = () => {},
  children,
  style = {},
  customClass = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.primaryButton} ${customClass}`}
      style={style}
    >
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  customClass: PropTypes.string,
};

export default PrimaryButton;
