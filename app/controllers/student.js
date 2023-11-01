const Users = require('../models/users');
const Members = require('../models/member');

exports.dashboard = (request, response) => {
    const path = request.path;
    response.render('student/pages/dashboard/dashboard', {title: "Student Dashboard", path});
}

exports.profile = (request, response) => {
    const path = request.path;
    response.render('student/pages/profile/profile', {title: "Student Profile", path});
}

exports.notes = (request, response) => {
    const path = request.path;
    response.render('student/pages/notes/notes', {title: "Notes", path});
}

exports.opportunities = (request, response) => {
    const path = request.path;
    response.render('student/pages/opportunities/opportunities', {title: "Opportunities", path});
}

exports.timetables = (request, response) => {
    const path = request.path;
    response.render('student/pages/timetables/timetables', {title: "Timetables", path});
}

exports.notice_board = (request, response) => {
    const path = request.path;
    response.render('student/pages/notice-board/notice-board', {title: "Notice Board", path});
}

exports.chat = async (request, response) => {
    const path = request.path;
    const users = await Users.find({_id: {$nin: [response.locals.user._id]}, role: '¥student¥'});

    let groups = [];
    const members = await Members.find({user_id: response.locals.user._id}).populate('group_id');
    members.map(member => groups.push(member.group_id));

    response.render('student/pages/chat/chat', {title: "Chat", path, users, groups});
}