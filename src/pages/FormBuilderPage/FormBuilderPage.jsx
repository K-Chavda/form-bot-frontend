import React, { useEffect, useState } from "react";
import styles from "./FormBuilderPage.module.css";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  NavLink,
} from "react-router-dom";
import { nanoid } from "nanoid";

// API Functions
import {
  createForm,
  getFormFields,
  createFormFields,
  updateForm,
} from "../../api/Form";

// Constants
import { BUBBLE_TYPES, INPUT_TYPES, BASE_URI } from "../../utils/constants";

// Components
import { promiseToast, showToast } from "../../components";

// Icons & Images
import {
  buttonIcon,
  closeIcon,
  deleteIcon,
  flagIcon,
  messageIcon,
  checkBlueIcon,
} from "../../assets/icons";

const FormBuilderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [formName, setFormName] = useState(
    location.state?.formName || localStorage.getItem("formName") || ""
  );
  const [formId, setFormId] = useState(
    location.state?.formId || localStorage.getItem("formId") || ""
  );
  const [formNameError, setFormNameError] = useState("");
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "flow"
  );
  const [theme, setTheme] = useState(
    location.state?.formTheme || localStorage.getItem("formTheme") || "light"
  );
  const [isShared, setIsShared] = useState(false);
  const [isSaved, setIsSaved] = useState(!!formName || false);
  const [isLoading, setIsLoading] = useState(true);
  const [formFields, setFormFields] = useState([
    {
      _id: nanoid(),
      seq: 0,
      elementType: "start",
      type: "start",
      displayValue: "Start",
      fieldValue: "",
      error: "",
    },
  ]);

  useEffect(() => {
    if (location.state?.formId || formId) fetchFormFields();
  }, [location.state?.formId]);

  const fetchFormFields = async () => {
    try {
      const formFieldsData = await getFormFields(formId);

      const updatedFields =
        formFieldsData.formFields &&
        formFieldsData.formFields.map((field) => ({
          _id: field._id,
          seq: field.seq,
          elementType: field.elementType,
          type: field.type,
          displayValue: field.displayValue || "",
          fieldValue: field.fieldValue || "",
          error: "",
        }));

      setFormFields(updatedFields);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching form fields:", error);
    }
  };

  const handleShareButtonClick = async () => {
    await navigator.clipboard.writeText(
      `${origin}/form/${formId}/user-response`
    );

    setIsShared(true);

    setTimeout(() => {
      setIsShared(false);
    }, 2000);
  };

  const handleSaveButtonClick = async () => {
    let hasError = false;

    // Validate form name
    if (!formName) {
      setFormNameError("Please enter form name");
      hasError = true;
    } else {
      hasError = false;
      setFormNameError("");
    }

    // Validate form fields and update state
    const updatedFormFields = formFields.map((formField) => {
      if (
        (!formField.fieldValue.trim() && formField.elementType === "bubble") ||
        (formField.elementType === "input" &&
          formField.type === "button" &&
          !formField.fieldValue.trim())
      ) {
        hasError = true;
        return { ...formField, error: "Required field" };
      }
      return { ...formField, error: "" };
    });

    setFormFields(updatedFormFields);

    if (formName && !hasError) {
      try {
        // Wait for createForm to complete
        const response = await createForm(folderId, formName, "light");

        if (!formId) {
          localStorage.setItem("formId", response.data?._id);
          localStorage.setItem("formName", response.data?.name);
          setFormId(response.data?._id);
        }

        // Transform formFields for createFormFields API call
        const transformFormFields = (fields) => {
          return fields.map((field) => ({
            seq: field.seq,
            elementType: field.elementType,
            type: field.type,
            displayValue: field.displayValue,
            fieldValue: field.fieldValue,
          }));
        };

        const transformedFields = transformFormFields(formFields);

        // Wait for createFormFields to complete
        await createFormFields(
          transformedFields,
          localStorage.getItem("formId") || formId
        );

        promiseToast(
          Promise.resolve(), // No need for Promise.all here since we are awaiting both promises sequentially
          {
            pending: "Saving Form Details...",
            success: "Form saved successfully!",
            error: "Failed to save form details.",
          }
        );

        updateFormDetails();
        setIsSaved(true);
      } catch (error) {
        showToast({
          message: "Failed to save form details.",
          type: "error",
        });
        console.error(error);
      }
    }
  };

  const handleCloseButtonClick = () => {
    navigate("/dashboard");
  };

  const handleOnChangeEvent = (e) => {
    const { value } = e.target;

    setFormName(value);
    setFormNameError("");
  };

  const updateFormDetails = async () => {
    try {
      await updateForm(formId, formName, theme);
    } catch (error) {
      showToast({
        message: "Failed to update form details.",
        type: "error",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (formId) updateFormDetails();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [formName]);

  const handleFormFieldElementClickEvent = (
    type,
    elementType,
    displayValue
  ) => {
    const maxSeq = formFields.sort((a, b) => b.seq - a.seq);
    const getExistingElementCountByType = formFields.filter(
      (field) => field.type === type
    );
    const displayValueByElementType = `${displayValue} ${
      elementType === "input" ? "Field" : ""
    } ${getExistingElementCountByType.length + 1}`;

    setFormFields([
      ...formFields,
      {
        _id: nanoid(),
        elementType,
        seq: maxSeq[0].seq + 1,
        type,
        displayValue: displayValueByElementType,
        fieldValue: "",
      },
    ]);
  };

  const handleInputFieldOnChangeEvent = (id, value) => {
    const updatedFormFields = formFields.map((field) =>
      field._id === id ? { ...field, fieldValue: value, error: "" } : field
    );
    setFormFields(updatedFormFields);
  };

  const handleFormFieldDeleteButtonClickEvent = (id) => {
    setFormFields(formFields.filter((field) => field._id !== id));
  };

  const updatFormFieldsSeq = () => {
    formFields.forEach((field, index) => {
      if (index > 0) {
        if (field.seq - formFields[index - 1].seq > 1) {
          field.seq = formFields[index - 1].seq + 1;
        }
      }
    });
  };

  useEffect(() => {
    updatFormFieldsSeq();
  }, [formFields]);

  const updateFormTheme = (formTheme) => {
    setTheme(formTheme);
    localStorage.setItem("formTheme", formTheme);
  };

  const sortedFormFields =
    formFields &&
    formFields.length > 0 &&
    formFields.sort((a, b) => a.seq - b.seq);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.formBuilderHeaderContainer}>
          <div className={styles.headerFormNameContainer}>
            {activeTab === "flow" ? (
              <input
                className={
                  formNameError
                    ? `${styles.formNameInput} ${styles.formFieldError}`
                    : styles.formNameInput
                }
                type="text"
                name="formName"
                placeholder="Enter form name"
                value={formName}
                onChange={handleOnChangeEvent}
              />
            ) : null}
          </div>
          <div className={styles.headerFormMenuContainer}>
            <div className={styles.formMenuItemsContainer}>
              <NavLink
                to="flow"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.formMenuItems} ${styles.active}`
                    : styles.formMenuItems
                }
                onClick={() => {
                  localStorage.setItem("activeTab", "flow");
                  setActiveTab("flow");
                }}
              >
                Flow
              </NavLink>
              <NavLink
                to="theme"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.formMenuItems} ${styles.active}`
                    : styles.formMenuItems
                }
                onClick={() => {
                  localStorage.setItem("activeTab", "theme");
                  setActiveTab("theme");
                }}
              >
                Theme
              </NavLink>
              <NavLink
                to="response"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.formMenuItems} ${styles.active}`
                    : styles.formMenuItems
                }
                onClick={() => {
                  localStorage.setItem("activeTab", "response");
                  setActiveTab("response");
                }}
              >
                Response
              </NavLink>
            </div>
          </div>
          <div className={styles.headerButtonsContainer}>
            <div className={styles.headerButtons}>
              <button
                className={
                  isSaved
                    ? `${styles.headerButton} ${styles.bgBlue}`
                    : `${styles.headerButton} ${styles.disabled}`
                }
                onClick={isSaved ? handleShareButtonClick : null}
              >
                Share
              </button>
              <button
                className={`${styles.headerButton} ${styles.bgGreen}`}
                onClick={handleSaveButtonClick}
              >
                Save
              </button>
              <img
                src={closeIcon}
                alt="form-bot"
                className={styles.closeButtonIcon}
                onClick={handleCloseButtonClick}
              />
            </div>
          </div>
        </div>
        <Outlet
          context={{
            BUBBLE_TYPES,
            INPUT_TYPES,
            buttonIcon,
            deleteIcon,
            flagIcon,
            messageIcon,
            handleFormFieldElementClickEvent,
            handleInputFieldOnChangeEvent,
            handleFormFieldDeleteButtonClickEvent,
            sortedFormFields,
            theme,
            updateFormTheme,
            formId,
            isShared,
            isLoading,
          }}
        />
        <div
          className={
            isShared
              ? `${styles.shareLinkMessage} ${styles.shareLinkMessageOpacity}`
              : styles.shareLinkMessage
          }
        >
          <img
            src={checkBlueIcon}
            alt="form-bot"
            className={styles.shareLinkCopySuccessIcon}
          />
          <span className={styles.shareLinkCopySuccessText}>Link copied</span>
        </div>
      </div>
    </>
  );
};

export default FormBuilderPage;
