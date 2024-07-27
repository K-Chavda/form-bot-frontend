import axios from "axios";
import { BASE_URI } from "../utils/constants";
import { showToast } from "../components/Toast/Toast";

const RegisterUser = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${BASE_URI}/user/register`, {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const LoginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URI}/user/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const GetUserDetailsById = async () => {
  try {
    const response = await axios.get(`${BASE_URI}/user`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const UpdateUserDetails = async ({
  username,
  email,
  oldPassword,
  newPassword,
}) => {
  try {
    const response = await axios.put(
      `${BASE_URI}/user/`,
      {
        username,
        email,
        oldPassword,
        newPassword,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return response;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

export { RegisterUser, LoginUser, UpdateUserDetails, GetUserDetailsById };
