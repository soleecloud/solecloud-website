import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message, timeline } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create transporter for AWS WorkMail
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.us-east-1.awsapps.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to SoleCloud
    const mailOptionsToSoleCloud = {
      from: process.env.EMAIL_USER,
      to: 'contact@solecloud.io',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>This email was sent from the SoleCloud website contact form.</small></p>
      `,
      replyTo: email,
    };

    // Email confirmation to user
    const mailOptionsToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting SoleCloud',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,<br>The SoleCloud Team</p>
        <hr>
        <p><small>This is an automated confirmation email.</small></p>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToSoleCloud);
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}



