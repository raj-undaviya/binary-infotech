"use client";

import { useState, useEffect } from "react";
import { markContactReadState, deleteContactMessage } from "@/app/actions";
import { 
  Check, 
  Mail, 
  MailOpen, 
  Trash2, 
  Calendar, 
  User, 
  Search, 
  MessageSquare, 
  ChevronRight, 
  ShieldAlert,
  Send,
  Loader2,
  Inbox
} from "lucide-react";
import Card from "./design-system/Card";
import Button from "./design-system/Button";

// Custom contact message interface supporting merged Hostinger emails
interface ExtendedContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  sourceType?: "hostinger" | "website";
}

export default function AdminContactsInbox({ initialContacts }: { initialContacts: ExtendedContactMessage[] }) {
  // Add sourceType: "website" to initial contacts
  const websiteContacts = initialContacts.map(c => ({ ...c, sourceType: c.sourceType || "website" as const }));
  
  const [contacts, setContacts] = useState<ExtendedContactMessage[]>(websiteContacts);
  const [selectedId, setSelectedId] = useState<string | null>(
    websiteContacts.length > 0 ? websiteContacts[0].id : null
  );
  
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingEmails, setLoadingEmails] = useState(false);

  // Composer states
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [replyStatus, setReplyStatus] = useState<{ success: boolean; message: string } | null>(null);

  const selectedContact = contacts.find(c => c.id === selectedId);

  // Reset composer when contact selection changes
  useEffect(() => {
    setReplyText("");
    setReplyStatus(null);
  }, [selectedId]);

  // Fetch Hostinger unread emails on mount and merge them into the feed
  useEffect(() => {
    async function fetchAndMergeEmails() {
      try {
        setLoadingEmails(true);
        const res = await fetch("/api/admin/emails");
        if (res.ok) {
          const data = await res.json();
          if (data.status === "SUCCESS" && data.emails && data.emails.length > 0) {
            setContacts(prev => {
              // Retain only website contacts to prevent duplicate Hostinger email appends
              const dbContacts = prev.filter(c => c.sourceType !== "hostinger");
              const combined = [...dbContacts, ...data.emails];
              
              // Sort unified messages by date descending
              return combined.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              );
            });
            
            // Auto-select first message of the merged list if none selected
            if (data.emails.length > 0 && !selectedId) {
              setSelectedId(data.emails[0].id);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load Hostinger emails:", err);
      } finally {
        setLoadingEmails(false);
      }
    }

    fetchAndMergeEmails();
  }, []);

  const filteredContacts = contacts.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  async function handleToggleRead(id: string, currentRead: boolean) {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    if (contact.sourceType === "hostinger") {
      // For Hostinger emails, we mark as read locally inside state
      setContacts(prev =>
        prev.map(c => (c.id === id ? { ...c, read: !currentRead } : c))
      );

      // If we are marking as read (switching from unread to read), sync it back to Hostinger IMAP
      if (!currentRead) {
        try {
          await fetch("/api/admin/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
        } catch (err) {
          console.error("Failed to sync read status to Hostinger IMAP:", err);
        }
      }
      return;
    }

    // For website form database contacts, trigger action
    const success = await markContactReadState(id, !currentRead);
    if (success) {
      setContacts(prev =>
        prev.map(c => (c.id === id ? { ...c, read: !currentRead } : c))
      );
    }
  }

  async function handleDelete(id: string) {
    const contact = contacts.find(c => c.id === id);
    if (!contact || contact.sourceType === "hostinger") return;

    if (confirm("Are you sure you want to delete this message?")) {
      const success = await deleteContactMessage(id);
      if (success) {
        setContacts(prev => prev.filter(c => c.id !== id));
        if (selectedId === id) {
          const remaining = contacts.filter(c => c.id !== id);
          setSelectedId(remaining.length > 0 ? remaining[0].id : null);
        }
      }
    }
  }

  async function handleSendReply() {
    if (!selectedContact || !replyText.trim()) return;

    try {
      setSending(true);
      setReplyStatus(null);

      const res = await fetch("/api/admin/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: selectedContact.email,
          subject: `Re: ${selectedContact.subject}`,
          body: replyText,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setReplyStatus({ 
          success: true, 
          message: "Email reply sent successfully using Hostinger SMTP!" 
        });
        setReplyText("");
        
        // Auto-mark read status when replied
        if (!selectedContact.read) {
          handleToggleRead(selectedContact.id, false);
        }
      } else {
        setReplyStatus({
          success: false,
          message: data.error || "Failed to send email. Check credentials."
        });
      }
    } catch (err: any) {
      setReplyStatus({
        success: false,
        message: "Network error: Failed to connect to SMTP server."
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <Card variant="default" className="bg-surface/50 border border-border/80 rounded-3xl overflow-hidden shadow-sm h-[calc(100vh-160px)] flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Messages list column */}
        <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-border/60 flex flex-col h-1/2 md:h-full bg-background/25">
          
          {/* Search & Loader Header */}
          <div className="p-4 border-b border-border/60 flex items-center gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted h-4 w-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search unified inbox..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            {loadingEmails && (
              <Loader2 className="h-4.5 w-4.5 animate-spin text-accent flex-shrink-0" />
            )}
          </div>

          {/* List Wrapper */}
          <div className="flex-grow overflow-y-auto divide-y divide-border/40">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => {
                const isSelected = contact.id === selectedId;
                const isHostinger = contact.sourceType === "hostinger";
                return (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedId(contact.id)}
                    className={`w-full text-left p-4 sm:p-5 flex flex-col gap-1.5 transition-colors cursor-pointer relative ${
                      isSelected 
                        ? "bg-accent/5" 
                        : "hover:bg-surface/60"
                    }`}
                  >
                    {/* Active bar decoration */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent" />
                    )}

                    <div className="flex items-center justify-between text-[9px] text-muted font-bold uppercase tracking-wider">
                      <span>{new Date(contact.date).toLocaleDateString()}</span>
                      
                      <div className="flex items-center gap-2">
                        {isHostinger ? (
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-extrabold tracking-wider text-[8px] border border-blue-500/20">
                            Hostinger Mail
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-extrabold tracking-wider text-[8px] border border-emerald-500/20">
                            Website Form
                          </span>
                        )}
                        {!contact.read && (
                          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        )}
                      </div>
                    </div>

                    <h3 className={`text-xs font-bold text-foreground line-clamp-1 ${!contact.read ? "font-extrabold" : ""}`}>
                      {contact.name}
                    </h3>
                    <h4 className="text-[11px] font-bold text-muted line-clamp-1">
                      {contact.subject}
                    </h4>
                    <p className="text-[11px] text-muted font-medium line-clamp-1 mt-0.5">
                      {contact.message}
                    </p>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-muted font-semibold">
                No messages found in your inbox.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Message reader details & reply composer */}
        {selectedContact ? (
          <div className="w-full md:w-3/5 flex flex-col h-1/2 md:h-full bg-background/10">
            
            {/* Header Action Tools */}
            <div className="p-4 border-b border-border/60 flex items-center justify-between bg-surface/30">
              <span className="text-[10px] font-extrabold text-muted uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-accent" />
                Message Reader
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleRead(selectedContact.id, selectedContact.read)}
                  title={selectedContact.read ? "Mark as unread" : "Mark as read"}
                  className="p-2 rounded-lg border border-border text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
                >
                  {selectedContact.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  disabled={selectedContact.sourceType === "hostinger"}
                  title={selectedContact.sourceType === "hostinger" ? "Delete not supported for Hostinger emails" : "Delete message"}
                  className="p-2 rounded-lg border border-border text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Message Body Content */}
            <div className="p-6 sm:p-8 flex-grow overflow-y-auto space-y-6">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-foreground mb-2 leading-tight">
                  {selectedContact.subject}
                </h2>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/40 pb-4 text-[10px] sm:text-xs text-muted font-semibold">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-foreground">{selectedContact.name}</span>
                    <span>&lt;{selectedContact.email}&gt;</span>
                    
                    {selectedContact.sourceType === "hostinger" ? (
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-extrabold tracking-wider text-[8px]">
                        Hostinger Mail Inbox
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-extrabold tracking-wider text-[8px]">
                        Website Contact Form
                      </span>
                    )}
                  </div>
                  <span>Received {new Date(selectedContact.date).toLocaleString()}</span>
                </div>
              </div>

              {/* Message text */}
              <div className="text-foreground text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-surface/50 border border-border/40 rounded-2xl p-5 font-semibold">
                {selectedContact.message}
              </div>

              {/* Directly Reply Composer Section */}
              <div className="border-t border-border/60 pt-6 mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-accent" />
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-foreground">
                    Compose Email Reply
                  </h3>
                </div>

                <div className="space-y-3">
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Write your official reply to ${selectedContact.name}...`}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-xs placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-300 resize-none font-medium h-32"
                  />

                  {replyStatus && (
                    <div
                      className={`p-4 rounded-xl flex items-start gap-3 border text-xs font-semibold relative overflow-hidden transition-all ${
                        replyStatus.success
                          ? "bg-accent/15 border-accent/20 text-accent"
                          : "bg-red-500/10 border-red-500/20 text-red-500"
                      }`}
                    >
                      <span>{replyStatus.message}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <p className="text-[9px] text-muted font-semibold leading-normal max-w-sm">
                      Sends via Hostinger SMTP (setup <code>HOSTINGER_PASSWORD</code> in <code>.env</code>). If not configured, use the Mailto button to compose offline.
                    </p>
                    
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <a
                        href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}&body=${encodeURIComponent(replyText)}`}
                        className="px-3.5 py-2.5 rounded-xl border border-border text-[10px] font-extrabold text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer uppercase tracking-wider"
                      >
                        Use Mailto
                      </a>
                      
                      <button
                        onClick={handleSendReply}
                        disabled={sending || !replyText.trim()}
                        className="px-5 py-2.5 bg-accent hover:bg-secondary text-white text-[10px] font-extrabold rounded-xl hover:scale-[1.01] hover:shadow-md hover:shadow-accent/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Reply
                            <ChevronRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted text-xs font-semibold gap-2 w-full md:w-3/5">
            <ShieldAlert className="h-5 w-5 text-muted animate-pulse" />
            Select a message from the column to read details.
          </div>
        )}
      </div>
    </Card>
  );
}
