import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { storage } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save contact message locally (or to KV)
    await storage.saveContactMessage({ name, email, message });

    // 2. Try sending email notification
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.warn('[SMTP WARNING] Email credentials not found in environment variables. Message saved locally.');
      return NextResponse.json({
        status: 'success',
        message: 'Message saved locally, but email notification failed (credentials missing).',
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

      const mailOptions = {
        from: emailUser,
        to: emailUser, // Send email to self
        subject: 'New Portfolio Contact Message',
        text: `
You have a new message from your portfolio website:

Name: ${name}
Email: ${email}

Message:
${message}

---
Sent at: ${timestamp}
        `,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({
        status: 'success',
        message: 'Message sent and email notification delivered.',
      });
    } catch (emailErr) {
      console.error('[SMTP ERROR] Failed to send email:', emailErr);
      return NextResponse.json({
        status: 'success',
        message: 'Message saved locally, but email notification failed.',
      });
    }
  } catch (error) {
    console.error('[Contact API ERROR] Failed to process contact request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
