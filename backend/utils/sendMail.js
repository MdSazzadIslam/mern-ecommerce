const nodemailer = require("nodemailer");

//const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  SENDER_MAIL,
  SENDER_MAIL_PASSWORD,
} = process.env;

const sendEmail = async (to, firstName, lastName, url, txt) => {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_MAIL,
      pass: SENDER_MAIL_PASSWORD,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: SENDER_MAIL,
    to: to,
    subject: "Email activation",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome ${firstName} ${lastName} </h2>
            <p>Congratulations! You're almost set to start.
            Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  await smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};

module.exports = sendEmail;
