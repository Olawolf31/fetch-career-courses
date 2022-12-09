import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//API URL
const url = "https://private-e05942-courses22.apiary-mock.com/courses";

const CourseList = ({setSelectedCourse}) => {
  const [courses, setCourses] = useState([]);

  //render api when the page loads

  useEffect(() => {
    //fetchAPI
    const fetchCourses = async () => {
      try {
        const response = await axios.get(url);
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  //handle dropdown when selected
  const handleDropDown = (e) => {
    setSelectedCourse(e.target.value)
  }

    /* console.log(courses);  */

  return (
    <div>
       <h1>CareerFoundry Courses</h1>
      <select onChange={handleDropDown}>
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course.slug} value={course.slug}> {course.title}</option>
        ))}
      </select>
    </div>
  );
};

export default CourseList;
