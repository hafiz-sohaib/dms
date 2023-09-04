exports.dashboard = (request, response) => {
    const path = request.path;
    response.render('pages/teacher/dashboard/dashboard', {title: "Teacher Dashboard", path});
}

exports.profile = (request, response) => {
    const path = request.path;
    response.render('pages/teacher/profile/profile', {title: "Teacher Profile", path});
}

exports.notification = (request, response) => {
    const path = request.path;
    response.render('pages/teacher/notifications/notifications', {title: "Send Notifications", path});
}

exports.notes = (request, response) => {
    const path = request.path;
    response.render('pages/teacher/notes/notes', {title: "Upload Notifications", path});
}

exports.exam_outline = (request, response) => {
    const path = request.path;
    response.render('pages/teacher/exam-outline/exam-outline', {title: "Exam Outline", path});
}

exports.opportunities = (request, response) => {
    const path = request.path;
    response.render('pages/teacher/opportunities/opportunities', {title: "Upload Opportunities", path});
}

exports.notice_board = (request, response) => {
    const path = request.path;
    response.render('pages/teacher/notice-board/notice-board', {title: "Notice Board", path});
}

exports.chat = (request, response) => {
    const path = request.path;
    response.render('pages/teacher/chat/chat', {title: "Chat", path});
}