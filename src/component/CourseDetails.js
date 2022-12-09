import axios from 'axios';
import React from 'react'
import {useState, useEffect} from 'react'


  //fetch Course details
  const url = `https://private-e05942-courses22.apiary-mock.com/courses/`;

const CourseDetails = ({selectedCourse, setSelectedCourse}) => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${url}${selectedCourse}`);
        setCourseDetails(response.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseDetails()
  }, [selectedCourse])
  return (
    <div>
      {loading ? courseDetails.description : "fetchinggg"}
    </div>
  )
}

export default CourseDetails