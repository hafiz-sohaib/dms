const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');
const crypto = require('crypto');


exports.errorHandler = (error, model_name) => {
    let errors = {};

    if (error.code === 11000) {
        Object.keys(error.keyValue).forEach(elem=> {
            errors[elem] = `This ${elem} is taken`;
        })
        return errors;
    }

    if (error.message.includes(`${model_name} validation failed`)) {
        Object.values(error.errors).map(({properties}) => {
            errors[properties.path] = properties.message;
        })
        return errors;
    }
}




exports.generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}




exports.sendEmail = async (data, request, response) => {
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        // secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transport.sendMail(data);
}






exports.upload_file = async (field_name, destination) => {
    const storage = multer.diskStorage({
        destination: `storage/${destination}/`,
        filename: (request, file, callback) => {
            callback(null, file.originalname);
        },
    });
    
    const upload = multer({ storage }).fields([
        { name: field_name },
    ]);

    return upload;
}





exports.generatePassword = (input) => {
    const capitalized = input.charAt(0).toUpperCase() + input.slice(1);
    const randomBytes = crypto.randomBytes(6).toString('hex');
    const specialChars = ['@', '_', '#', '$', '%', '^', '&', '*'];
    const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
    return `${capitalized}${randomSpecialChar}${randomBytes}`;
}