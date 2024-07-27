import React, { useContext, useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

// Contexts
import { UserContext } from "../../contexts/UserContext";

// API Functions
import { LoginUser } from "../../api/UserAuth";

// Components
import { PrimaryButton, promiseToast, InputField } from "../../components";

// Icons & Images
import {
  backArrowIcon,
  ellipse1Icon,
  ellipse2Icon,
  polygonIcon,
} from "../../assets/icons/index";

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
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

    if (!formData.email) {
      inputError.email = "Please, enter an email";
    } else if (!emailRegex.test(formData.email)) {
      inputError.email = "Please, enter a valid email address";
    }

    if (!formData.password) inputError.password = "Please, enter a password";

    return inputError;
  };

  const handleSignInButtonClick = (e) => {
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

      const loginUserPromise = LoginUser(formData)
        .then((response) => {
          if (!response.success) throw response.message;

          setFormData({
            email: "",
            password: "",
          });

          setUser({
            username: response.userDetails?.username,
            userId: response.userDetails?._id,
          });

          localStorage.setItem("token", response.token);

          navigate("/dashboard");
          return response;
        })
        .catch((error) => {
          throw error;
        });

      promiseToast(loginUserPromise, {
        pending: "Please wait while logging you in...",
        success: "Welcome to FormBot!",
      });
    }
  };

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.signInFormContainer}>
        <form className={styles.signInForm}>
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
          <PrimaryButton
            customClass={styles.signInButton}
            onClick={handleSignInButtonClick}
          >
            Log In
          </PrimaryButton>
        </form>
        <span className={styles.registerLink}>
          Don't have an account? <a href="/register">Register now</a>
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

export default LoginPage;
