import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyEnrollments() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const studentId = localStorage.getItem('id');
      if (!studentId) return alert("Please sign in first!");

      try {
        const res = await axios.get('http://localhost:3000/courses'); // fetching all courses
        const enrolled = res.data.filter(course => course.enrolledStudents.includes(studentId));
        setEnrolledCourses(enrolled);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (enrolledCourses.length === 0) {
    return <div className="p-8 text-lg text-center">You haven't enrolled in any courses yet.</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-blue-700">My Enrollments</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {enrolledCourses.map(course => (
            <div key={course._id} className="p-6 transition bg-white rounded-lg shadow hover:shadow-lg">
              <h2 className="mb-2 text-2xl font-semibold text-blue-800">{course.title}</h2>
              <p className="mb-4 text-gray-600">{course.description.substring(0, 100)}...</p>

              <button
                onClick={() => navigate(`/course-access/${course._id}`)}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Access Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyEnrollments;
