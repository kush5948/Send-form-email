# Form Backend API

This API accepts form data and sends it to the owner's email while also saving it to a local Excel file.

## Features
- ✅ Accepts form submissions (name, email, phone, message)
- 📧 Sends email notifications to the owner
- 📊 Automatically saves form data to an Excel file (forms.xlsx)
- ✔️ Form validation
- 💾 No cloud services needed - data stored locally

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Email Configuration (Gmail)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification":
   - Go to [Google Account](https://myaccount.google.com/)
   - Select "Security" in the left panel
   - Enable "2-Step Verification" if not already enabled
3. Generate an "App Password":
   - Go back to Security page
   - Search for "App passwords"
   - Select "Mail" and your device type
   - Copy the 16-character password (without spaces)

### 3. Environment Configuration

1. Create a `.env` file (or copy from `.env.example`):
```bash
cp .env.example .env
```

2. Update the `.env` file with your values:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
OWNER_EMAIL=owner@example.com
```

Replace:
- `your-email@gmail.com` → Your Gmail address
- `your-16-char-app-password` → 16-character App Password from Step 2
- `owner@example.com` → Email where form submissions should be sent

## Running the Server

```bash
npm run start
```

The server will start on `http://localhost:3000`

## API Endpoint

### POST /form

Submit form data to the API.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "This is a test message"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Form submitted successfully! Email sent and data added to Excel file.",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "This is a test message"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide all required fields: name, email, phone, message"
}
```

## Frontend Example

```javascript
async function submitForm(event) {
  event.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('http://localhost:3000/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert('Form submitted successfully!');
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Troubleshooting

### Email not sending
- Check that `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- For Gmail, ensure you're using an App Password (not your regular password)
- Check OWNER_EMAIL is set to the correct recipient email

### Excel file not being created
- Check that the server has write permissions to the project folder
- Ensure the folder path is correct
- The `forms.xlsx` file will be created automatically on first form submission

### File already in use error
- Close the Excel file (forms.xlsx) if open in Excel/Numbers
- The file must not be locked by another application
- You can view the file anytime, but close it before submitting new forms

### CORS Issues (if frontend is separate)
Add CORS middleware to server.js:
```javascript
import cors from 'cors';
app.use(cors());
```

Then install: `npm install cors`
