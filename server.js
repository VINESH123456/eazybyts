const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// Sample data (in a real application, you would use a database)
let courses = [
    { id: 1, title: 'Course 1', description: 'Description of Course 1' },
    { id: 2, title: 'Course 2', description: 'Description of Course 2' },
];

let enrollments = [];

// Get all courses
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// Enroll in a course
app.post('/api/enroll', (req, res) => {
    const { courseId, studentId } = req.body;

    // Check if the student is already enrolled
    const isEnrolled = enrollments.some(enrollment => enrollment.courseId === courseId && enrollment.studentId === studentId);

    if (isEnrolled) {
        res.status(400).json({ message: 'Already enrolled' });
    } else {
        enrollments.push({ courseId, studentId, progress: 0 });
        res.status(200).json({ message: 'Enrolled successfully' });
    }
});

// Get student courses and progress
app.get('/api/student/:studentId', (req, res) => {
    const studentId = parseInt(req.params.studentId, 10);

    // Find all enrollments for the student
    const studentCourses = enrollments
        .filter(enrollment => enrollment.studentId === studentId)
        .map(enrollment => {
            const course = courses.find(course => course.id === enrollment.courseId);
            return { ...course, progress: enrollment.progress };
        });

    res.json({ courses: studentCourses });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
