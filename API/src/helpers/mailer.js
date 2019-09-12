const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();

const Mailer = async (to, tokenLink) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
        to,
        from: "benlegendj@gmail.com",
        subject: "Account activation",
        html:
            "<strong>welcome to kenCinema</strong> <p>`click the link below to activate your accout ${tokenLink} </p>"
    });
};
export default Mailer;
