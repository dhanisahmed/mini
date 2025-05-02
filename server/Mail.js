const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'venkateshamulraj@gmail.com',
        pass: 'frocmbkkqvexieay'
    }
});

// export the sendMail function
const sendMail = (to, sub, msg) => {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg
    });
};

module.exports = sendMail;
