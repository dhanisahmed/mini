import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const { courseId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (!userId) return alert("User not logged in");

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/teacher/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleRegister = async () => {
    const studentId = localStorage.getItem('id'); // ✅ student ID from local storage
    if (!studentId) return alert("Please sign in to register.");
  
    try {
      await axios.post(`http://localhost:3000/courses/${courseId}/register`, {
        studentId: studentId, // ✅ studentId in body
      });
  
      alert("Registered successfully!");
      navigate(`/course-access/${courseId}`);
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err.response.data.msg);
    }
  };
  

  if (!user) return <div className="p-4 text-center">Loading your details...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-xl p-6 mx-auto bg-white shadow-md rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center">Confirm Registration</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <div className="mt-6 text-center">
          <button
            onClick={handleRegister}
            className="px-6 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Confirm & Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
