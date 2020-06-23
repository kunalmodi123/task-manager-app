const sgMail = require("@sendgrid/mail");

// const sendgridAPIKey =
//   "API KEY";

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // using env variable

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "kunalmodi123@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "kunalmodi123@gmail.com",
    subject: "Goodbye. Thanks for holding up with us!",
    text: `Thanks ${name}. Your account has been deleted successfully. Is there any issue you want to address that we can look upon on?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};

// sgMail.send({
//   to: "kunalmodi123@gmail.com",
//   from: "kunalmodi123@gmail.com",
//   subject: "This is my first creation",
//   text: "Yeh lo kunal email chala gaya",
// });
