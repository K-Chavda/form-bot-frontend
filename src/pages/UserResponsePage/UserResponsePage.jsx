import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserResponsePage.module.css";
import { nanoid } from "nanoid";
import ReactPlayer from "react-player";
import { Oval } from "react-loader-spinner";

// API Functions
import {
  getFormFields,
  increaseViewCount,
  increaseStartCount,
  increaseCompletedCount,
  addUserResponse,
  getSingleForm,
} from "../../api/Form";

// Icons & Images
import { profileThemeIcon, sendIcon } from "../../assets/icons";

const UserResponsePage = () => {
  const { formId } = useParams();
  const browserDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(browserDarkTheme ? "dark" : "light");
  const [dateInput, setDateInput] = useState("Select a date");
  const [value, setValue] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [currentSeq, setCurrentSeq] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [startIsIncreased, setStartIsIncreased] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [uniqueKey, setUniqueKey] = useState("");

  useEffect(() => {
    if (!uniqueKey) setUniqueKey(nanoid());
  }, []);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleVideoReady = () => {
    setVideoLoading(false);
  };

  useEffect(() => {
    switch (theme) {
      case "light":
        document.documentElement.style.setProperty("--scrollbar-thumb-color", "#E6E6E6");
        document.documentElement.style.setProperty("--scrollbar-thumb-hover-color", "#B1B1B1");
        document.documentElement.style.setProperty("--scrollbar-track-color", "#ffffff");
        break;
      case "dark":
        document.documentElement.style.setProperty("--scrollbar-thumb-color", "#696969");
        document.documentElement.style.setProperty("--scrollbar-thumb-hover-color", "#9C9C9C");
        document.documentElement.style.setProperty("--scrollbar-track-color", "#171923");
        break;
      case "teal":
        document.documentElement.style.setProperty("--scrollbar-thumb-color", "#7ab0bb");
        document.documentElement.style.setProperty("--scrollbar-thumb-hover-color", "#3a6a76");
        document.documentElement.style.setProperty("--scrollbar-track-color", "#518c9b");
        break;

      default:
        break;
    }
  }, [theme]);

  const getThemeClass = (theme) => {
    return styles[`${theme}Theme`];
  };

  const handleDateChange = (event) => {
    const { value, name } = event.target;
    const date = new Date(value);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    if (isNaN(date.getTime())) {
      document.documentElement.style.setProperty("--placeholder-color", "#847f7f");
      setDateInput("Select a date");
      setValue((prevState) => ({
        ...prevState,
        [name]: {
          value: "",
          state: "pending",
        },
      }));
      return;
    }

    document.documentElement.style.setProperty("--placeholder-color", "#000000");
    setDateInput(`${day}/${month}/${year}`);
    setValue((prevState) => ({
      ...prevState,
      [name]: {
        value: value,
      },
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: {
        value,
      },
    }));
  };

  const changeInputFieldState = async (name, type = "") => {
    if (value[name]?.value) {
      setValue((prevState) => ({
        ...prevState,
        [name]: {
          value: value[name]?.value,
          state: "completed",
        },
      }));

      if (type === "date") document.documentElement.style.setProperty("--date-field-background-color", "#777777");
      document.documentElement.style.setProperty("--placeholder-color", "#ffffff");
      setCurrentSeq(currentSeq + 1);
      if (!startIsIncreased) {
        increaseStart();
        setStartIsIncreased(true);
      }

      checkAndIncreaseComplete(); // Check and increase completion if needed

      // await addUserResponse(formId, currentSeq, value[name]?.value, uniqueKey);
      addUserResponseFuntion(currentSeq, value[name]?.value);
    } else {
      setValue((prevState) => ({
        ...prevState,
        [name]: {
          value: value[name]?.value,
          state: "pending",
        },
      }));
    }
  };

  const handleInputButtonClick = async (event) => {
    const { name, innerText } = event.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: {
        value: innerText,
        state: "completed",
      },
    }));
    setCurrentSeq(currentSeq + 1);

    if (!startIsIncreased) {
      increaseStart();
      setStartIsIncreased(true);
    }

    checkAndIncreaseComplete();
    addUserResponseFuntion(currentSeq, innerText);
  };

  const handleRatingButtonClick = (name, value) => {
    setValue((prevState) => ({
      ...prevState,
      [name]: {
        value: value,
        state: "pending",
      },
    }));
  };

  const handleSubmit = (name) => {
    changeInputFieldState(name);
  };

  const getInputElement = (type, name, label = "") => {
    switch (type) {
      case "button":
        return (
          <button
            className={
              value[name]?.state === "completed"
                ? `${styles.inputElementButton} ${styles.inputElementButtonReadOnly}`
                : styles.inputElementButton
            }
            onClick={handleInputButtonClick}
            name={name}
          >
            {label}
          </button>
        );
      case "input_text":
        return (
          <>
            <input
              type="text"
              className={
                value[name]?.state === "completed"
                  ? `${styles.inputElement} ${styles.inputElementReadOnly}`
                  : styles.inputElement
              }
              placeholder="Enter your text"
              name={name}
              value={value[name]?.value || ""}
              onChange={handleInputChange}
            />
            <div
              className={
                value[name]?.state === "completed"
                  ? `${styles.sendButtonContainer} ${styles.sendButtonContainerReadOnly}`
                  : styles.sendButtonContainer
              }
              onClick={() => {
                handleSubmit(name);
              }}
            >
              <img src={sendIcon} alt="form-bot" className={styles.sendButton} />
            </div>
          </>
        );
      case "rating":
        return (
          <>
            <div
              className={
                value[name]?.state === "completed"
                  ? `${styles.inputElementRating} ${styles.inputElementRatingReadOnly}`
                  : styles.inputElementRating
              }
            >
              {[1, 2, 3, 4, 5].map((index) => (
                <span
                  key={index}
                  name={name}
                  className={
                    value[name]?.value === index
                      ? `${styles.ratingIcon} ${styles.ratingIconSelected}`
                      : styles.ratingIcon
                  }
                  onClick={() => {
                    handleRatingButtonClick(name, index);
                  }}
                >
                  {index}
                </span>
              ))}
            </div>
            <div
              className={
                value[name]?.state === "completed"
                  ? `${styles.sendButtonContainer} ${styles.sendButtonContainerReadOnly}`
                  : styles.sendButtonContainer
              }
              onClick={() => {
                handleSubmit(name);
              }}
            >
              <img src={sendIcon} alt="form-bot" className={styles.sendButton} />
            </div>
          </>
        );
      case "date":
        return (
          <>
            <input
              type="date"
              className={
                value[name]?.state === "completed"
                  ? `${styles.inputElement} ${styles.inputElementReadOnly}`
                  : styles.inputElement
              }
              placeholder={dateInput}
              name={name}
              value={value[name]?.value || ""}
              onChange={handleDateChange}
            />
            <div
              className={
                value[name]?.state === "completed"
                  ? `${styles.sendButtonContainer} ${styles.sendButtonContainerReadOnly}`
                  : styles.sendButtonContainer
              }
              onClick={() => {
                changeInputFieldState(name, "date");
              }}
            >
              <img src={sendIcon} alt="form-bot" className={styles.sendButton} />
            </div>
          </>
        );
      case "number":
        return (
          <>
            <input
              type="number"
              className={
                value[name]?.state === "completed"
                  ? `${styles.inputElement} ${styles.inputElementReadOnly}`
                  : styles.inputElement
              }
              placeholder="Enter a number"
              name={name}
              value={value[name]?.value || ""}
              onChange={handleInputChange}
            />
            <div
              className={
                value[name]?.state === "completed"
                  ? `${styles.sendButtonContainer} ${styles.sendButtonContainerReadOnly}`
                  : styles.sendButtonContainer
              }
              onClick={() => {
                handleSubmit(name);
              }}
            >
              <img src={sendIcon} alt="form-bot" className={styles.sendButton} />
            </div>
          </>
        );
      case "email":
        return (
          <>
            <input
              type="email"
              className={
                value[name]?.state === "completed"
                  ? `${styles.inputElement} ${styles.inputElementReadOnly}`
                  : styles.inputElement
              }
              placeholder="Enter your email"
              name={name}
              value={value[name]?.value || ""}
              onChange={handleInputChange}
            />
            <div
              className={
                value[name]?.state === "completed"
                  ? `${styles.sendButtonContainer} ${styles.sendButtonContainerReadOnly}`
                  : styles.sendButtonContainer
              }
              onClick={() => {
                handleSubmit(name);
              }}
            >
              <img src={sendIcon} alt="form-bot" className={styles.sendButton} />
            </div>
          </>
        );
      case "phone":
        return (
          <>
            <input
              type="tel"
              className={
                value[name]?.state === "completed"
                  ? `${styles.inputElement} ${styles.inputElementReadOnly}`
                  : styles.inputElement
              }
              placeholder="Enter your phone"
              name={name}
              value={value[name]?.value || ""}
              onChange={handleInputChange}
            />
            <div
              className={
                value[name]?.state === "completed"
                  ? `${styles.sendButtonContainer} ${styles.sendButtonContainerReadOnly}`
                  : styles.sendButtonContainer
              }
              onClick={() => {
                handleSubmit(name);
              }}
            >
              <img src={sendIcon} alt="form-bot" className={styles.sendButton} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const fetchFormFieldData = async () => {
    try {
      const response = await getFormFields(formId);

      setFormFields(response.formFields);
    } catch (error) {
      console.error("Error fetching form fields:", error);
    }
  };

  const fetchFormData = async () => {
    try {
      const response = await getSingleForm(formId);

      setTheme(response.form?.theme);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  useEffect(() => {
    fetchFormFieldData();
    fetchFormData();
  }, []);

  useEffect(() => {
    if (formFields.length > 0) {
      const nextField = formFields.find((field) => field.seq === currentSeq);
      if (nextField && nextField.elementType === "bubble") {
        setCurrentSeq(currentSeq + 1);
        checkAndIncreaseComplete();
      }
    }
  }, [currentSeq, formFields]);

  useEffect(() => {
    increaseView();
  }, []);

  const increaseView = async () => {
    await increaseViewCount(formId);
  };

  const increaseStart = async () => {
    await increaseStartCount(formId);
  };

  const increaseComplete = async () => {
    await increaseCompletedCount(formId);
    setCompleted(true); // Mark as completed
  };

  const checkAndIncreaseComplete = () => {
    const isLastElement = currentSeq >= Math.max(...formFields.map((field) => field.seq));

    if (isLastElement && !completed) {
      increaseComplete();
    }
  };

  const addUserResponseFuntion = async (seq, value) => {
    await addUserResponse(formId, seq, value, uniqueKey);
  };

  const sortedFormFields =
    formFields && formFields.length > 0 && formFields.sort((a, b) => a.seq - b.seq).filter((field) => field.seq !== 0);

  return (
    <div className={`${styles.mainContainer} ${getThemeClass(theme)}`}>
      <div className={`${styles.formBotChatContainer} ${getThemeClass(theme)}`}>
        {sortedFormFields.length > 0 &&
          sortedFormFields.map((field, index) => {
            const inputName = `${field.elementType}-${index}`;
            if (field.seq <= currentSeq && field.elementType === "bubble") {
              return (
                <div className={styles.bubbleElementContainer} key={inputName}>
                  <img src={profileThemeIcon} alt="form-bot" className={styles.bubbleElementIcon} />
                  {field.type === "bubble_text" ? (
                    <span className={styles.bubbleElement}>{field.fieldValue}</span>
                  ) : field.type === "gif" || field.type === "image" ? (
                    <div className={styles.bubbleImageContainer}>
                      {imageLoading ? (
                        <Oval
                          visible={true}
                          height="60"
                          width="60"
                          color="rgb(5, 62, 196)"
                          ariaLabel="oval-loading"
                          strokeWidth={4}
                          secondaryColor="aliceblue"
                        />
                      ) : null}
                      <img
                        src={field.fieldValue}
                        alt="form-bot"
                        className={styles.bubbleImage}
                        onLoad={handleImageLoad}
                      />
                    </div>
                  ) : field.type === "video" ? (
                    <div className={styles.bubbleVideoContainer}>
                      {videoLoading ? (
                        <Oval
                          visible={true}
                          height="60"
                          width="60"
                          color="rgb(5, 62, 196)"
                          ariaLabel="oval-loading"
                          strokeWidth={3}
                          secondaryColor="aliceblue"
                        />
                      ) : null}
                      <ReactPlayer url={field.fieldValue} height="100%" width="100%" onReady={handleVideoReady} />
                    </div>
                  ) : null}
                </div>
              );
            } else if (field.seq <= currentSeq && field.elementType === "input") {
              return (
                <div className={styles.inputElementContainer} key={inputName}>
                  {getInputElement(field.type, inputName, field.fieldValue)}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default UserResponsePage;
