import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signin", form);
      console.log(res.data);
      const { id, role } = res.data.user;

      // store id and role
      localStorage.setItem("id", id);
      localStorage.setItem("role", role);

      // redirect
      role === "student" ? navigate("/home-student") : navigate("/home-teacher");
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-yellow-200 to-pink-300">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-10 bg-white shadow-lg rounded-xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Welcome Back</h2>

        <div className="mb-5">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 font-medium text-white transition bg-green-600 rounded-md hover:bg-green-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
