import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Toast.module.css";
import { nanoid } from "nanoid";

const toastId = nanoid();

const showToast = (message, type) => {
  const options = {
    type: type,
    bodyClassName: styles.toastText,
    toastId: toastId,
  };
  toast(message, options);
};

const ToastContainerComponent = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      className={styles.topMargin}
    />
  );
};

const promiseToast = (promises, message) => {
  // Ensure the input is an array
  const promisesArray = Array.isArray(promises) ? promises : [promises];

  // Combine all promises into one using Promise.all
  const combinedPromise = Promise.all(promisesArray);

  // Return a single promise toast for the combined promise
  toast.promise(combinedPromise, {
    pending: message.pending,
    success: message.success,
    error: message.error,
  });
};

export { ToastContainerComponent, showToast, promiseToast };
