async function getTotalStudents() {
    const result = await (await fetch('/api/v1/students')).json();
    const formattedCount = (result.students.length < 10) ? `0${result.students.length}` : result.students.length;
    document.getElementById('students_count').innerHTML = formattedCount;
}

async function getTotalTeachers() {
    const result = await (await fetch('/api/v1/teachers')).json();
    const formattedCount = (result.teachers.length < 10) ? `0${result.teachers.length}` : result.teachers.length;
    document.getElementById('teachers_count').innerHTML = formattedCount;
}

async function getTotalNotices() {
    const result = await (await fetch('/api/v1/notices')).json();
    const formattedCount = (result.notices.length < 10) ? `0${result.notices.length}` : result.notices.length;
    document.getElementById('notices_count').innerHTML = formattedCount;
}

async function getTotalDuties() {
    const result = await (await fetch('/api/v1/exam-duties')).json();
    const formattedCount = (result.exams.length < 10) ? `0${result.exams.length}` : result.exams.length;
    document.getElementById('duties_count').innerHTML = formattedCount;
}

async function getTotalUsers() {
    const result = await (await fetch('/api/v1/users?role[$ne]=¥admin¥')).json();
    const formattedCount = (result.users.length < 10) ? `0${result.users.length}` : result.users.length;
    document.getElementById('users_count').innerHTML = formattedCount;
}


async function getTotalTimetables() {
    const result = await (await fetch('/api/v1/timetables')).json();
    const formattedCount = (result.timetables.length < 10) ? `0${result.timetables.length}` : result.timetables.length;
    document.getElementById('timetables_count').innerHTML = formattedCount;
}



getTotalStudents();
getTotalTeachers();
getTotalNotices();
getTotalDuties();
getTotalUsers();
getTotalTimetables();