import React from "react";
import PropTypes from "prop-types";
import styles from "./SecondaryButton.module.css";

const SecondaryButton = ({
  onClick = () => {},
  children,
  style = {},
  customClass = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.secondaryButton} ${customClass}`}
      style={style}
    >
      {children}
    </button>
  );
};

SecondaryButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  customClass: PropTypes.string,
};

export default SecondaryButton;
