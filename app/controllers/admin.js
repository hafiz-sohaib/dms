exports.dashboard = (request, response) => {
    const path = request.path;
    response.render('pages/admin/dashboard/dashboard', {title: "Admin Dashboard", path});
}

exports.profile = (request, response) => {
    const path = request.path;
    response.render('pages/admin/profile/profile', {title: "Admin Profile", path});
}

exports.manage_student = (request, response) => {
    const path = request.path;
    response.render('pages/admin/manage-student/manage-student', {title: "Manage Student", path});
}

exports.manage_teacher = (request, response) => {
    const path = request.path;
    response.render('pages/admin/manage-teacher/manage-teacher', {title: "Manage Teacher", path});
}

exports.manage_notices = (request, response) => {
    const path = request.path;
    response.render('pages/admin/manage-notices/manage-notices', {title: "Manage Notices", path});
}

exports.manage_exam_duties = (request, response) => {
    const path = request.path;
    response.render('pages/admin/manage-exam-duties/manage-exam-duties', {title: "Manage Exam Duties", path});
}

exports.manage_user_accounts = (request, response) => {
    const path = request.path;
    response.render('pages/admin/manage-user-accounts/manage-user-accounts', {title: "Manage User Accounts", path});
}