import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

// API Functions
import { RegisterUser } from "../../api/UserAuth";

// Components
import { PrimaryButton, promiseToast, InputField } from "../../components";

// Icons & Images
import {
  backArrowIcon,
  ellipse1Icon,
  ellipse2Icon,
  polygonIcon,
} from "../../assets/icons/index";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let inputError = {};

    if (!formData.username) inputError.username = "Please, enter a username";
    if (!formData.email) {
      inputError.email = "Please, enter an email";
    } else if (!emailRegex.test(formData.email)) {
      inputError.email = "Please, enter a valid email address";
    }
    if (!formData.password) inputError.password = "Please, enter a password";
    if (!formData.confirmPassword) {
      inputError.confirmPassword = "Please, confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      inputError.confirmPassword = "Passwords do not match";
    }

    return inputError;
  };

  const handleSignUpButtonClick = (e) => {
    e.preventDefault();

    const inputError = validateForm();

    if (Object.keys(inputError).length > 0) {
      setErrors(inputError);
    } else {
      setErrors({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      const registerUserPromise = RegisterUser(formData)
        .then((response) => {
          if (!response.success) throw response.message;

          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          navigate("/login");

          return response;
        })
        .catch((error) => {
          throw error;
        });

      promiseToast(registerUserPromise, {
        pending: "Please wait while we complete your registration",
        success: "User registered successfully! You can now log in.",
      });
    }
  };

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.signUpFormContainer}>
        <form className={styles.signUpForm}>
          <InputField
            type="text"
            placeholder="Enter a username"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
            errorMessage={errors.username}
          />
          <InputField
            type="text"
            placeholder="Enter your email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            errorMessage={errors.email}
          />
          <InputField
            type="password"
            placeholder="Enter your password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            errorMessage={errors.password}
          />
          <InputField
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            errorMessage={errors.confirmPassword}
          />
          <PrimaryButton
            customClass={styles.signUpButton}
            onClick={handleSignUpButtonClick}
          >
            Sign Up
          </PrimaryButton>
        </form>
        <span className={styles.loginLink}>
          Already have an account? <a href="/login">Login</a>
        </span>
      </div>
      <img className={styles.polygonIcon} src={polygonIcon} alt="form-bot" />
      <img className={styles.ellipse1Icon} src={ellipse1Icon} alt="form-bot" />
      <img className={styles.ellipse2Icon} src={ellipse2Icon} alt="form-bot" />
      <img
        className={styles.backArrowIcon}
        src={backArrowIcon}
        alt="form-bot"
        onClick={handleBackButtonClick}
      />
    </div>
  );
};

export default RegisterPage;
