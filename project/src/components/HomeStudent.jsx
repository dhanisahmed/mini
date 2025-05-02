const HomeStudent = () => {
    return (
      <div className="bg-[#f9fafb] text-gray-800">
        {/* Navbar */}
        <nav className="sticky top-0 z-10 flex items-center justify-between px-10 py-4 bg-white border-b shadow">
          <h1 className="text-2xl font-bold text-blue-700">LearnHub</h1>
          <div className="space-x-6 text-sm font-medium">
            <a href="/courses" className="text-gray-600 transition hover:text-blue-700">Browse Courses</a>
            <a href="/my-enrollments" className="text-gray-600 transition hover:text-blue-700">My Enrollments</a>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition"
            >
              Logout
            </button>
          </div>
        </nav>
  
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-screen px-6">
          <div className="max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-blue-800 md:text-5xl">Your Learning Journey Starts Here</h2>
            <p className="mb-8 text-lg text-gray-600">Access top-notch courses curated by experienced teachers. Learn at your pace, anytime, anywhere.</p>
            <a
              href="/courses"
              className="inline-block px-6 py-3 font-medium text-white transition bg-blue-700 rounded-full hover:bg-blue-800"
            >
              Explore Courses
            </a>
          </div>
        </section>
  
        {/* Info Section */}
        <section className="flex items-center min-h-screen px-10 bg-white">
          <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-3xl font-bold text-blue-800">Why Choose LearnHub?</h3>
              <ul className="space-y-4 text-lg text-gray-600">
                <li>✓ Curated courses by industry experts</li>
                <li>✓ Real-time enrollment and progress tracking</li>
                <li>✓ Seamless learning experience on any device</li>
                <li>✓ Interactive content and community support</li>
              </ul>
            </div>
            <div className="p-6 bg-blue-100 shadow-lg rounded-xl">
              <h4 className="mb-3 text-xl font-semibold text-blue-700">Your Dashboard</h4>
              <p className="text-gray-700">Keep track of your enrollments, resume learning, and explore recommended content tailored just for you.</p>
            </div>
          </div>
        </section>
  
        {/* Footer CTA */}
        <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-blue-50">
          <h3 className="mb-3 text-3xl font-semibold text-blue-900">Ready to dive in?</h3>
          <p className="mb-6 text-lg text-gray-600">Find the perfect course and begin learning today.</p>
          <a
            href="/courses"
            className="px-6 py-3 font-medium text-white transition bg-blue-700 rounded-full hover:bg-blue-800"
          >
            Start Exploring
          </a>
        </section>
      </div>
    );
  };
  
  export default HomeStudent;
  