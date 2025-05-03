import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'venkateshamulraj@gmail.com',
        pass: 'idlwysblafixrnts'
    }
});

const sendTestEmail = async () => {
    try {
        const info = await transporter.sendMail({
            to: 'testrecipient@example.com', // Replace with a valid email
            subject: 'Test Email',
            html: '<p>This is a test email.</p>'
        });
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

sendTestEmail();