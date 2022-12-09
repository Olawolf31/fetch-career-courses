import { useState } from "react";
import CourseList from "./component/CourseList"
import CourseDetails from "./component/CourseDetails";

function App() {

  const [selectedCourse, setSelectedCourse] = useState("")

  return (
    <div>
      {!selectedCourse && <CourseList selectedCourse ={selectedCourse} setSelectedCourse={setSelectedCourse}/>}
      {selectedCourse && <CourseDetails selectedCourse ={selectedCourse} setSelectedCourse={setSelectedCourse}/>}
    </div>
  );
}

export default App;
