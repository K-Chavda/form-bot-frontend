import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ModelDialog.module.css";

// Components
import InputField from "../InputField/InputField";

const ModelDialog = ({
  isModelOpen = false,
  onConfirmClick = () => {},
  onCancelClick = () => {},
  onChange = () => {},
  modelText,
  confirmButtonText = "Confirm",
  showInput = true,
  inputPlaceholder = "",
  inputValue = "",
}) => {
  return (
    <div
      className={
        isModelOpen ? styles.modelDialogContainer : styles.closeModelDialog
      }
    >
      <div className={styles.modelDialogContent}>
        <div className={styles.modelDialogContentTextAndInput}>
          {showInput ? (
            <>
              <label htmlFor="modelInput" className={styles.inputLabel}>
                Create New Folder
              </label>
              <InputField
                id="modelInput"
                name="modelInput"
                value={inputValue}
                customClass={styles.modelDialogInput}
                placeholder={inputPlaceholder}
                onChange={onChange}
              ></InputField>
            </>
          ) : (
            <span className={styles.modelDialogText}>{modelText}</span>
          )}
        </div>
        <div className={styles.modelDialogButtons}>
          <button className={styles.confirmButton} onClick={onConfirmClick}>
            {confirmButtonText}
          </button>
          <button className={styles.cancelButton} onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

ModelDialog.propTypes = {
  isModelOpen: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  modelText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  showInput: PropTypes.bool,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.string,
};

export default ModelDialog;
