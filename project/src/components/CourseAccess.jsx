import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseAccess() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) return <div className="p-4 text-center">Loading course...</div>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-3xl p-8 mx-auto bg-white shadow-xl rounded-2xl">
        <h1 className="mb-4 text-3xl font-bold text-blue-800">{course.title}</h1>
        <p className="mb-6 text-gray-700">{course.description}</p>

        <div className="space-y-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-700">Video Lecture</h2>
            <a
              href={course.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-600 underline hover:text-blue-800"
            >
              Watch Video
            </a>
          </div>

          <div className="p-4 bg-green-100 rounded-lg">
            <h2 className="text-lg font-semibold text-green-700">Downloadable PDF</h2>
            <a
              href={course.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-green-600 underline hover:text-green-800"
            >
              View PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseAccess;
