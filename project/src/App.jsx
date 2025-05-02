
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import HomeStudent from './components/HomeStudent';
import HomeTeacher from './components/HomeTeacher';
import UploadCourse from './components/UploadCourse';
import BrowseCourses from './components/BrowseCourses';
import TeacherCourses from './components/TeacherCourses';
import CourseDetails from './components/CourseDetails';
import UpdateCourseDetails from './components/UpdateCourseDetails';
import RegisterPage from './components/RegisterPage';
import CourseAccess from './components/CourseAccess';
import MyEnrollments from './components/MyEnrollments';

function App() {

  return (
    <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home-student' element={<HomeStudent />} />
          <Route path='/home-teacher' element={<HomeTeacher />} />
          <Route path='/upload-course' element={<UploadCourse />} />
          <Route path='/courses' element={<BrowseCourses />} />
          <Route path='/my-courses' element={<TeacherCourses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path='/update-course/:id' element={<UpdateCourseDetails />} />
          <Route path="/register/:courseId" element={<RegisterPage />} />
          <Route path="/course-access/:courseId" element={<CourseAccess />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
        </Routes>     
    </div>
  )
}

export default App
