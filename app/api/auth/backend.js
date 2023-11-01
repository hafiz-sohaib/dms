const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Users = require('../../models/users');
const Groups = require('../../models/group');
const Members = require('../../models/member');
const { errorHandler, generateToken, sendEmail } = require('../../utils/utils');


// ==================== User Register ====================
exports.register = async (request, response) => {
    try {
        const user = await Users.create(request.body);

        if (user) {
            if (user.role === '¥teacher¥') {
                const group_1 = await Groups.findOne({ group_name: "Teachers Group" });
                const group_2 = await Groups.findOne({ group_name: "Students Group" });

                await Members.create({ group_id: group_1._id, user_id: user._id});
                await Members.create({ group_id: group_2._id, user_id: user._id});
            }
            else if (user.role === '¥student¥') {
                const group = await Groups.findOne({ group_name: "Students Group" });
                await Members.create({ group_id: group._id, user_id: user._id});
            }

            const mail_data = {
                from: process.env.EMAIL_ADDRESS,
                to: user.email,
                subject: "Credentials",
                html: `<h1>It's your crendentials</h1>
                <h3>Username: ${user.email}<h5>
                <h3>Password: ${request.body.password}</h3>
                <p>Please visit this url <a href="http://localhost:3500/auth/login">http://localhost:3500/auth/login</a></p>`
            };

            sendEmail(mail_data);
            response.json({message: "Successfully Registered", status: "success"});
        }
    } catch (error) {
        const errors = errorHandler(error, 'users');
        response.json({message: errors, status: 'error'});
    }
}





// ==================== User Login ====================
exports.login = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await Users.findOne({ email });
        if (!user || !(await user.isPasswordMatched(password))) return response.json({message: "Invalid Credentials", status: "error"});
        if (user.isBlocked === true) return response.json({message: "Your Account is Deactivated", status: "error"});

        const token = generateToken(user._id);
        await Users.findByIdAndUpdate(user._id, { access_token: token });

        response.cookie("__dmsToken", token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        return response.json({message: "Successfully Logged In", status: "success"});
    } catch (error) {
        console.error(error);
        return response.json({message: "Something Went Wrong", status: "error"});
    }
}





// ==================== User Logout ====================
exports.logout = async (request, response) => {
    try {
        const token = request.cookies.__dmsToken;
        if (!token) return response.clearCookie('__dmsToken', { httpOnly: true, secure: true });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await Users.findByIdAndUpdate(decoded.id, {access_token: ""});
        response.clearCookie('__dmsToken', { httpOnly: true, secure: true });
        return response.json({message: "Successfully Logged Out", status: "success"});
    } catch (error) {
        console.error(error);
        return response.json({message: "Something Went Wrong", status: "error"});
    }
};





// ==================== Rsest Password Token ====================
exports.reset_password_token = async (request, response) => {
    try {
        const token = request.cookies.__dmsToken;
        if (token) return response.json({ message: "You can't perform this task because you're now logged in", status: "error" });

        const { email } = request.body;
        if (!email) return response.json({ message: "Email is required", status: "error" });

        const user = await Users.findOne({ email });
        if (!user) return response.json({ message: "Sorry. Can't find your account", status: "error" });

        const password_token = await user.generate_reset_password_token();
        await user.save();

        return response.json({ password_token, visited_url: `http://localhost:${process.env.PORT}/api/v1/auth/reset-password/${password_token}` });
    } catch (error) {
        response.json({ error });
    }
}





// ==================== Rsest Password ====================
exports.reset_password = async (request, response) => {
    try {
        const { password } = request.body;
        const { token } = request.params;

        const _token = request.cookies.__dmsToken;
        if (_token) return response.json({ message: "You can't perform this task because you're now logged in", status: "error" });

        if (!password) return response.json({ message: "Password is required", status: "error" });

        const hashed_token = crypto.createHash("sha256").update(token).digest("hex");

        const user = await Users.findOne({ password_reset_token: hashed_token, password_reset_expires: { $gt: Date.now() }});
        if (!user) return response.json({ message: "Token Expired. Please try again later", status: "error" });

        user.password = password;
        user.password_reset_token = undefined;
        user.password_reset_expires = undefined;
        await user.save();

        response.json({ message: "Password changed successfully", status: "success" });
    } catch (error) {
        console.log(error);
        response.json({ message: "Something Went Wrong", status: "error" });
    }
}