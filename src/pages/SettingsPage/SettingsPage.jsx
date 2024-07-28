import React, { useContext, useEffect, useState } from "react";
import styles from "./SettingsPage.module.css";

// API Functions
import { UpdateUserDetails, GetUserDetailsById } from "../../api/UserAuth";

// Components
import { showToast, promiseToast } from "../../components";

// Contexts
import { UserContext } from "../../contexts/UserContext";

// Icon & Images
import {
  logoutIcon,
  userIcon,
  eyeIcon,
  lockIcon,
  backArrowIcon,
} from "../../assets/icons";

// Assuming `navigate` is a function from a routing library like `react-router-dom`
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { logout } = useContext(UserContext);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [value, setValue] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateClick = async () => {
    if (value.oldPassword && value.oldPassword === value.newPassword) {
      showToast("Please enter a different password", "error");
      return;
    }

    const { username, email, oldPassword, newPassword } = value;
    try {
      const updateUserDetailsPromise = UpdateUserDetails({
        username,
        email,
        oldPassword,
        newPassword,
      })
        .then((response) => {
          if (response.data?.success) {
            localStorage.clear();
            navigate("/");
          }
          return response;
        })
        .catch((error) => {
          return error;
        });

      promiseToast([updateUserDetailsPromise], {
        pending: "Please, wait while we are updating details...",
        success: "Details updated successfully!",
      });
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleLogOutClickEvent = () => {
    logout();
  };

  const handleBackButtonClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await GetUserDetailsById();
        setValue((prevState) => ({
          ...prevState,
          username: response.data?.username,
          email: response.data?.email,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const togglePasswordVisibility = (field) => {
    if (field === "old") {
      setShowOldPassword((prev) => !prev);
    } else if (field === "new") {
      setShowNewPassword((prev) => !prev);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <span className={styles.formHeadingText}>Settings</span>
        <form className={styles.formFieldsContainer}>
          <div className={styles.formInputFieldsContainer}>
            <div className={styles.inputFieldContainer}>
              <img
                src={userIcon}
                alt="form-bot"
                className={styles.inputFieldIcon}
              />
              <input
                type="text"
                name="username"
                className={styles.formInputField}
                placeholder="Name"
                value={value.username}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <img
                src={lockIcon}
                alt="form-bot"
                className={styles.inputFieldIcon}
              />
              <input
                type="text"
                name="email"
                className={styles.formInputField}
                placeholder="Update Email"
                value={value.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <img
                src={lockIcon}
                alt="form-bot"
                className={styles.inputFieldIcon}
              />
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                className={styles.formInputField}
                placeholder="Old password"
                autoComplete="true"
                value={value.oldPassword}
                onChange={handleInputChange}
              />
              <img
                src={eyeIcon}
                alt="form-bot"
                className={styles.eyeIcon}
                onClick={() => togglePasswordVisibility("old")}
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <img
                src={lockIcon}
                alt="form-bot"
                className={styles.inputFieldIcon}
              />
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                className={styles.formInputField}
                placeholder="New password"
                autoComplete="true"
                value={value.newPassword}
                onChange={handleInputChange}
              />
              <img
                src={eyeIcon}
                alt="form-bot"
                className={styles.eyeIcon}
                onClick={() => togglePasswordVisibility("new")}
              />
            </div>
          </div>
          <div
            className={styles.formUpdateButtonContainer}
            onClick={handleUpdateClick}
          >
            <span className={styles.updateButton}>Update</span>
          </div>
        </form>
      </div>
      <div
        className={styles.logoutButtonContainer}
        onClick={handleLogOutClickEvent}
      >
        <img src={logoutIcon} alt="form-bot" className={styles.logoutIcon} />
        <span className={styles.logoutText}>Logout</span>
      </div>
      <div
        className={styles.backButtonContainer}
        onClick={handleBackButtonClick}
      >
        <img src={backArrowIcon} alt="form-bot" className={styles.backIcon} />
      </div>
    </div>
  );
};

export default SettingsPage;
