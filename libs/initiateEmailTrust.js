import { Resend } from 'resend';
import emailTemplateTrust from '../utils/emailTemplateTrust.js';

function getResendClient() {
    if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY environment variable is required');
    }

    return new Resend(process.env.RESEND_API_KEY_Trust);
}

function getFromEmail() {
    if (process.env.RESEND_FROM_EMAIL_Trust) {
        return process.env.RESEND_FROM_EMAIL_Trust;
    }

    if (process.env.RESEND_FROM_DOMAIN_Trust) {
        const address = `trust@${process.env.RESEND_FROM_DOMAIN_Trust}`;

        if (process.env.RESEND_FROM_NAME_Trust) {
            return `${process.env.RESEND_FROM_NAME_Trust} <${address}>`;
        }

        return address;
    }

    return process.env.EMAIL_USER;
}

async function initiateEmailTrust(formData) {
    try {
        const resend = getResendClient();
        const fromEmail = getFromEmail();

        if (!fromEmail || !process.env.OWNER_EMAIL_Trust) {
            throw new Error('Set OWNER_EMAIL_Trust and either RESEND_FROM_EMAIL_Trust, RESEND_FROM_DOMAIN_Trust, or EMAIL_USER in the environment');
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: [process.env.OWNER_EMAIL_Trust],
            subject: `New Form Submission from ${formData.name}`,
            html: emailTemplateTrust(formData)
        });

        if (error) {
            throw new Error(error.message || 'Failed to send email with Resend');
        }

        console.log('Email sent successfully:', data?.id);
        return data;
    } catch (error) {
        console.error('Error in initiateEmailTrust function:', error);
        throw error;
    }
}

export default initiateEmailTrust;
