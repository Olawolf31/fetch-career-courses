import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//API URL
const url = "https://private-e05942-courses22.apiary-mock.com/courses";

const CourseList = ({ setSelectedCourse }) => {
  const [courses, setCourses] = useState([]);

  //render courses when the page loads

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
    setSelectedCourse(e.target.value);
  };

  /* console.log(courses);  */

  return (
    <div className="container">
      <h1>CareerFoundry Courses</h1>

      <select id="cars" onChange={handleDropDown}>
        <option value="" placeholder="Select a course">
          Select a course
        </option>
        {courses.map((course) => (
          <option key={course.slug} value={course.slug}>
            {course.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseList;
