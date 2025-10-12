# Email Setup Guide for Contact Form

This guide will help you set up the email functionality for the SoleCloud website contact form.

## Overview

The contact form is configured to:
- Send submissions to **contact@solecloud.io**
- Use the visitor's email address as the reply-to address
- Send a confirmation email to the visitor
- Capture name, email, project type, message, and timeline

## Prerequisites

You'll need:
1. An email account to send emails from (contact@solecloud.io or a Gmail account for SMTP relay)
2. SMTP credentials configured for your email provider
3. For Gmail: Two-factor authentication enabled and an App Password generated

## Setup Steps

### 1. Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** > **2-Step Verification**
3. Follow the prompts to enable 2-Step Verification if not already enabled

### 2. Generate an App Password

1. Go to **Security** > **2-Step Verification** > **App passwords**
   - Or visit directly: https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select **Other** as the device and enter "SoleCloud Website"
4. Click **Generate**
5. Copy the 16-character password (shown without spaces)

### 3. Create Environment Variables File

Create a file named `.env.local` in the root directory of the project with the following content:

```env
EMAIL_USER=contact@solecloud.io
EMAIL_PASSWORD=your-email-password-or-app-password-here
```

**Important Notes:**
- Replace `your-16-character-app-password-here` with the actual app password from Step 2
- Remove all spaces from the app password
- The `.env.local` file should NEVER be committed to git (it's already in .gitignore)
- Keep this password secure and do not share it

### 4. Test the Contact Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact page: http://localhost:3000/contact

3. Fill out and submit the form

4. Check:
   - **contact@solecloud.io** should receive an email with the form submission
   - The email you entered in the form should receive a confirmation email

## How It Works

### Email Flow

1. User fills out the contact form
2. Form data is sent to `/api/contact` endpoint
3. Server validates the data
4. Two emails are sent:
   - **To SoleCloud**: Contains all form details with the user's email as reply-to
   - **To User**: Confirmation email thanking them for reaching out

### Form Fields

- **Name** (required): Visitor's full name
- **Email** (required): Visitor's email address (used for reply-to and confirmation)
- **Project Type** (optional): Website Creation, AI App Development, IT Support Services, or AWS Bootcamp
- **Message** (required): Project description or inquiry
- **Timeline** (optional): Expected project timeline

## Database Considerations

Currently, the system does NOT store form submissions in a database. Emails are sent directly.

### If you want to add a database:

**Benefits:**
- Backup of all contact form submissions
- Ability to track and manage leads
- Analytics on contact patterns
- Recovery if emails fail to send

**Options:**
1. **Vercel Postgres** (if hosting on Vercel)
2. **MongoDB Atlas** (free tier available)
3. **AWS DynamoDB** (since you're already using AWS)
4. **Supabase** (easy setup with PostgreSQL)

Let me know if you'd like me to add database storage functionality!

## Troubleshooting

### Emails not sending

1. **Check environment variables**: Ensure `.env.local` exists and has correct values
2. **Verify App Password**: Make sure you're using the App Password, not your regular Gmail password
3. **Check spam folder**: Confirmation emails might land in spam initially
4. **Review server logs**: Check the terminal/console for error messages

### Common Errors

**"Invalid login"**: App password is incorrect or not set up properly
**"Less secure app access"**: You need to use an App Password, not your regular password
**"Connection timeout"**: Check your internet connection and firewall settings

## Security Notes

- Never commit `.env.local` to version control
- Rotate your App Password periodically
- Consider rate limiting the contact form to prevent spam (can be added if needed)
- The API route is configured to only accept POST requests

## Future Enhancements

Consider adding:
- ✅ Database storage for submissions
- ✅ Rate limiting to prevent spam
- ✅ CAPTCHA integration
- ✅ Webhooks to Slack/Discord for instant notifications
- ✅ Email templates with better branding
- ✅ Auto-responder sequences

Need help with any of these? Just ask!



