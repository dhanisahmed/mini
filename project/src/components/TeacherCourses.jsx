import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const teacherId = localStorage.getItem('id');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/teacher/${teacherId}/courses`);
        setCourses(res.data.courses);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    if (teacherId) {
      fetchCourses();
    }
  }, [teacherId]);

  function deleteCourse(courseId) {
    axios.delete(`http://localhost:3000/courses/${courseId}`)
      .then((res) => {
        console.log(res.data);
        setCourses(prev => prev.filter(course => course._id !== courseId)); // remove from UI
      })
      .catch(err => console.error('Error deleting course:', err));
  }
  
  
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="mb-10 text-4xl font-bold text-center text-blue-900">
        Your Uploaded Courses
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No courses found.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="relative p-6 transition-all duration-300 bg-white border shadow rounded-2xl hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-blue-800">{course.title}</h2>
              <p className="mt-2 text-gray-600 line-clamp-3">{course.description}</p>
              <p className="mt-3 text-sm text-gray-500">Students Enrolled: {course.enrolledStudents.length}</p>

              <div className="flex justify-between mt-5 space-x-3">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/update-course/${course._id}`)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
            </div>
          ))
        )}
      </div>

      {/* View Details Modal-like Card */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-2 text-2xl font-bold text-blue-800">{selectedCourse.title}</h2>
            <p className="mb-4 text-gray-700">{selectedCourse.description}</p>

            <div className="mb-2">
              <strong className="text-gray-600">Students Enrolled:</strong> {selectedCourse.enrolledStudents.length}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherCourses;
