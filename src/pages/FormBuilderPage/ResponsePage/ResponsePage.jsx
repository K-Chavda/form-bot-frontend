import React, { useEffect, useState } from "react";
import styles from "./ResponsePage.module.css";
import { useOutletContext } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// API Functions
import { getSingleForm, getUserResponses } from "../../../api/Form";

const ResponsePage = () => {
  const { formId, sortedFormFields } = useOutletContext();
  const [userResponses, setUserResponses] = useState([]);
  const [formDetails, setFormDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (formId) {
      fetchUserResponses();
      fetchFormDetails();
    }
  }, [formId]);

  const fetchUserResponses = async () => {
    try {
      const response = await getUserResponses(formId);

      if (response.success) {
        setUserResponses(response.userResponses);
      }
    } catch (error) {
      setUserResponses([{ response: "", seq: "", _id: "" }]);
    }
  };

  const fetchFormDetails = async () => {
    try {
      const response = await getSingleForm(formId);

      if (response.success) {
        setFormDetails(response.form);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setFormDetails({});
    }
  };

  const getFormatedDate = (date) => {
    const dateObj = new Date(date);

    // Format the date part
    const dateOptions = { month: "short", day: "2-digit" };
    const dateString = dateObj.toLocaleDateString("en-US", dateOptions);

    // Format the time part
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    const timeString = dateObj.toLocaleTimeString("en-US", timeOptions);

    return `${dateString}, ${timeString}`;
  };

  return (
    <div className={styles.mainContainer}>
      {userResponses.length === 0 && !isLoading ? (
        <span className={styles.noResponsesMessage}>
          No Response yet collected
        </span>
      ) : (
        <>
          {isLoading ? (
            <div className={styles.userResponseAnalyticsContainer}>
              <div className={styles.analyticsCard}>
                <SkeletonTheme baseColor="#2a2a2d" highlightColor="#444">
                  <Skeleton width={100} height={30} />
                  <Skeleton width={40} height={30} />
                </SkeletonTheme>
              </div>
              <div className={styles.analyticsCard}>
                <SkeletonTheme baseColor="#2a2a2d" highlightColor="#444">
                  <Skeleton width={100} height={30} />
                  <Skeleton width={40} height={30} />
                </SkeletonTheme>
              </div>
              <div className={styles.analyticsCard}>
                <SkeletonTheme baseColor="#2a2a2d" highlightColor="#444">
                  <Skeleton width={160} height={30} />
                  <Skeleton width={40} height={30} />
                </SkeletonTheme>
              </div>
            </div>
          ) : (
            <div className={styles.userResponseAnalyticsContainer}>
              <div className={styles.analyticsCard}>
                <span className={styles.analutics}>Views</span>
                <span className={styles.analyticsText}>
                  {formDetails.views}
                </span>
              </div>
              <div className={styles.analyticsCard}>
                <span className={styles.analutics}>Starts</span>
                <span className={styles.analyticsText}>
                  {formDetails.start}
                </span>
              </div>
              <div className={styles.analyticsCard}>
                <span className={styles.analutics}>Completion rate</span>
                <span className={styles.analyticsText}>
                  {formDetails.completionRate}
                </span>
              </div>
            </div>
          )}
          {isLoading ? (
            <div className={styles.userResponseDataTableContainer}>
              <table>
                <thead>
                  <tr className={styles.skeletonContainerTHead}>
                    <th>
                      <Skeleton
                        width={100}
                        height={20}
                        baseColor="#2a2a2d"
                        highlightColor="#444"
                        className={styles.srNo}
                      />
                    </th>
                    <th>
                      <Skeleton
                        width={100}
                        height={20}
                        baseColor="#2a2a2d"
                        highlightColor="#444"
                        className={styles.submittedAt}
                      />
                    </th>
                    <th>
                      <Skeleton
                        width={100}
                        height={20}
                        baseColor="#2a2a2d"
                        highlightColor="#444"
                        className={styles.ratingTd}
                      />
                    </th>
                    <th>
                      <Skeleton
                        width={100}
                        height={20}
                        baseColor="#2a2a2d"
                        highlightColor="#444"
                        className={styles.ratingTd}
                      />
                    </th>
                    <th>
                      <Skeleton
                        width={100}
                        height={20}
                        baseColor="#2a2a2d"
                        highlightColor="#444"
                        className={styles.ratingTd}
                      />
                    </th>
                    <th>
                      <Skeleton
                        width={100}
                        height={20}
                        baseColor="#2a2a2d"
                        highlightColor="#444"
                        className={styles.ratingTd}
                      />
                    </th>
                    <th>
                      <Skeleton
                        width={100}
                        height={20}
                        baseColor="#2a2a2d"
                        highlightColor="#444"
                        className={styles.ratingTd}
                      />
                    </th>
                    <th>
                      <Skeleton
                        width={100}
                        height={20}
                        baseColor="#2a2a2d"
                        highlightColor="#444"
                        className={styles.ratingTd}
                      />
                    </th>
                    <th>
                      <Skeleton
                        width={100}
                        height={20}
                        baseColor="#2a2a2d"
                        highlightColor="#444"
                        className={styles.ratingTd}
                      />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          ) : (
            <div className={styles.userResponseDataTableContainer}>
              <table>
                <thead>
                  <tr>
                    <th className={styles.srNo}></th>
                    <th className={styles.submittedAt}>Submitted At</th>
                    {sortedFormFields.map((field) =>
                      field.elementType === "input" ? (
                        <th
                          key={field._id}
                          className={
                            field.type === "rating"
                              ? styles.ratingTd
                              : styles.tdWidth
                          }
                        >
                          {field.displayValue}
                        </th>
                      ) : null
                    )}
                  </tr>
                </thead>
                <tbody>
                  {userResponses.map((response, index) => {
                    return (
                      <tr key={response._id}>
                        <td className={styles.srNo}>{index + 1}</td>
                        <td className={styles.submittedAt}>
                          {getFormatedDate(response.createdAt)}
                        </td>
                        {sortedFormFields.map((field) =>
                          field.elementType === "input" ? (
                            <td
                              key={`${field._id}${response._id}`}
                              className={
                                field.type === "rating"
                                  ? styles.ratingTd
                                  : styles.tdWidth
                              }
                            >
                              {response.formFieldsResponse &&
                                response.formFieldsResponse.map(
                                  (responseValue) => {
                                    return responseValue.seq === field.seq
                                      ? responseValue.response
                                      : "";
                                  }
                                )}
                            </td>
                          ) : null
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResponsePage;
