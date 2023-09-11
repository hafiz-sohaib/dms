const Users = require('../models/users');
const Members = require('../models/member');

exports.dashboard = (request, response) => {
    const path = request.path;
    response.render('pages/student/dashboard/dashboard', {title: "Student Dashboard", path});
}

exports.notes = (request, response) => {
    const path = request.path;
    response.render('pages/student/notes/notes', {title: "Notes", path});
}

exports.opportunities = (request, response) => {
    const path = request.path;
    response.render('pages/student/opportunities/opportunities', {title: "Opportunities", path});
}

exports.notice_board = (request, response) => {
    const path = request.path;
    response.render('pages/student/notice-board/notice-board', {title: "Notice Board", path});
}

exports.chat = async (request, response) => {
    const path = request.path;
    const users = await Users.find({_id: {$nin: [response.locals.user._id]}, role: '¥student¥'});

    let groups = [];
    const members = await Members.find({user_id: response.locals.user._id}).populate('group_id');
    members.map(member => groups.push(member.group_id));

    response.render('pages/student/chat/chat', {title: "Chat", path, users, groups});
}