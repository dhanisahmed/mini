import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [teacherName, setTeacherName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseAndTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/courses/${id}`);
        setCourse(res.data);

        const teacherRes = await axios.get(`http://localhost:3000/teacher/${res.data.teacherId}`);
        setTeacherName(teacherRes.data.name);
      } catch (error) {
        console.error("Error fetching course or teacher data:", error);
      }
    };

    fetchCourseAndTeacher();
  }, [id]);

  if (!course) {
    return <div className="flex items-center justify-center min-h-screen text-lg">Loading course details...</div>;
  }

  return (
    <div className="min-h-screen px-6 py-10 font-sans bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl p-8 mx-auto bg-white shadow-xl rounded-2xl">
        <h1 className="mb-4 text-4xl font-bold text-blue-800">{course.title}</h1>

        <div className="flex flex-wrap items-center mb-6 text-sm text-gray-600">
          <span className="mr-6"><strong>Instructor:</strong> {teacherName}</span>
          <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
            {course.category}
          </span>
        </div>

        <p className="mb-6 text-gray-700">{course.description}</p>

        {/* Static content block to show site importance */}
        <div className="p-6 mb-8 rounded-lg shadow-sm bg-blue-50">
          <h2 className="mb-2 text-2xl font-semibold text-blue-700">Why choose this course?</h2>
          <ul className="leading-relaxed text-gray-700 list-disc list-inside">
            <li>Expert-led sessions curated by experienced educators</li>
            <li>Practical content that aligns with industry standards</li>
            <li>Access to downloadable resources and future updates</li>
            <li>Lifetime access and certification upon completion</li>
            <li>Join a growing community of passionate learners</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
  className="px-8 py-3 text-lg font-semibold text-white transition duration-300 bg-blue-600 rounded-full hover:bg-blue-700"
  onClick={() => navigate(`/register/${id}`)} // 🔥 pass courseId to register page
>
  Register Now
</button>

        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
