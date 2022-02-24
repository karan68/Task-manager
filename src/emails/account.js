const sgMail = require('@sendgrid/mail');

//now we will access it using environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY); //settiing the api key
// console.log(process.env.SENDGRID_API_KEY);
// sgMail.send({
//     to: 'mekaranyadav8@gmail.com',
//     from: 'mekaranyadav3@gmail.com',
//     subject: 'Sending with Twilio SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js'
// }).then(() => {
//     console.log('Email sent');
// }
// ).catch((error) => {
//     console.log(error);
// });

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mekaranyadav3@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mekaranyadav3@gmail.com',
        subject: 'Thanks for joining in! Please comback again',
        text: `Hello ${name}. Let me know the reason for leaving the app.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
