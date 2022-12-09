import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

//fetch Course details
const url = `https://private-e05942-courses22.apiary-mock.com/courses/`;

const CourseDetails = ({ selectedCourse, setSelectedCourse }) => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("")

  useEffect(() => {

    //fetch course details
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${url}${selectedCourse}`);
        setCourseDetails(response.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    //fetch user currency based on the location using ipgeolocation api
    const fetchGeoLocation = async () => {
     /*  try {
        const userLocation = await axios.get(
          "https://api.ipgeolocation.io/ipgeo?apiKey=895087fe21a14164ac50336f6614bcf9"
        );

        setCurrency(userLocation.data.currency.code);
        setLoading(true);
      } catch (error) {
        console.log(error);
      } */
    };

    fetchCourseDetails();
    fetchGeoLocation()
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
    <div>
      {loading ? (
        <>
          <div>{courseDetails.description}</div>
          <div>Next Start Date</div>
          <div>{startDates.join(" | ")}</div>
          <div>{priceAmount}</div>
        </>
      ) : (
        "fetchinggg"
      )}
    </div>
  );
};

export default CourseDetails;
