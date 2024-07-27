import React from "react";
import styles from "./ThemePage.module.css";
import { useOutletContext } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { nanoid } from "nanoid";

// Constants
import { THEME_OPTIONS } from "../../../utils/constants";

// Icons & Images
import { profileThemeIcon } from "../../../assets/icons";

const ThemePage = () => {
  const { theme, updateFormTheme } = useOutletContext();

  const getSkeletonClass = (themeOption, type) => {
    const baseClass = styles[`${type}Skeleton`];
    const themeClass = {
      light: styles[`${type}SkeletonLightTheme`],
      dark: styles[`${type}SkeletonDarkTheme`],
      teal: styles[`${type}SkeletonTealTheme`],
    }[themeOption.toLowerCase()];

    return `${baseClass} ${themeClass}`;
  };

  const getCardClass = (themeOption) => {
    switch (themeOption.toLowerCase()) {
      case "light":
        return styles.lightThemeCard;
      case "dark":
        return styles.darkThemeCard;
      case "teal":
        return styles.tealThemeCard;
      default:
        return null;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.themeOptionsContainer}>
        <div className={styles.themeHeadingTextContainer}>
          <span className={styles.themeHeadingText}>Customize the theme</span>
        </div>
        <div className={styles.themeOptionsCardsContainer}>
          {THEME_OPTIONS &&
            THEME_OPTIONS.length > 0 &&
            THEME_OPTIONS.map((themeOption) => (
              <div
                className={
                  themeOption.toLowerCase() === theme
                    ? `${styles.themeOptionsCard} ${styles.selectedThemeCard}`
                    : styles.themeOptionsCard
                }
                key={nanoid()}
                onClick={() => {
                  updateFormTheme(themeOption.toLowerCase());
                }}
              >
                <div
                  className={`${
                    styles.themeCardSkeletonContainer
                  } ${getCardClass(themeOption)}`}
                >
                  <div className={styles.themeCardSkeleton}>
                    <div className={styles.bubbleTextSkeletonContainer}>
                      <img
                        src={profileThemeIcon}
                        alt="form-bot"
                        className={styles.profileIcon}
                      />
                      <Skeleton
                        width={100}
                        enableAnimation={false}
                        className={getSkeletonClass(themeOption, "bubbleText")}
                      />
                    </div>
                    <div className={styles.inputTextSkeletonContainer}>
                      <Skeleton
                        width={120}
                        enableAnimation={false}
                        className={getSkeletonClass(themeOption, "inputText")}
                      />
                    </div>
                    <div className={styles.bubbleTextSkeletonContainer}>
                      <img
                        src={profileThemeIcon}
                        alt="form-bot"
                        className={styles.profileIcon}
                      />
                      <Skeleton
                        width={100}
                        enableAnimation={false}
                        className={getSkeletonClass(themeOption, "bubbleText")}
                      />
                    </div>
                    <div className={styles.inputTextSkeletonContainer}>
                      <Skeleton
                        width={35}
                        enableAnimation={false}
                        className={getSkeletonClass(themeOption, "button")}
                      />
                      <Skeleton
                        width={35}
                        enableAnimation={false}
                        className={getSkeletonClass(themeOption, "button")}
                      />
                      <Skeleton
                        width={35}
                        enableAnimation={false}
                        className={getSkeletonClass(themeOption, "button")}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.themeCardTextContainer}>
                  <span className={styles.themeCardText}>{themeOption}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={`${styles.themePreviewContainer} ${getCardClass(theme)}`}>
        <div className={styles.previewProfileIconTextContainer}>
          <div className={styles.previewProfileIconContainer}>
            <img
              src={profileThemeIcon}
              alt="form-bot"
              className={styles.previewProfileIcon}
            />
          </div>
          <span
            className={`${styles.previewBubbleMessageText} ${getSkeletonClass(
              theme,
              "bubbleText"
            )}`}
          >
            Hello
          </span>
        </div>
        <div className={styles.previewInputTextContainer}>
          <span className={styles.previewInputText}>Hi</span>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
