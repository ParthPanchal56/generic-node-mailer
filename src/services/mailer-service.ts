import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";
import { green, red, bgYellow } from "colorette";

dotenv.config();

// Create a transporter object that will help us send emails using the SMTP protocol
const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Compile the data and the ejs template into HTML
const compileTemplate = async (templateName: string, data: any) => {
  const templatePath = path.resolve(
    __dirname,
    `../templates/${templateName}.ejs`
  );
  const compiledTemplate = await ejs.renderFile(templatePath, data);
  return compiledTemplate;
};

// Send the email
export const sendMail = async (
  to: string,
  subject: string,
  templateName: string,
  data: Record<string, any>
) => {
  try {
    const html = await compileTemplate(templateName, { to, data });

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.SMTP_USERNAME,
      to,
      subject,
      html: html as string,
    };

    await transporter.sendMail(mailOptions);

    // Log the email
    console.log(
      green(
        `EMAIL OF TYPE ${
          data.mailType
        } SENT TO ${to} ON ${new Date().toString()}`
      )
    );

    return true;
  } catch (error: any) {
    console.log(
      red(
        `ERROR SENDING EMAIL TO ${to} BECAUSE OF THE FOLLOWING:` +
          bgYellow(red(error))
      )
    );

    // Throw an error or return a rejected Promise
    throw error;
    // return false; // Consider returning false if you want to indicate failure without throwing an error
  }
};
