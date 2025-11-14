import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";

export const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro
  );
  const mailOptions = {
    from: `"Signalist" <signalist@getahun.pro`,
    email: email,
    subject: "Welcome to signalists -Your Stock market toolkit is ready",
    text: "Thanks for joining Signalist",
    html: htmlTemplate,
  };
  await transporter.sendMail(mailOptions);
};
