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
  starred?: boolean;
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

  // Filtration & Sorting & Pagination States (SS Style)
  const [filterType, setFilterType] = useState<"all" | "unread" | "read" | "starred">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [starredIds, setStarredIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Reset pagination page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchQuery]);

  // Fetch Hostinger emails on mount and merge them into the feed
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
              
              // Return all contacts, sorting will be performed dynamically
              return combined;
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

  // Toggle local starred status
  function handleToggleStar(id: string, e: React.MouseEvent) {
    e.stopPropagation(); // Prevent card selection click event
    setStarredIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  // 1. Filter contacts based on search query
  const searchedContacts = contacts.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // 2. Filter contacts based on selected filtration pill (SS Style)
  const filteredContacts = searchedContacts.filter((c) => {
    const isStarred = starredIds.includes(c.id) || !!c.starred;
    if (filterType === "unread") return !c.read;
    if (filterType === "read") return c.read;
    if (filterType === "starred") return isStarred;
    return true; // "all"
  });

  // 3. Sort contacts dynamically based on sortOrder
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
  });

  // 4. Calculate pagination bounds
  const totalPages = Math.ceil(sortedContacts.length / itemsPerPage) || 1;
  const paginatedContacts = sortedContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

          {/* Filtration & Pagination Bar (Matches SS exactly) */}
          <div className="px-4 py-2 border-b border-border/40 bg-surface/20 flex items-center justify-between text-xs text-muted font-bold select-none">
            {/* Left Section: Select checkbox dropdown + Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pr-1.5">
              <div 
                title="Mark all paginated mails as read"
                onClick={() => {
                  const allRead = paginatedContacts.every(c => c.read);
                  paginatedContacts.forEach(c => {
                    if (c.read === allRead) {
                      handleToggleRead(c.id, c.read);
                    }
                  });
                }}
                className="flex items-center gap-0.5 cursor-pointer hover:bg-surface/80 p-1 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={paginatedContacts.length > 0 && paginatedContacts.every(c => c.read)}
                  onChange={() => {}}
                  className="rounded border-border bg-background text-accent focus:ring-accent h-3.5 w-3.5 cursor-pointer"
                />
                <ChevronRight className="h-3 w-3 rotate-90 text-muted" />
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tight transition-all cursor-pointer border ${
                    filterType === "all"
                      ? "bg-foreground text-background dark:bg-foreground dark:text-background border-transparent"
                      : "border-border/80 hover:border-foreground hover:bg-background text-muted"
                  }`}
                >
                  All mail
                </button>
                <button
                  onClick={() => setFilterType("unread")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tight transition-all cursor-pointer border ${
                    filterType === "unread"
                      ? "bg-foreground text-background dark:bg-foreground dark:text-background border-transparent"
                      : "border-border/80 hover:border-foreground hover:bg-background text-muted"
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilterType("read")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tight transition-all cursor-pointer border ${
                    filterType === "read"
                      ? "bg-foreground text-background dark:bg-foreground dark:text-background border-transparent"
                      : "border-border/80 hover:border-foreground hover:bg-background text-muted"
                  }`}
                >
                  Read
                </button>
                <button
                  onClick={() => setFilterType("starred")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tight transition-all cursor-pointer border ${
                    filterType === "starred"
                      ? "bg-foreground text-background dark:bg-foreground dark:text-background border-transparent"
                      : "border-border/80 hover:border-foreground hover:bg-background text-muted"
                  }`}
                >
                  Starred
                </button>
              </div>
            </div>

            {/* Right Section: Sort Icon + Page Controls */}
            <div className="flex items-center gap-2 border-l border-border/40 pl-2 shrink-0">
              <button
                onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
                title="Sort messages by date"
                className="p-1 rounded hover:bg-surface/80 text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                <svg
                  className={`h-4 w-4 transform transition-transform duration-300 ${
                    sortOrder === "asc" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9M3 12h5m0 0v6m0 0l3-3m-3 3l-3-3" />
                </svg>
              </button>

              <div className="flex items-center gap-1.5 text-[10px] font-extrabold select-none">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-0.5 rounded hover:bg-surface/80 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <span className="tabular-nums">
                  {currentPage}/{totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages || sortedContacts.length === 0}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="p-0.5 rounded hover:bg-surface/80 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* List Wrapper */}
          <div className="flex-grow overflow-y-auto divide-y divide-border/40">
            {paginatedContacts.length > 0 ? (
              paginatedContacts.map((contact) => {
                const isSelected = contact.id === selectedId;
                const isHostinger = contact.sourceType === "hostinger";
                const isStarred = starredIds.includes(contact.id) || !!contact.starred;
                
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
                        {/* Star icon (SS / Gmail style) */}
                        <button
                          onClick={(e) => handleToggleStar(contact.id, e)}
                          title={isStarred ? "Unstar message" : "Star message"}
                          className={`p-0.5 rounded transition-colors ${
                            isStarred ? "text-amber-500 hover:text-amber-600" : "text-muted hover:text-foreground"
                          }`}
                        >
                          <svg
                            className={`h-3.5 w-3.5 ${isStarred ? "fill-current" : "fill-none stroke-current"}`}
                            viewBox="0 0 20 20"
                            strokeWidth={2}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>

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
                No messages found matching active filters.
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
              {/* Subject Line */}
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-foreground mb-4 leading-tight">
                  {selectedContact.subject}
                </h2>
                
                {/* Sender Info Block (Gmail/Superhuman Style) */}
                <div className="flex items-start justify-between gap-4 border-b border-border/30 pb-5">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    {(() => {
                      const initial = selectedContact.name ? selectedContact.name.charAt(0).toUpperCase() : "U";
                      const colors = [
                        "from-blue-500 to-indigo-600",
                        "from-emerald-500 to-teal-600",
                        "from-rose-500 to-pink-600",
                        "from-amber-500 to-orange-600",
                        "from-purple-500 to-violet-600",
                        "from-cyan-500 to-blue-600"
                      ];
                      const colorIndex = selectedContact.name.charCodeAt(0) % colors.length;
                      const avatarColor = colors[colorIndex];
                      return (
                        <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${avatarColor} flex items-center justify-center text-white text-sm font-black shadow-sm select-none`}>
                          {initial}
                        </div>
                      );
                    })()}
                    
                    {/* Name & Recipient */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-foreground text-xs sm:text-sm">{selectedContact.name}</span>
                        <span className="text-[10px] sm:text-xs text-muted font-semibold">&lt;{selectedContact.email}&gt;</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-muted font-bold">to me</span>
                        {selectedContact.sourceType === "hostinger" ? (
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-extrabold tracking-wider text-[8px] border border-blue-500/10">
                            Hostinger Mail
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-extrabold tracking-wider text-[8px] border border-emerald-500/10">
                            Website Form
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] text-muted font-bold whitespace-nowrap pt-1">
                    {new Date(selectedContact.date).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </span>
                </div>
              </div>

              {/* Message body - clean text container */}
              <div className="text-foreground/90 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words bg-surface/30 dark:bg-background/20 border border-border/20 rounded-2xl p-6 font-medium shadow-sm">
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
