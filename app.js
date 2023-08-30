require('dotenv').config();
require('./app/config/config');


// ==================== Import Dependencies ====================
const { userData } = require('./app/middlewares/authentication');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();


// ==================== Configure View Engine ====================
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');


// ==================== Built-in Middlewares ====================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(express.static(path.join(__dirname, 'app/views')));
app.use(cookieParser());


// ==================== Routes ====================
app.use('*', userData);
app.use('/student', require('./app/routes/student'));
app.use('/teacher', require('./app/routes/teacher'));
app.use('/admin', require('./app/routes/admin'));
app.use('/auth', require('./app/routes/auth'));


// ==================== API Routes ====================
app.use(process.env.API_PREFIX, [
	require('./app/api/auth/endpoints'),
	require('./app/api/users/endpoints'),
	require('./app/api/student/endpoints'),
	require('./app/api/teacher/endpoints'),
	require('./app/api/notice/endpoints'),
	require('./app/api/exam-duties/endpoints')
]);


// ==================== Error Handler ====================
app.use((request, response, next) => next(createError(404)));

app.use(function (error, request, response, next) {
	response.locals.message = error.message;
	response.locals.error = request.app.get('env') === 'development' ? error : {};

	response.status(error.status || 500);
	response.render('pages/error', {title: "Page Not Found"});
});


module.exports = app;