import { NextResponse } from "next/server";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export const dynamic = 'force-dynamic';

export async function GET() {
  const email = process.env.HOSTINGER_EMAIL || "info@binaries.org.in";
  const password = process.env.HOSTINGER_PASSWORD;

  if (!password) {
    return NextResponse.json({
      status: "CONFIG_REQUIRED",
      email,
      count: 0,
      emails: []
    });
  }

  const client = new ImapFlow({
    host: "imap.hostinger.com",
    port: 993,
    secure: true,
    auth: {
      user: email || "info@binaries.org.in",
      pass: password as string
    },
    logger: false
  });

  try {
    await client.connect();
    
    // Select Inbox
    const lock = await client.getMailboxLock("INBOX");
    let count = 0;
    const unseenEmails: any[] = [];
    
    try {
      // Find unseen (un-read) emails using seen: false
      const messages = await client.search({ seen: false });
      
      if (messages && Array.isArray(messages)) {
        count = messages.length;
        
        // Fetch details of the latest 10 unseen messages
        if (count > 0) {
          const latestIds = messages.slice(-10).reverse();
          for (const uid of latestIds) {
            // Fetch envelope and raw message source
            const message = await client.fetchOne(uid, { envelope: true, source: true });
            
            if (message && message.source && message.envelope) {
              // Parse raw email source to extract clean body text
              const parsed = await simpleParser(message.source);
              const bodyText = parsed.text || (parsed.html ? parsed.html.replace(/<[^>]*>/g, '') : "(No Message Content)");

              unseenEmails.push({
                id: `hostinger-${uid}`, // unique ID for client merge
                name: message.envelope.from?.map((f: any) => f.name || f.address.split('@')[0]).join(", ") || "Unknown Sender",
                email: message.envelope.from?.map((f: any) => f.address).join(", ") || "",
                subject: message.envelope.subject || "(No Subject)",
                message: bodyText.trim(),
                date: message.envelope.date ? message.envelope.date.toISOString() : new Date().toISOString(),
                read: false,
                sourceType: "hostinger" // to differentiate in UI
              });
            }
          }
        }
      }
    } finally {
      lock.release();
    }
    
    await client.logout();
    
    return NextResponse.json({
      status: "SUCCESS",
      email,
      count,
      emails: unseenEmails
    });
  } catch (error: any) {
    console.error("Hostinger IMAP connection failed:", error);
    return NextResponse.json({
      status: "CONNECTION_FAILED",
      error: error.message || "Failed to connect to Hostinger mail server",
      email,
      count: 0,
      emails: []
    }, { status: 500 });
  }
}
