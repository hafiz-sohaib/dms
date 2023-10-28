exports.register = (request, response) => {
    const path = request.path;
    if (request.cookies.__dmsToken) {
        if (response.locals.user.role === '¥admin¥') return response.redirect('/admin/dashboard');
        if (response.locals.user.role === '¥teacher¥') return response.redirect('/teacher/dashboard');
        return response.redirect('/student/dashboard');
    }else{
        response.render('pages/auth/register/register', {title: "Register", path});
    }
}



exports.login = (request, response) => {
    const path = request.path;
    if (request.cookies.__dmsToken) {
        if (response.locals.user.role === '¥admin¥') return response.redirect('/admin/dashboard');
        if (response.locals.user.role === '¥teacher¥') return response.redirect('/teacher/dashboard');
        return response.redirect('/student/dashboard');
    }else{
        response.render('pages/auth/login/login', {title: "Login", path});
    }
}