"use client";

import { useState, useEffect } from "react";
import { markContactReadState, deleteContactMessage } from "@/app/actions";
import { ContactMessage } from "@/lib/db";
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
  Loader2
} from "lucide-react";
import Card from "./design-system/Card";
import Button from "./design-system/Button";

export default function AdminContactsInbox({ initialContacts }: { initialContacts: ContactMessage[] }) {
  const [contacts, setContacts] = useState<ContactMessage[]>(initialContacts);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialContacts.length > 0 ? initialContacts[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  
  // Composer states
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [replyStatus, setReplyStatus] = useState<{ success: boolean; message: string } | null>(null);

  const selectedContact = contacts.find(c => c.id === selectedId);

  // Clear/Reset composer states when contact changes
  useEffect(() => {
    setReplyText("");
    setReplyStatus(null);
  }, [selectedId]);

  const filteredContacts = contacts.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  async function handleToggleRead(id: string, currentRead: boolean) {
    const success = await markContactReadState(id, !currentRead);
    if (success) {
      setContacts(prev =>
        prev.map(c => (c.id === id ? { ...c, read: !currentRead } : c))
      );
    }
  }

  async function handleDelete(id: string) {
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
        
        // Automatically mark as read if not already read
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
    <Card variant="default" className="bg-surface/50 border border-border/80 rounded-3xl overflow-hidden shadow-sm h-[calc(100vh-140px)] flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Messages list column */}
        <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-border/60 flex flex-col h-1/2 md:h-full bg-background/25">
          
          {/* Search Header */}
          <div className="p-4 border-b border-border/60">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted h-4 w-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* List Wrapper */}
          <div className="flex-grow overflow-y-auto divide-y divide-border/40">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => {
                const isSelected = contact.id === selectedId;
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
                    {/* Active accent vertical bar */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent" />
                    )}

                    <div className="flex items-center justify-between text-[10px] text-muted font-bold uppercase tracking-wider">
                      <span>{new Date(contact.date).toLocaleDateString()}</span>
                      {!contact.read && (
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      )}
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
                  title="Delete message"
                  className="p-2 rounded-lg border border-border text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
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
                      {/* Fallback mailto button */}
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
