import axios from "axios";
import { BASE_URI } from "../utils/constants";
import { showToast } from "../components/Toast/Toast";

const getForms = async (folderId = "") => {
  try {
    const response = await axios.get(
      `${BASE_URI}/form/all/${folderId}`,

      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response.status === 404) console.log("error");
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const getSingleForm = async (formId) => {
  try {
    const response = await axios.get(`${BASE_URI}/form/single/${formId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 404) console.log("error");
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const createForm = async (folderId = "", formName, theme = "light") => {
  try {
    const response = await axios.post(
      `${BASE_URI}/form/${folderId}`,
      {
        name: formName,
        theme: theme,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

const updateForm = async (formId, name = "", theme = "light") => {
  try {
    const response = await axios.put(
      `${BASE_URI}/form/${formId}`,
      {
        name: name,
        theme: theme,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

const deleteForm = async (folderId) => {
  try {
    const response = await axios.delete(`${BASE_URI}/form/${folderId}`, {
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

const getFormFields = async (formId) => {
  try {
    const response = await axios.get(`${BASE_URI}/form/${formId}/formfields`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

const createFormFields = async (formFields, formId) => {
  try {
    const response = await axios.post(
      `${BASE_URI}/form/${formId}/formfields`,
      {
        formFields,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

const getUserResponses = async (formId) => {
  try {
    const response = await axios.get(
      `${BASE_URI}/form/${formId}/user-responses`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

const increaseViewCount = async (formId) => {
  try {
    const response = await axios.put(`${BASE_URI}/form/${formId}/view`);

    return response.data;
  } catch (error) {
    return error;
  }
};

const increaseStartCount = async (formId) => {
  try {
    const response = await axios.put(`${BASE_URI}/form/${formId}/start`);

    return response.data;
  } catch (error) {
    return error;
  }
};

const increaseCompletedCount = async (formId) => {
  try {
    const response = await axios.put(`${BASE_URI}/form/${formId}/complete`);

    return response.data;
  } catch (error) {
    return error;
  }
};

const addUserResponse = async (formId, seq, userResponse, uniqueKey) => {
  try {
    const response = await axios.post(
      `${BASE_URI}/form/${formId}/user-response`,
      {
        seq,
        response: userResponse,
        uniqueKey: uniqueKey,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export {
  getForms,
  getSingleForm,
  createForm,
  updateForm,
  deleteForm,
  getFormFields,
  createFormFields,
  getUserResponses,
  increaseViewCount,
  increaseStartCount,
  increaseCompletedCount,
  addUserResponse,
};
