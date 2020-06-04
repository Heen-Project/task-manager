const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'wendy@example.com',
        subject: '[Notification] Thanks for signing up!',
        text: `Hi ${name}, Welcome to the site, this is a practice app. What do you think about it?`
    });
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'wendy@example.com',
        subject: '[Notification] Farewell! God knows when we shall meet again',
        text: `${name}, It’s sad, but sometimes moving on with the rest of your life, starts with goodbye.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}