import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});
export async function Email(to:string,body:string){
    const info = await transporter.sendMail({
    from: process.env.FROM ?? "sreevignesh27@gmail.com",
    to: to,
    subject: `${to}`,
    text: `${body}`
  });
  console.log("Message sent:", info.messageId);
}




