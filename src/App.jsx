import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseManager from './components/CourseManager';
import InstanceManager from './components/InstanceManager';
import axios from 'axios';

const COURSES_URL = 'http://localhost:8080/api/courses';

function App() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(COURSES_URL);
      setCourses(res.data);
    } catch (err) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="bg-light min-vh-100 w-100">
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', width: '100vw' }}>
        <div className="w-100 sticky-top bg-light" style={{ zIndex: 1020 }}>
          <h1 className="mb-4 text-center w-100 py-3 border-bottom shadow-sm">Courses Management</h1>
        </div>
        <div className="w-100 px-3" style={{ maxWidth: '100%' }}>
          <CourseManager courses={courses} onCourseCreated={fetchCourses} />
          <hr className="my-5" />
          <InstanceManager courses={courses} fetchCourses={fetchCourses} />
        </div>
      </div>
    </div>
  );
}

export default App;
