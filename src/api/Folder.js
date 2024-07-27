import axios from "axios";
import { BASE_URI } from "../utils/constants";
import { showToast } from "../components/Toast/Toast";

const getFolders = async () => {
  try {
    const response = await axios.get(
      `${BASE_URI}/folder/`,

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

const createFolder = async ({ folderName }) => {
  try {
    const response = await axios.post(
      `${BASE_URI}/folder/`,
      {
        name: folderName,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const deleteFolder = async (folderId) => {
  try {
    const response = await axios.delete(`${BASE_URI}/folder/${folderId}`, {
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

export { getFolders, createFolder, deleteFolder };
