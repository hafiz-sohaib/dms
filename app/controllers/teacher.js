exports.dashboard = (request, response) => {
    response.render('pages/teacher/dashboard/dashboard', {title: "Teacher Dashboard"});
}