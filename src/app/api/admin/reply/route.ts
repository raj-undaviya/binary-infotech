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
    const email = process.env.HOSTINGER_EMAIL || "info@binaries.org.in";
    const password = process.env.HOSTINGER_PASSWORD;

    if (!password) {
      return NextResponse.json({
        success: false,
        error: "SMTP credentials not configured. Please set HOSTINGER_PASSWORD in your .env file."
      }, { status: 400 });
    }

    // Configure Hostinger SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: email || "info@binaries.org.in",
        pass: password as string
      }
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
