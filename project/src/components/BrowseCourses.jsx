import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BrowseCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [teachers, setTeachers] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/courses")
      .then(async res => {
        setCourses(res.data);
        const teacherIds = [...new Set(res.data.map(course => course.teacherId))];
        
        const teacherResponses = await Promise.all(
          teacherIds.map(id => axios.get(`http://localhost:3000/teacher/${id}`))
        );
  
        const teacherData = {};
        teacherResponses.forEach((res, index) => {
          teacherData[teacherIds[index]] = res.data.name;
        });
  
        setTeachers(teacherData);
      })
      .catch(err => console.error("Error fetching:", err));
  }, []);
  
  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title && course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? course.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from courses
  const categories = [...new Set(courses.map(course => course.category))];

  return (
    <div className="min-h-screen px-8 py-6 font-sans bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-blue-700">Browse Courses</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row">
        <input
          type="text"
          placeholder="Search by course name..."
          className="w-full px-4 py-2 border rounded-md shadow-sm md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full px-4 py-2 border rounded-md shadow-sm md:w-1/4"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Course Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {filteredCourses.map(course => (
          <div key={course._id} className="p-5 transition bg-white shadow-md rounded-xl hover:shadow-lg">
            <h2 className="text-xl font-semibold text-blue-600">{course.title}</h2>
            <p className="mb-2 text-gray-600">{course.description}</p>
            <p className="text-sm text-gray-500">Category: <span className="italic">{course.category}</span></p>
            <p className="text-sm text-gray-500">
              Teacher: {teachers[course.teacherId] || "Loading..."}
            </p>
            <a
              href={`/course/${course._id}`}
              className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseCourses;
