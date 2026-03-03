import nodemailer from 'nodemailer';
import emailTemplate from '../utils/emailTemplate.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Function to get transporter (creates on demand with fresh env vars)
function getTransporter() {
    console.log('Creating transporter with credentials:');
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Service:', process.env.EMAIL_SERVICE);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        throw new Error('EMAIL_USER and EMAIL_PASSWORD environment variables are required');
    }

    return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
}


// Function to send email
async function initiateEmail(formData) {
    try {
        const transporter = getTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL,
            subject: `New Form Submission from ${formData.name}`,
            html: emailTemplate(formData),
            attachments: [
                {
                    filename: 'logo1.jpg',
                    path: path.join(__dirname, '../assets/logo1.jpg'),
                    cid: 'schoollogo' // must match src="cid:schoollogo"
                }
            ]
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error in initiateEmail function:', error);
        throw error;
    }
}

export default initiateEmail;