import React, { useState } from 'react';
import axios from 'axios';

function UploadCourse() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    videoUrl: '',
    pdfUrl: ''
  });

  const teacherId = localStorage.getItem('id');

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/upload-course', {
        ...courseData,
        teacherId
      });
      alert('Course uploaded successfully!');
      setCourseData({
        title: '',
        description: '',
        category: '',
        videoUrl: '',
        pdfUrl: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error uploading course');
    }
  };

  return (
    <div className="max-w-3xl min-h-screen px-6 py-10 mx-auto bg-white">
      <h2 className="mb-6 text-3xl font-bold text-blue-700">Upload New Course</h2>
      <form onSubmit={handleSubmit} className="p-6 space-y-6 rounded-lg shadow-md bg-gray-50">
        <div>
          <label className="block mb-1 font-medium">Course Title</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-blue-500"
            rows="3"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Video URL</label>
          <input
            type="url"
            name="videoUrl"
            value={courseData.videoUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">PDF URL</label>
          <input
            type="url"
            name="pdfUrl"
            value={courseData.pdfUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Upload Course
        </button>
      </form>
    </div>
  );
}

export default UploadCourse;
