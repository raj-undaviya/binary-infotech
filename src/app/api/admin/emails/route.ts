import { NextResponse } from "next/server";
import { ImapFlow } from "imapflow";

export const dynamic = 'force-dynamic';

export async function GET() {
  const email = process.env.HOSTINGER_EMAIL;
  const password = process.env.HOSTINGER_PASSWORD;
  console.log("email", email);
  console.log("password", password);
  

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
      // Find unseen (un-seen) emails using seen: false
      const messages = await client.search({ seen: false });
      
      if (messages && Array.isArray(messages)) {
        count = messages.length;
        
        // Fetch details of the latest 5 unseen messages
        if (count > 0) {
          const latestIds = messages.slice(-5).reverse();
          for (const uid of latestIds) {
            // Fetch envelope info
            const message = await client.fetchOne(uid, { envelope: true });
            if (message && message.envelope) {
              unseenEmails.push({
                uid,
                subject: message.envelope.subject || "(No Subject)",
                from: message.envelope.from?.map((f: any) => `${f.name || ""} <${f.address}>`).join(", ") || "(Unknown Sender)",
                date: message.envelope.date ? message.envelope.date.toISOString() : new Date().toISOString()
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
