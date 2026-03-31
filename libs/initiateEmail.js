import emailTemplate from '../utils/emailTemplate.js';
import { Resend } from 'resend';

function getResendClient() {
    if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY environment variable is required');
    }

    return new Resend(process.env.RESEND_API_KEY);
}

function getFromEmail() {
    if (process.env.RESEND_FROM_EMAIL) {
        return process.env.RESEND_FROM_EMAIL;
    }

    if (process.env.RESEND_FROM_DOMAIN) {
        const address = `admission@${process.env.RESEND_FROM_DOMAIN}`;

        if (process.env.RESEND_FROM_NAME) {
            return `${process.env.RESEND_FROM_NAME} <${address}>`;
        }

        return address;
    }

    return process.env.EMAIL_USER;
}

async function initiateEmail(formData) {
    try {
        const resend = getResendClient();
        const fromEmail = getFromEmail();

        if (!fromEmail || !process.env.OWNER_EMAIL) {
            throw new Error('Set OWNER_EMAIL and either RESEND_FROM_EMAIL, RESEND_FROM_DOMAIN, or EMAIL_USER in the environment');
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: [process.env.OWNER_EMAIL],
            subject: `New Form Submission from ${formData.name}`,
            html: emailTemplate(formData)
        });

        if (error) {
            throw new Error(error.message || 'Failed to send email with Resend');
        }

        console.log('Email sent successfully:', data?.id);
        return data;
    } catch (error) {
        console.error('Error in initiateEmail function:', error);
        throw error;
    }
}

export default initiateEmail;
