document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    loadStudentDashboard();
});

function loadCourses() {
    fetch('http://localhost:3000/api/courses')
        .then(response => response.json())
        .then(data => {
            const courseList = document.getElementById('course-list');
            courseList.innerHTML = '';
            data.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.className = 'course-card';
                courseCard.innerHTML = `
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <button onclick="enroll(${course.id})">Enroll</button>
                `;
                courseList.appendChild(courseCard);
            });
        });
}

function enroll(courseId) {
    fetch('http://localhost:3000/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: courseId, studentId: 1 }) // Assuming studentId 1 for simplicity
    }).then(response => {
        if (response.ok) {
            alert('Enrolled successfully');
            loadStudentDashboard();
        } else {
            alert('Failed to enroll');
        }
    });
}

function loadStudentDashboard() {
    fetch('http://localhost:3000/api/student/1') // Assuming studentId 1 for simplicity
        .then(response => response.json())
        .then(data => {
            const studentDashboard = document.getElementById('student-dashboard');
            studentDashboard.innerHTML = '';
            data.courses.forEach(course => {
                const courseProgress = document.createElement('div');
                courseProgress.innerHTML = `
                    <h3>${course.title}</h3>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${course.progress}%"></div>
                    </div>
                `;
                studentDashboard.appendChild(courseProgress);
            });
        });
}
