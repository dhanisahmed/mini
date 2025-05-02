const HomeTeacher = () => {
    return (
      <div className="bg-[#fefefe] text-gray-800">
        {/* Navbar */}
        <nav className="sticky top-0 z-10 flex items-center justify-between px-10 py-4 bg-white border-b shadow">
          <h1 className="text-2xl font-bold text-green-700">LearnHub</h1>
          <div className="space-x-6 text-sm font-medium">
            <a href="/upload-course" className="text-gray-600 transition hover:text-green-700">Upload Course</a>
            <a href="/my-courses" className="text-gray-600 transition hover:text-green-700">My Courses</a>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="bg-green-700 text-white px-4 py-1.5 rounded hover:bg-green-800 transition"
            >
              Logout
            </button>
          </div>
        </nav>
  
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-screen px-6">
          <div className="max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-green-800 md:text-5xl">Inspire Minds, Share Your Knowledge</h2>
            <p className="mb-8 text-lg text-gray-600">Create courses, reach students globally, and shape the next generation of learners.</p>
            <a
              href="/upload-course"
              className="inline-block px-6 py-3 font-medium text-white transition bg-green-700 rounded-full hover:bg-green-800"
            >
              Upload Course
            </a>
          </div>
        </section>
  
        {/* About Teaching Section */}
        <section className="flex items-center min-h-screen px-10 bg-white">
          <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-3xl font-bold text-green-800">What You Can Do</h3>
              <ul className="space-y-4 text-lg text-gray-600">
                <li>✓ Create high-quality video and PDF content</li>
                <li>✓ Manage student enrollments with ease</li>
                <li>✓ Monitor feedback and improve courses</li>
                <li>✓ Earn recognition and grow your audience</li>
              </ul>
            </div>
            <div className="p-6 bg-green-100 shadow-lg rounded-xl">
              <h4 className="mb-3 text-xl font-semibold text-green-700">Your Dashboard</h4>
              <p className="text-gray-700">Keep track of all your courses, view enrolled students, and optimize your teaching strategy with insights.</p>
            </div>
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-green-50">
          <h3 className="mb-3 text-3xl font-semibold text-green-900">Let's Get Started</h3>
          <p className="mb-6 text-lg text-gray-600">Join hundreds of other teachers sharing valuable knowledge.</p>
          <a
            href="/upload-course"
            className="px-6 py-3 font-medium text-white transition bg-green-700 rounded-full hover:bg-green-800"
          >
            Share Your First Lesson
          </a>
        </section>
      </div>
    );
  };
  
  export default HomeTeacher;
  