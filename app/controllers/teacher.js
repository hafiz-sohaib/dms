const Users = require('../models/users');
const Members = require('../models/member');

exports.dashboard = (request, response) => {
    const path = request.path;
    response.render('teacher/pages/dashboard/dashboard', {title: "Teacher Dashboard", path});
}

exports.profile = (request, response) => {
    const path = request.path;
    response.render('teacher/pages/profile/profile', {title: "Teacher Profile", path});
}

exports.notification = (request, response) => {
    const path = request.path;
    response.render('teacher/pages/notifications/notifications', {title: "Send Notifications", path});
}

exports.notes = (request, response) => {
    const path = request.path;
    response.render('teacher/pages/notes/notes', {title: "Upload Notifications", path});
}

exports.exam_outline = (request, response) => {
    const path = request.path;
    response.render('teacher/pages/exam-outline/exam-outline', {title: "Exam Outline", path});
}

exports.opportunities = (request, response) => {
    const path = request.path;
    response.render('teacher/pages/opportunities/opportunities', {title: "Upload Opportunities", path});
}

exports.notice_board = (request, response) => {
    const path = request.path;
    response.render('teacher/pages/notice-board/notice-board', {title: "Notice Board", path});
}

exports.chat = async (request, response) => {
    const path = request.path;
    const users = await Users.find({_id: {$nin: [response.locals.user._id]}, role: '¥teacher¥'});

    let groups = [];
    const members = await Members.find({user_id: response.locals.user._id}).populate('group_id');
    members.map(member => groups.push(member.group_id));

    response.render('teacher/pages/chat/chat', {title: "Chat", path, users, groups});
}