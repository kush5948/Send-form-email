import express from 'express';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = 3200;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email Configuration
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Excel File Path
const EXCEL_FILE_PATH = path.join(__dirname, 'forms.xlsx');

// Function to send email
async function sendEmail(formData) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL,
            subject: `New Form Submission from ${formData.name}`,
            html: `
                <h2>New Form Submission</h2>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message}</p>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Function to add data to Excel file
async function addToExcelFile(formData) {
    try {
        const workbook = new ExcelJS.Workbook();
        let worksheet;

        // Check if file exists and load it
        let fileExists = false;
        try {
            await workbook.xlsx.readFile(EXCEL_FILE_PATH);
            worksheet = workbook.getWorksheet('Sheet1') || workbook.addWorksheet('Sheet1');
            fileExists = true;
        } catch (error) {
            // File doesn't exist, create new workbook
            worksheet = workbook.addWorksheet('Sheet1');
            
            // Add headers
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 20 },
                { header: 'Email', key: 'email', width: 25 },
                { header: 'Phone', key: 'phone', width: 15 },
                { header: 'Message', key: 'message', width: 40 },
                { header: 'Timestamp', key: 'timestamp', width: 20 },
            ];
            
            // Style header row
            worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4472C4' },
            };
        }

        // Add new row
        worksheet.addRow({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            timestamp: new Date().toLocaleString(),
        });

        // Save file
        await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
        console.log('Data added to Excel file:', EXCEL_FILE_PATH);
        return { success: true, filePath: EXCEL_FILE_PATH };
    } catch (error) {
        console.error('Error adding to Excel file:', error);
        throw error;
    }
}

app.get('/', (_, res) => {
    res.send("API Server Running. Use POST /form to submit form data.");
});

app.post('/form', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, email, phone, message',
            });
        }

        // Prepare form data
        const formData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            message: message.trim(),
        };

        // Send email
        await sendEmail(formData);

        // Add to Excel file
        await addToExcelFile(formData);

        res.status(200).json({
            success: true,
            message: 'Form submitted successfully! Email sent and data added to Excel file.',
            data: formData,
        });
    } catch (error) {
        console.error('Error processing form:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing form submission',
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


