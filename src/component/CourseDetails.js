import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

//Course details API URL
const url = `https://private-e05942-courses22.apiary-mock.com/courses/`;

const CourseDetails = ({ selectedCourse, setSelectedCourse }) => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    //fetch course details
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${url}${selectedCourse}`);
        setLoading(true);
        setCourseDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    //fetch user currency based on the location using ipgeolocation api
    const fetchGeoLocation = async () => {
      try {
        const userLocation = await axios.get(
          "https://api.ipgeolocation.io/ipgeo?apiKey=895087fe21a14164ac50336f6614bcf9"
        );

        setCurrency(userLocation.data.currency.code);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseDetails();
    fetchGeoLocation();
  }, [selectedCourse]);

  // Convert start dates to more readable format

  const startDates = (courseDetails.start_dates || []).map((date) => {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  const coursePrices = courseDetails.prices || [];

  //logic to handle when course currency is equal to user location currency
  const userPrice = coursePrices.find(
    (price) => price.currency.toLowerCase() === currency.toLowerCase()
  );

  const priceAmount = userPrice ? userPrice.amount : null;

  return (
    <>
      <div className="container__back__button">
        {selectedCourse && (
          <button
            className="back__button"
            onClick={() => setSelectedCourse(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Go back
          </button>
        )}
      </div>
      {loading ? (
        <div className="course__details__container">
          <h3 className="course__description"> {courseDetails.description} </h3>

          <div className="course__start__dates">
            <div className="course__start__dates__text">Next start dates</div>
            <div className="course__start__dates__text__list">
              {startDates.join(" | ")}
            </div>
          </div>

          <div className="course__price">
            <div className="course__price__label__container">
              <div className="course__price__label">Best Value</div>
              <div className="course__price__label">10% off</div>
            </div>
            <h3>
              {currency === "USD" ? "$" : "€"} {priceAmount}
            </h3>
            <hr className="course__price__divider" />
            <h4>Pay upfront</h4>
            <p>
              Get 10% off your tuition when you make a one-time, upfront
              payment.
            </p>
            <button>Enroll Now</button>
          </div>
        </div>
      ) : (
        <div className="course__details__container">
          <h3>Fetching course...</h3>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
