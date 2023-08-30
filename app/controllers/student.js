exports.dashboard = (request, response) => {
    response.render('pages/student/dashboard', {title: "Dashboard"});
}