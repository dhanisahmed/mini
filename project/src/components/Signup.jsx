import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signup", form);
      alert(res.data.msg);
      navigate('/signin');
    } catch (err) { 
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-purple-300 to-blue-200">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-10 bg-white shadow-lg rounded-xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Create an Account</h2>

        <div className="mb-5">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Role</label>
          <select
            name="role"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 font-medium text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
