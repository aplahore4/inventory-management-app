const nodeMailer = require('nodemailer');
const {
  EMAIL_HOST,
  EMAIL_SERVER_PORT,
  EMAIL_USER,
  EMAIL_PASS,
} = require('../config');

const sendEmail = async (to, from, subject, message, replyTo) => {
  const transporter = nodeMailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_SERVER_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = { to, from, subject, html: message, replyTo };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
