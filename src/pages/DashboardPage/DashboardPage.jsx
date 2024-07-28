import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DashboardPage.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { nanoid } from "nanoid";

// API Functions
import { getFolders, createFolder, deleteFolder } from "../../api/Folder";
import { getForms, deleteForm } from "../../api/Form";

// Contexts
import { UserContext } from "../../contexts/UserContext";

// Components
import { ModelDialog } from "../../components";

// Icons & Images
import {
  dropDownIcon,
  createFolderIcon,
  deleteIcon,
  plusIcon,
} from "../../assets/icons/";

const FolderSkeleton = () => (
  <div className={styles.FolderCard}>
    <SkeletonTheme baseColor="#2a2a2d" highlightColor="#444">
      <Skeleton width={100} height={20} />
      <Skeleton width={20} height={20} />
    </SkeletonTheme>
  </div>
);

const FormSkeleton = () => (
  <div className={styles.formCard}>
    <SkeletonTheme baseColor="#8b8b8d" highlightColor="#bfbfbf">
      <Skeleton width={175} height={20} />
      <Skeleton
        width={20}
        height={20}
        containerClassName={styles.cardDeleteIcon}
      />
    </SkeletonTheme>
  </div>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState({
    createFolderModel: false,
    deleteModel: false,
  });
  const [folderName, setFolderName] = useState("");
  const [deleteModelOrigin, setDeleteModelOrigin] = useState("folder");
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [folderToDelete, setFolderToDelete] = useState("");
  const [formToDelete, setFormToDelete] = useState("");
  const [folderId, setFolderId] = useState("");

  const handleDropDownClickEvent = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const handleLogOutClickEvent = () => {
    logout();
  };

  const handleModelOpen = useCallback((type) => {
    setIsModelOpen((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  }, []);

  const handleDelete = (origin, id) => {
    setDeleteModelOrigin(origin);
    if (origin === "form") {
      setFormToDelete(id);
    } else if (origin === "folder") {
      setFolderToDelete(id);
    }
    handleModelOpen("deleteModel");
  };

  const handleOnChangeEvent = (e) => {
    const { value } = e.target;
    setFolderName(value);
  };

  const getModelDialogProps = () => {
    if (isModelOpen.createFolderModel) {
      return {
        isModelOpen: isModelOpen.createFolderModel,
        onConfirmClick: () => handleConfirmButtonClick(),
        onCancelClick: () => handleModelOpen("createFolderModel"),
        confirmButtonText: "Done",
        showInput: true,
        inputPlaceholder: "Enter folder name",
        inputValue: folderName,
        onChange: handleOnChangeEvent,
      };
    }
    if (isModelOpen.deleteModel) {
      return {
        isModelOpen: isModelOpen.deleteModel,
        onConfirmClick: () => handleConfirmButtonClick(),
        onCancelClick: () => handleModelOpen("deleteModel"),
        modelText: `Are you sure you want to delete this ${deleteModelOrigin}?`,
        confirmButtonText: "Confirm",
        showInput: false,
      };
    }
    return {};
  };

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const response = await getFolders();
      setFolders(response.folders || []);
    } catch (error) {
      setFolders([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const fetchForms = async () => {
    setLoading(true);
    try {
      const response = await getForms(folderId);
      setForms(response.forms || []);
    } catch (error) {
      setForms([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const createNewFolder = async () => {
    try {
      handleModelOpen("createFolderModel");
      setLoading(true);
      await createFolder({ folderName });
      setFolderName("");
      fetchFolders();
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const deleteFolderById = async (folderId) => {
    try {
      setLoading(true);
      await deleteFolder(folderId);
      fetchFolders();
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const deleteFormById = async (formId) => {
    try {
      setLoading(true);
      await deleteForm(formId);
      fetchForms();
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleConfirmButtonClick = async () => {
    if (isModelOpen.createFolderModel) {
      await createNewFolder();
    } else if (isModelOpen.deleteModel) {
      if (deleteModelOrigin === "folder") {
        await deleteFolderById(folderToDelete);
      } else if (deleteModelOrigin === "form") {
        await deleteFormById(formToDelete);
      }
      handleModelOpen("deleteModel");
    }
  };

  const handleFolderCardClick = (id) => {
    setFolderId((prevId) => (prevId === id ? "" : id));
  };

  const handleFormCreateClick = () => {
    localStorage.setItem("formId", "");
    localStorage.setItem("formName", "");
    localStorage.setItem("formTheme", "");
    navigate(`/form-builder/${folderId ? `${folderId}/` : folderId}flow`);
  };

  const handleFormClick = (formId, formName, formTheme) => {
    localStorage.setItem("formId", formId);
    localStorage.setItem("formName", formName);
    localStorage.setItem("formTheme", formTheme);
    navigate(`/form-builder/${folderId ? `${folderId}/` : folderId}flow`, {
      state: { formId, formName, formTheme },
    });
  };

  const handleSettingsClickEvent = () => {
    navigate("/settings");
  };

  useEffect(() => {
    fetchFolders();
    fetchForms();
  }, [folderId]);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.headerSection}>
          <div
            className={
              isMenuExpanded
                ? `${styles.moreOptionMenuContainer} ${styles.menuMinHeight}`
                : styles.moreOptionMenuContainer
            }
          >
            <div className={styles.moreOptionsMenu}>
              <div
                className={
                  isMenuExpanded
                    ? `${styles.workspaceAndIcon} ${styles.backgroundColor}`
                    : styles.workspaceAndIcon
                }
                onClick={handleDropDownClickEvent}
              >
                <span className={styles.workspaceText}>
                  {user ? user.username : null}'s workspace
                </span>
                <span
                  className={
                    isMenuExpanded
                      ? `${styles.moreOptionIcon} ${styles.collapseMenuIcon}`
                      : styles.moreOptionIcon
                  }
                >
                  <img src={dropDownIcon} alt="form-bot" />
                </span>
              </div>
              <div
                className={
                  isMenuExpanded
                    ? `${styles.otherMenuOptions} ${styles.showOtherMenuOptions} ${styles.backgroundColor}`
                    : styles.otherMenuOptions
                }
                onClick={handleSettingsClickEvent}
              >
                <span className={styles.workspaceText}>Settings</span>
              </div>
              <div
                className={
                  isMenuExpanded
                    ? `${styles.otherMenuOptions} ${styles.showOtherMenuOptions} ${styles.backgroundColor}`
                    : styles.otherMenuOptions
                }
                style={{
                  borderBottomRightRadius: "6px",
                  borderBottomLeftRadius: "6px",
                }}
                onClick={handleLogOutClickEvent}
              >
                <span
                  className={styles.workspaceText}
                  style={{ color: "#FFA54C" }}
                >
                  Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardSection}>
          <div className={styles.formBotContainer}>
            <div className={styles.folderContainer}>
              <div
                className={styles.createFolderCard}
                onClick={() => handleModelOpen("createFolderModel")}
              >
                <img
                  src={createFolderIcon}
                  className={styles.createFolderIcon}
                  alt="form-bot"
                />
                <span className={styles.createFolderText}>Create a folder</span>
              </div>
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <FolderSkeleton key={index} />
                  ))
                : folders.map((folder) => (
                    <div
                      className={
                        folder._id === folderId
                          ? `${styles.FolderCard} ${styles.selectedFolder}`
                          : styles.FolderCard
                      }
                      key={nanoid()}
                      onClick={() => handleFolderCardClick(folder._id)}
                    >
                      <span className={styles.createFolderText}>
                        {folder.name}
                      </span>
                      <img
                        src={deleteIcon}
                        className={styles.createFolderIcon}
                        alt="form-bot"
                        onClick={() => handleDelete("folder", folder._id)}
                      />
                    </div>
                  ))}
            </div>
            <div className={styles.formsContainer}>
              <div
                className={`${styles.formCard} ${styles.createFormCard}`}
                onClick={handleFormCreateClick}
              >
                <div className={styles.createFormCardTextAndIcon}>
                  <img
                    src={plusIcon}
                    alt="form-bot"
                    className={styles.formCardIcon}
                  />
                  <span className={styles.formCardText}>Create a formbot</span>
                </div>
              </div>
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <FormSkeleton key={index} />
                  ))
                : forms.map((form) => (
                    <div className={styles.formCard} key={nanoid()}>
                      <img
                        src={deleteIcon}
                        alt="form-bot"
                        className={styles.cardDeleteIcon}
                        onClick={() => handleDelete("form", form._id)}
                      />
                      <span
                        className={`${styles.formCardText} ${styles.existingFormCardText}`}
                        onClick={() =>
                          handleFormClick(form._id, form.name, form.theme)
                        }
                      >
                        {form.name}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <ModelDialog {...getModelDialogProps()} />
      </div>
    </>
  );
};

export default DashboardPage;
