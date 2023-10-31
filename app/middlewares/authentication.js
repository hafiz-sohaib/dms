const jwt = require('jsonwebtoken');
const Users = require('../models/users');


// ========== This Middleware will check, If the user is logged or not ========== 
exports.isLoggedin = async (request, response, next) => {
    try {
        const token = request.cookies.__dmsToken;
        if (!token) return response.redirect('/auth/login');
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) return next();
        response.redirect('/auth/login');
    } catch (error) {
        return response.redirect('/auth/login');
    }
}





// ========== This Middleware will get loggedin user data and sned it to entire app ========== 
exports.userData = async (request, response, next) => {
    try {
        const token = request.cookies.__dmsToken;
        if (!token) {
            response.locals.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decoded.id);

        if (!user) {
            response.clearCookie('__dmsToken', {httpOnly: true, secure: true});
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
    try {
        const { email } = response.locals.user;
        const user = await Users.findOne({ email });
        if (user.role !== '¥admin¥') return response.redirect('/error');
        next();
    } catch (error) {
        return response.redirect('/error');
    }
}





// ========== This Middleware will check, If the user is Teacher or not ========== 
exports.isTeacher = async (request, response, next) => {
    try {
        const { email } = response.locals.user;
        const user = await Users.findOne({ email });
        if (user.role !== '¥teacher¥') return response.redirect('/error');
        next();
    } catch (error) {
        return response.redirect('/error');
    }
}





// ========== This Middleware will check, If the user is Student or not ========== 
exports.isStudent = async (request, response, next) => {
    try {
        const { email } = response.locals.user;
        const user = await Users.findOne({ email });
        if (user.role !== '¥student¥') return response.redirect('/error');
        next();
    } catch (error) {
        return response.redirect('/error');
    }
}