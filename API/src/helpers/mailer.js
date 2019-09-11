// const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();
console.log(process.env.SENDGRID_API_KEY);

// const Mailer = async (to, subject, tokenLink) => {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     await await sgMail.send({
//         to,
//         from: "benlegendj@gmail.com",
//         subject,
//         text: `and easy to do anywhere, even with Node.js ${tokenLink}`,
//         html: "<strong>and easy to do anywhere, even with Node.js</strong>"
//     });
// };

// Mailer("buckyyacky@gmail.com", "asdfg", "0dfbbffjjf");
