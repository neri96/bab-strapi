const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_APIKEY as string);

export const sendEmail = async ({
  email,
  subject,
  html,
}: {
  email: string;
  subject: string;
  html: string;
}) => {
  try {
    await sgMail.send({
      to: email,
      from: process.env.EMAIL as string,
      subject,
      html,
    });
  } catch (error: any) {
    console.log("!!! ERROR !!!", error.response.body);
  }
};
