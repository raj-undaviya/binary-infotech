import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { to, subject, body } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields: to, subject, body"
      }, { status: 400 });
    }

    const cleanTo = to.trim();
    const email = process.env.HOSTINGER_EMAIL || "binarytechinfo@gmail.com";
    const password = process.env.HOSTINGER_PASSWORD;

    if (!password) {
      return NextResponse.json({
        success: false,
        error: "SMTP credentials not configured. Please set HOSTINGER_PASSWORD in your .env file."
      }, { status: 400 });
    }

    // Configure Hostinger SMTP transport with serverless timeout options
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: email || "binarytechinfo@gmail.com",
        pass: password as string
      },
      connectionTimeout: 10000,
      socketTimeout: 10000
    });

    // Send mail
    await transporter.sendMail({
      from: `"Binary Infotech" <${email}>`,
      to: cleanTo,
      subject,
      text: body,
      replyTo: email
    });

    return NextResponse.json({
      success: true,
      message: `Reply sent successfully to ${cleanTo}`
    });

  } catch (error: any) {
    console.error("Failed to send reply SMTP:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to send email via SMTP server"
    }, { status: 500 });
  }
}
