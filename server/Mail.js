import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'info.triptale@gmail.com',
        pass: 'pwjweeqjxeqlrrha'
    }
});

// Export the sendMail function as the default export
const sendMail = (to, sub, msg) => {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg
    });
};

export default sendMail;
