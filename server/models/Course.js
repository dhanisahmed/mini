// // models/Course.js
// const mongoose = require('mongoose');

// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   category: { type: String },
//   videoUrl: { type: String },
//   pdfUrl: { type: String },
//   teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// }, { timestamps: true });

// module.exports = mongoose.model('Course', courseSchema);


import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  videoUrl: String,
  pdfUrl: String,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Course', courseSchema);
