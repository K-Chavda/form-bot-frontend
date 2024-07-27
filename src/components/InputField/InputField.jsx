import React from "react";
import PropTypes from "prop-types";
import styles from "./InputField.module.css";

const InputField = ({
  label,
  value,
  onChange,
  onBlur = () => {},
  errorMessage = "",
  type = "text",
  name,
  placeholder,
  customClass,
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label
          className={
            errorMessage ? `${styles.label} ${styles.labelError}` : styles.label
          }
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${
          errorMessage ? styles.inputError : ""
        } ${customClass}`}
        name={name}
        autoComplete="true"
      />
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default InputField;
