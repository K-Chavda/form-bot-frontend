import React, { useEffect, useState } from "react";
import styles from "./FlowPage.module.css";
import { nanoid } from "nanoid";
import { useOutletContext } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Icons & Images
import {
  checkBlueIcon,
  gifIcon,
  imageIcon,
  videoIcon,
} from "../../../assets/icons";

const FlowPage = () => {
  const {
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
    isLoading,
  } = useOutletContext();

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setDataLoaded(true);
      }, 1000); // 1 second delay after loading is complete
    } else {
      setDataLoaded(false);
    }
  }, [isLoading]);

  return (
    <>
      <div className={styles.formBuilderBodyContainer}>
        <div className={styles.formBodyElementsContainer}>
          <div className={styles.formBubbleAndInputElementsContainer}>
            {isLoading ? (
              <div className={styles.elementsContainer}>
                <span className={styles.elementsHeader}>Bubbles</span>
                <div className={styles.elementCardsContainer}>
                  {BUBBLE_TYPES &&
                    BUBBLE_TYPES.length > 0 &&
                    BUBBLE_TYPES.map((element) => {
                      return (
                        <div
                          className={styles.elementCards}
                          key={nanoid()}
                          onClick={() => {
                            handleFormFieldElementClickEvent(
                              element.type,
                              "bubble",
                              element.label
                            );
                          }}
                        >
                          <SkeletonTheme
                            baseColor="#2a2a2d"
                            highlightColor="#444"
                          >
                            <Skeleton width={20} height={20} />
                            <Skeleton width={80} height={20} />
                          </SkeletonTheme>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className={styles.elementsContainer}>
                <span className={styles.elementsHeader}>Bubbles</span>
                <div className={styles.elementCardsContainer}>
                  {BUBBLE_TYPES &&
                    BUBBLE_TYPES.length > 0 &&
                    BUBBLE_TYPES.map((element) => {
                      return (
                        <div
                          className={styles.elementCards}
                          key={nanoid()}
                          onClick={() => {
                            handleFormFieldElementClickEvent(
                              element.type,
                              "bubble",
                              element.label
                            );
                          }}
                        >
                          <img
                            src={element.icon}
                            alt="form-bot"
                            className={styles.elementIcon}
                          />
                          <span className={styles.elementText}>
                            {element.label}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {isLoading ? (
              <div className={styles.elementsContainer}>
                <span className={styles.elementsHeader}>Inputs</span>
                <div className={styles.elementCardsContainer}>
                  {INPUT_TYPES &&
                    INPUT_TYPES.length > 0 &&
                    INPUT_TYPES.map((element) => {
                      return (
                        <div
                          className={styles.elementCards}
                          key={nanoid()}
                          onClick={() => {
                            handleFormFieldElementClickEvent(
                              element.type,
                              "input",
                              element.label
                            );
                          }}
                        >
                          <SkeletonTheme
                            baseColor="#2a2a2d"
                            highlightColor="#444"
                          >
                            <Skeleton width={20} height={20} />
                            <Skeleton width={80} height={20} />
                          </SkeletonTheme>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className={styles.elementsContainer}>
                <span className={styles.elementsHeader}>Inputs</span>
                <div className={styles.elementCardsContainer}>
                  {INPUT_TYPES &&
                    INPUT_TYPES.length > 0 &&
                    INPUT_TYPES.map((element) => {
                      return (
                        <div
                          className={styles.elementCards}
                          key={nanoid()}
                          onClick={() => {
                            handleFormFieldElementClickEvent(
                              element.type,
                              "input",
                              element.label
                            );
                          }}
                        >
                          <img
                            src={element.icon}
                            alt="form-bot"
                            className={styles.elementIcon}
                          />
                          <span className={styles.elementText}>
                            {element.label}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.formBodyFormFieldsContainer}>
          {isLoading || !dataLoaded ? (
            <div className={styles.formFieldsContainer}>
              <div className={styles.formFieldCards}>
                <SkeletonTheme baseColor="#2a2a2d" highlightColor="#444">
                  <Skeleton width={40} height={30} />
                  <Skeleton width={230} height={30} />
                </SkeletonTheme>
              </div>
              <div className={styles.formFieldCards}>
                <div className={styles.formFieldInputContainer}>
                  <SkeletonTheme baseColor="#2a2a2d" highlightColor="#444">
                    <Skeleton width={80} height={30} />
                    <Skeleton width={280} height={30} />
                  </SkeletonTheme>
                </div>
              </div>
              <div className={styles.formFieldCards}>
                <div className={styles.formFieldInputContainer}>
                  <SkeletonTheme baseColor="#2a2a2d" highlightColor="#444">
                    <Skeleton width={80} height={30} />
                    <Skeleton width={280} height={30} />
                  </SkeletonTheme>
                </div>
              </div>
              <div className={styles.formFieldCards}>
                <div className={styles.formFieldInputContainer}>
                  <SkeletonTheme baseColor="#2a2a2d" highlightColor="#444">
                    <Skeleton width={80} height={30} />
                    <Skeleton width={280} height={20} />
                  </SkeletonTheme>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.formFieldsContainer}>
              {sortedFormFields &&
                sortedFormFields.length > 0 &&
                sortedFormFields.map((field) => {
                  return field.elementType === "start" ? (
                    <div className={styles.formFieldCards} key={field._id}>
                      <img
                        src={flagIcon}
                        alt="form-bot"
                        className={styles.formFieldCardIcon}
                      />
                      <span className={styles.formFieldCardText}>
                        {field.displayValue}
                      </span>
                    </div>
                  ) : field.elementType === "bubble" ? (
                    <div className={styles.formFieldCards} key={field._id}>
                      <div className={styles.formFieldInputContainer}>
                        <span className={styles.formFieldCardText}>
                          {field.displayValue}
                        </span>
                        <div className={styles.inputContainer}>
                          <input
                            id="bubbleInput_text"
                            type="text"
                            name="bubble_text_input"
                            className={
                              field.error
                                ? `${styles.formField} ${styles.formFieldError}`
                                : styles.formField
                            }
                            placeholder="Click here to edit"
                            value={field.fieldValue || ""}
                            onChange={(e) =>
                              handleInputFieldOnChangeEvent(
                                field._id,
                                e.target.value
                              )
                            }
                          />
                          <img
                            src={
                              field.type === "bubble_text"
                                ? messageIcon
                                : field.type === "video"
                                ? videoIcon
                                : field.type === "image"
                                ? imageIcon
                                : field.type === "gif"
                                ? gifIcon
                                : null
                            }
                            alt="form-bot"
                            className={styles.inputIcon}
                          />
                          {field.error ? (
                            <p className={styles.error}>Required Field</p>
                          ) : null}
                        </div>
                        <span
                          className={styles.formFieldDeleteIcon}
                          onClick={() => {
                            handleFormFieldDeleteButtonClickEvent(field._id);
                          }}
                        >
                          <img src={deleteIcon} alt="form-bot" />
                        </span>
                      </div>
                    </div>
                  ) : field.elementType === "input" &&
                    field.type === "button" ? (
                    <div className={styles.formFieldCards} key={field._id}>
                      <div className={styles.formFieldInputContainer}>
                        <span className={styles.formFieldCardText}>
                          {field.displayValue}
                        </span>
                        <div className={styles.inputContainer}>
                          <input
                            id="bubbleInput_text"
                            type="text"
                            name="bubble_text_input"
                            className={
                              field.error
                                ? `${styles.formField} ${styles.formFieldError}`
                                : styles.formField
                            }
                            placeholder="Click here to edit"
                            value={field.fieldValue || ""}
                            onChange={(e) =>
                              handleInputFieldOnChangeEvent(
                                field._id,
                                e.target.value
                              )
                            }
                          />
                          <img
                            src={buttonIcon}
                            alt="form-bot"
                            className={styles.inputIcon}
                          />
                          {field.error ? (
                            <p className={styles.error}>Required Field</p>
                          ) : null}
                        </div>
                        <span
                          className={styles.formFieldDeleteIcon}
                          onClick={() => {
                            handleFormFieldDeleteButtonClickEvent(field._id);
                          }}
                        >
                          <img src={deleteIcon} alt="form-bot" />
                        </span>
                      </div>
                    </div>
                  ) : field.elementType === "input" ? (
                    <div className={styles.formFieldCards} key={field._id}>
                      <div className={styles.formFieldInputContainer}>
                        <span className={styles.formFieldCardText}>
                          {field.displayValue}
                        </span>
                        <span className={styles.formFieldHintText}>
                          Hint : User will input a text on his form
                        </span>
                        <span
                          className={styles.formFieldDeleteIcon}
                          onClick={() => {
                            handleFormFieldDeleteButtonClickEvent(field._id);
                          }}
                        >
                          <img src={deleteIcon} alt="form-bot" />
                        </span>
                      </div>
                    </div>
                  ) : null;
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FlowPage;
