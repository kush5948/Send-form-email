# Form Backend API

This API accepts form data and sends it to the owner's email using Resend.

## Features
- Accepts form submissions
- Sends email notifications to the owner
- Validates required fields
- Applies request rate limiting

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Resend

1. Create a Resend account at `https://resend.com/`.
2. Generate a Resend API key.
3. Verify the sender email or domain you want to send from.

### 3. Environment variables

Create a `.env` file and add:

```env
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=Admissions <onboarding@resend.dev>
OWNER_EMAIL=owner@example.com
PORT=3000
```

Or, if you want to build the sender from your verified domain:

```env
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_DOMAIN=yourdomain.com
RESEND_FROM_NAME=Admissions
OWNER_EMAIL=owner@example.com
PORT=3000
```

Replace:
- `re_xxxxxxxxx` with your Resend API key
- `Admissions <onboarding@resend.dev>` with a sender verified in Resend
- `yourdomain.com` with a domain verified in Resend
- `owner@example.com` with the inbox that should receive submissions

## Running the server

```bash
npm run start
```

The server starts on `http://localhost:3000`.

## API Endpoint

### `POST /formsubmit`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "inquiry": "admission",
  "message": "I would like to know more about admissions."
}
```

Success response:

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

Error response:

```json
{
  "success": false,
  "message": "All Fields are required"
}
```

## Troubleshooting

### Email not sending
- Check that `RESEND_API_KEY` is valid
- Check that `RESEND_FROM_EMAIL` is verified in Resend
- If using `RESEND_FROM_DOMAIN`, make sure the domain is verified in Resend
- Check that `OWNER_EMAIL` points to the right recipient

### CORS

If your frontend runs on a different origin, update the `origin` value in `server.js`.
