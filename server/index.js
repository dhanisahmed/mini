import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';
import Course from './models/Course.js';
import sendMail from './Mail.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/yourDBName", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sign-up Route
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ msg: "Sign-up successful", user: { name, email, role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Sign-in Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({
      msg: "Sign-in successful",
      user: {
        id: user._id,       // 🔥 send this back
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET route to fetch teacher's courses
app.get('/teacher/:id/courses', async (req, res) => {
  const teacherId = req.params.id;
  try {
    const courses = await Course.find({ teacherId });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

app.get('/teacher/:id', async(req, res)=>{
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user); // send the user document
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// PUT route to update course details
app.put("/courses/:id", async (req, res) => {
  const { title, description, category, videoUrl, pdfUrl } = req.body;

  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    course.title = title;
    course.description = description;
    course.category = category;
    course.videoUrl = videoUrl;
    course.pdfUrl = pdfUrl;

    await course.save();

    res.status(200).json({ msg: "Course updated successfully", course });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update course", error: err.message });
  }
});

// Enroll a student in a course
app.post("/courses/:id/register", async (req, res) => {
  const courseId = req.params.id;
  const { studentId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ msg: "Already registered for this course" });
    }

    // Enroll the student
    course.enrolledStudents.push(studentId);
    await course.save();

    // Find the student to get their email
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    // Prepare and send the email
    const subject = `Registration Successful for ${course.title}`;
    const message = `
      <h2>Congratulations, ${student.name}!</h2>
      <p>You have successfully registered for the course: <strong>${course.title}</strong>.</p>
      <p>We wish you a wonderful learning journey with us!</p>
      <br/>
      <p>Best Regards,<br/><strong>LearnHub Team</strong></p>
    `;

    sendMail(student.email, subject, message);
    res.status(200).json({ msg: "Student enrolled successfully and mail sent" });
    
  } catch (err) {
    res.status(500).json({ msg: "Error enrolling student", error: err.message });
  }
});

// Fetch a single course by ID
app.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json({ msg: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting course", error: error.message });
  }
});


app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching courses", error: err.message });
  }
});

app.post('/upload-course', async (req, res) => {
  const { title, description, category, videoUrl, pdfUrl, teacherId } = req.body;
  try {
    const newCourse = new Course({
      title,
      description,
      category,
      videoUrl,
      pdfUrl,
      teacherId
    });
    await newCourse.save();
    res.status(201).json({ message: 'Course uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload course', error });
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
