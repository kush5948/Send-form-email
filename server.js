import express from 'express';
import dotenv from 'dotenv';
import SendEmail from './Controllers/EmailSend.js';



dotenv.config();

const app = express();
const SERVERPORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// // Function to add data to Excel file
// async function addToExcelFile(formData) {
//     try {
//         const workbook = new ExcelJS.Workbook();
//         let worksheet;

//         // Check if file exists and load it
//         let fileExists = false;
//         try {
//             await workbook.xlsx.readFile(EXCEL_FILE_PATH);
//             worksheet = workbook.getWorksheet('Sheet1') || workbook.addWorksheet('Sheet1');
//             fileExists = true;
//         } catch (error) {
//             // File doesn't exist, create new workbook
//             worksheet = workbook.addWorksheet('Sheet1');
            
//             // Add headers
//             worksheet.columns = [
//                 { header: 'Name', key: 'name', width: 20 },
//                 { header: 'Email', key: 'email', width: 25 },
//                 { header: 'Phone', key: 'phone', width: 15 },
//                 { header: 'Message', key: 'message', width: 40 },
//                 { header: 'Timestamp', key: 'timestamp', width: 20 },
//             ];
            
//             // Style header row
//             worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
//             worksheet.getRow(1).fill = {
//                 type: 'pattern',
//                 pattern: 'solid',
//                 fgColor: { argb: 'FF4472C4' },
//             };
//         }

//         // Add new row
//         worksheet.addRow({
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone,
//             message: formData.message,
//             timestamp: new Date().toLocaleString(),
//         });

//         // Save file
//         await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
//         console.log('Data added to Excel file:', EXCEL_FILE_PATH);
//         return { success: true, filePath: EXCEL_FILE_PATH };
//     } catch (error) {
//         console.error('Error adding to Excel file:', error);
//         throw error;
//     }
// }


app.get('/', (_, res) => {
    res.send("API Server Running. Use POST /form to submit form data.");
});

app.post('/formsubmit', SendEmail);


app.listen(SERVERPORT, () => {
    console.log(`Server is running on port http://localhost:${SERVERPORT}`);
});


