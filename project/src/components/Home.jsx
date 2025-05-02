import React from 'react';
import { Video, Trophy, Clock } from 'lucide-react';
import hero from '../assets/hero.jpg';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-[#f9fafb] font-sans text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">LearnSphere</h1>
        <div className="space-x-4 text-sm">
          <Link to="/signin" className="text-blue-600 transition hover:text-blue-800">Sign In</Link>
          <Link to="/signup" className="px-4 py-2 text-white transition bg-blue-700 rounded hover:bg-blue-800">Sign Up</Link>
        </div>
      </nav>

      <main className="mt-20">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen gap-12 px-6 py-12 md:flex-row md:px-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex-1 max-w-xl text-center md:text-left">
            <h2 className="mb-6 text-4xl font-bold leading-tight text-blue-800 md:text-5xl">Empower Your Learning Journey</h2>
            <p className="mb-6 text-lg text-gray-600">
              LearnSphere brings interactive courses, real-world projects, and expert mentorship at your fingertips. Study anytime, anywhere.
            </p>
            <Link to="/signup">
              <button className="px-6 py-3 text-sm font-medium text-white transition bg-blue-700 rounded-md hover:bg-blue-800">
                Get Started
              </button>
            </Link>
          </div>
          <div className="flex-1">
            <img 
              src={hero} 
              alt="Learning illustration" 
              className="w-full shadow-xl rounded-2xl"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="min-h-screen px-6 py-20 text-center bg-white md:px-16">
          <h2 className="mb-16 text-3xl font-bold text-gray-800 md:text-4xl">What Makes Us Stand Out</h2>
          <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-3">
            <div className="p-8 transition shadow-md bg-blue-50 rounded-2xl hover:shadow-xl">
              <Video className="mx-auto mb-4 text-blue-600" size={40} />
              <h3 className="mb-2 text-xl font-semibold">Interactive Video Lessons</h3>
              <p className="text-gray-600">Learn through immersive tutorials with real-time quizzes and coding playgrounds.</p>
            </div>
            <div className="p-8 transition shadow-md bg-green-50 rounded-2xl hover:shadow-xl">
              <Trophy className="mx-auto mb-4 text-green-600" size={40} />
              <h3 className="mb-2 text-xl font-semibold">Achievements & Rewards</h3>
              <p className="text-gray-600">Earn badges and certificates as you complete courses and challenges.</p>
            </div>
            <div className="p-8 transition shadow-md bg-purple-50 rounded-2xl hover:shadow-xl">
              <Clock className="mx-auto mb-4 text-purple-600" size={40} />
              <h3 className="mb-2 text-xl font-semibold">Flexible Scheduling</h3>
              <p className="text-gray-600">Learn at your own pace with structured deadlines and progress reminders.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="flex items-center justify-center min-h-screen px-6 text-center bg-gradient-to-b from-gray-100 to-white md:px-20">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">Ready to begin?</h2>
            <p className="mb-8 text-lg text-gray-700">
              Join thousands of learners on LearnSphere and unlock your potential. Start your first course today!
            </p>
            <Link to="/signup">
              <button className="px-6 py-3 font-medium text-white transition bg-blue-700 rounded-md hover:bg-blue-800">
                Sign Up Now
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-white bg-blue-700">
        <p>&copy; {new Date().getFullYear()} LearnSphere. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
