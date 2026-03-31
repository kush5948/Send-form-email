import { Resend } from 'resend';
import emailTemplateSchool from '../utils/emailTemplateSchool.js';

function getResendClient() {
    if (!process.env.RESEND_API_KEY_School) {
        throw new Error('RESEND_API_KEY_School environment variable is required');
    }

    return new Resend(process.env.RESEND_API_KEY_School);
}

function getFromEmail() {
    if (process.env.RESEND_FROM_EMAIL_School) {
        return process.env.RESEND_FROM_EMAIL_School;
    }

    if (process.env.RESEND_FROM_DOMAIN_School) {
        const address = `inquiry@${process.env.RESEND_FROM_DOMAIN_School}`;

        if (process.env.RESEND_FROM_NAME_School) {
            return `${process.env.RESEND_FROM_NAME_School} <${address}>`;
        }

        return address;
    }

    return process.env.EMAIL_USER;
}

async function initiateEmailSchool(formData) {
    try {
        const resend = getResendClient(); 
        const fromEmail = getFromEmail();

        if (!fromEmail || !process.env.OWNER_EMAIL_School) {
            throw new Error('Set OWNER_EMAIL and either RESEND_FROM_EMAIL, RESEND_FROM_DOMAIN, or EMAIL_USER in the environment');
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: [process.env.OWNER_EMAIL_School],
            subject: `New Form Submission from ${formData.name}`,
            html: emailTemplateSchool(formData)
        });

        if (error) {
            throw new Error(error.message || 'Failed to send email with Resend');
        }

        console.log('Email sent successfully:', data?.id);
        return data;
    } catch (error) {
        console.error('Error in initiateEmailSchool function:', error);
        throw error;
    }
}

export default initiateEmailSchool;
