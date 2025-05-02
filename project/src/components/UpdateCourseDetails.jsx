import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    videoUrl: '',
    pdfUrl: '',
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/courses/${id}`);
        const { title, description, category, videoUrl, pdfUrl } = res.data;
        setCourseData({ title, description, category, videoUrl, pdfUrl });
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/courses/${id}`, courseData);
      alert('Course updated successfully!');
      navigate('/my-courses');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course.');
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-2xl p-8 mx-auto bg-white shadow-xl rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-green-800">Update Course Details</h1>

        <div className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Description</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Video URL</label>
            <input
              type="text"
              name="videoUrl"
              value={courseData.videoUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">PDF URL</label>
            <input
              type="text"
              name="pdfUrl"
              value={courseData.pdfUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleUpdate}
              className="px-8 py-3 text-lg font-semibold text-white transition duration-300 bg-green-600 rounded-full hover:bg-green-700"
            >
              Update Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCourseDetails;
