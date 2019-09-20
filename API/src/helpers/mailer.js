const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();

const Mailer = async (to, tokenLink) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
        to,
        from: "benlegendj@gmail.com",
        subject: "Account activation",
        html: "<strong>welcome to kenCinema</strong> <p> click the link below to activate your account </p>" +` ${tokenLink} `
    });
};

const ResetMail = async (to, tokenLink) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
        to,
        from: process.env.email,
        subject: "Reset password",
        html: "<strong>welcome to kenCinema</strong> <p> click the link below to reset your password</p>" +` ${tokenLink} `
    });
};

export { Mailer, ResetMail };
