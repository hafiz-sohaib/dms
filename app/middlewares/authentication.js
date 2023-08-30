const jwt = require('jsonwebtoken');
const Users = require('../models/users');


// ========== This Middleware will check, If the user is logged or not ========== 
exports.isLoggedin = async (request, response, next) => {
    try {
        const token = request.cookies._dms;
        if (!token) return response.redirect('/auth/login');
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return response.redirect('/auth/login');
    }
}




// ========== This Middleware will get loggedin user data and sned it to entire app ========== 
exports.userData = async (request, response, next) => {
    try {
        const token = request.cookies._dms;
        if (!token) {
            response.locals.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decoded.id);

        if (!user) {
            response.clearCookie('_dms', {httpOnly: true, secure: true});
            response.locals.user = null;
            return response.redirect('/auth/login');
        }

        response.locals.user = user
        next();
    } catch (error) {
        response.locals.user = null;
        next();
    }
}




// ========== This Middleware will check, If the user is Admin or not ========== 
exports.isAdmin = async (request, response, next) => {
    const { email } = response.locals.user;
    const user = await Users.findOne({ email });
    if (user.role !== '¥admin¥') return response.redirect('/error');
    next();
}





// ========== This Middleware will check, If the user is Teacher or not ========== 
exports.isTeacher = async (request, response, next) => {
    const { email } = response.locals.user;
    const user = await Users.findOne({ email });
    if (user.role !== '¥teacher¥') return response.redirect('/error');
    next();
}





// ========== This Middleware will check, If the user is Student or not ========== 
exports.isStudent = async (request, response, next) => {
    const { email } = response.locals.user;
    const user = await Users.findOne({ email });
    if (user.role !== '¥student¥') return response.redirect('/error');
    next();
}