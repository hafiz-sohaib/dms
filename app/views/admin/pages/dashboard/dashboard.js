async function getTotalStudents() {
    const result = await (await fetch('/api/v1/students')).json();
    const length = result.students.length;
    const formattedCount = (length > 0 && length < 10) ? `0${length}` : length;
    document.getElementById('students_count').innerHTML = formattedCount;
}

async function getTotalTeachers() {
    const result = await (await fetch('/api/v1/teachers')).json();
    const length = result.teachers.length;
    const formattedCount = (length > 0 && length < 10) ? `0${length}` : length;
    document.getElementById('teachers_count').innerHTML = formattedCount;
}

async function getTotalNotices() {
    const result = await (await fetch('/api/v1/notices')).json();
    const length = result.notices.length;
    const formattedCount = (length > 0 && length < 10) ? `0${length}` : length;
    document.getElementById('notices_count').innerHTML = formattedCount;
}

async function getTotalDuties() {
    const result = await (await fetch('/api/v1/exam-duties')).json();
    const length = result.exams.length;
    const formattedCount = (length > 0 && length < 10) ? `0${length}` : length;
    document.getElementById('duties_count').innerHTML = formattedCount;
}

async function getTotalUsers() {
    const result = await (await fetch('/api/v1/users?role[$ne]=¥admin¥')).json();
    const length = result.users.length;
    const formattedCount = (length > 0 && length < 10) ? `0${length}` : length;
    document.getElementById('users_count').innerHTML = formattedCount;
}


async function getTotalTimetables() {
    const result = await (await fetch('/api/v1/timetables')).json();
    const length = result.timetables.length;
    const formattedCount = (length > 0 && length < 10) ? `0${length}` : length;
    document.getElementById('timetables_count').innerHTML = formattedCount;
}



getTotalStudents();
getTotalTeachers();
getTotalNotices();
getTotalDuties();
getTotalUsers();
getTotalTimetables();