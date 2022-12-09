import { useState } from "react";
import CourseList from "./component/CourseList"

function App() {

  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <div>
      <CourseList selectedCourse ={selectedCourse} setSelectedCourse={setSelectedCourse}/>
      
    </div>
  );
}

export default App;
