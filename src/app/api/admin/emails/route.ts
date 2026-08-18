import { NextResponse } from "next/server";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export const dynamic = 'force-dynamic';

// GET: Fetch recent emails (both read & unread)
export async function GET() {
  const email = process.env.HOSTINGER_EMAIL || "binarytechinfo@gmail.com";
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
      user: email || "binarytechinfo@gmail.com",
      pass: password as string
    },
    logger: false
  });

  try {
    await client.connect();
    
    // Select Inbox
    const lock = await client.getMailboxLock("INBOX");
    let unreadCount = 0;
    const inboxEmails: any[] = [];
    
    try {
      // 1. Get total unread count for notifications
      const unseenMessages = await client.search({ seen: false });
      if (unseenMessages && Array.isArray(unseenMessages)) {
        unreadCount = unseenMessages.length;
      }

      // 2. Fetch both read & unread messages for the inbox feed
      const allMessages = await client.search({ all: true });
      
      if (allMessages && Array.isArray(allMessages)) {
        // Fetch details of the latest 15 messages (both read and unread)
        if (allMessages.length > 0) {
          const latestIds = allMessages.reverse();
          
          for (const uid of latestIds) {
            // Fetch envelope, flags, and raw message source
            const message = await client.fetchOne(uid, { envelope: true, source: true, flags: true });
            
            if (message && message.source && message.envelope) {
              // Parse raw email source to extract body text
              const parsed = await simpleParser(message.source);
              const bodyText = parsed.text || (parsed.html ? parsed.html.replace(/<[^>]*>/g, '') : "(No Message Content)");

              // Determine if mail has been read (has the \Seen flag)
              const isRead = message.flags ? message.flags.has('\\Seen') : false;

              // Parse Reply-To header to handle contact form notifications correctly
              const replyToObj = message.envelope.replyTo?.[0];
              const useReplyTo = !!(replyToObj && replyToObj.address && replyToObj.address.toLowerCase() !== email.toLowerCase());
              
              const senderEmail = useReplyTo ? (replyToObj.address as string) : (message.envelope.from?.map((f: any) => f.address).join(", ") || "");
              const senderName = useReplyTo 
                ? (replyToObj.name || (replyToObj.address as string).split('@')[0]) 
                : (message.envelope.from?.map((f: any) => f.name || f.address.split('@')[0]).join(", ") || "Unknown Sender");

              inboxEmails.push({
                id: `hostinger-${uid}`, // unique ID for merging
                name: senderName,
                email: senderEmail,
                subject: message.envelope.subject || "(No Subject)",
                message: bodyText.trim(),
                date: message.envelope.date ? message.envelope.date.toISOString() : new Date().toISOString(),
                read: isRead,
                sourceType: "hostinger"
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
      count: unreadCount,
      emails: inboxEmails
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

// POST: Mark an email as read on Hostinger IMAP
export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id || !id.startsWith("hostinger-")) {
      return NextResponse.json({ success: false, error: "Invalid Hostinger message ID" }, { status: 400 });
    }

    const email = process.env.HOSTINGER_EMAIL || "binarytechinfo@gmail.com";
    const password = process.env.HOSTINGER_PASSWORD;

    if (!password) {
      return NextResponse.json({ success: false, error: "SMTP/IMAP credentials not configured" }, { status: 400 });
    }

    const uid = parseInt(id.replace("hostinger-", ""), 10);
    if (isNaN(uid)) {
      return NextResponse.json({ success: false, error: "Invalid message UID" }, { status: 400 });
    }

    const client = new ImapFlow({
      host: "imap.hostinger.com",
      port: 993,
      secure: true,
      auth: {
        user: email || "binarytechinfo@gmail.com",
        pass: password as string
      },
      logger: false
    });

    await client.connect();
    const lock = await client.getMailboxLock("INBOX");
    try {
      // Add \Seen flag to mark it as read in Hostinger IMAP
      await client.messageFlagsAdd(uid, ["\\Seen"]);
    } finally {
      lock.release();
    }
    await client.logout();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to mark message as read in IMAP:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
