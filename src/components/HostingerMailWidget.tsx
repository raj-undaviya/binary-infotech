"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  ExternalLink, 
  X, 
  Loader2, 
  AlertTriangle, 
  CheckCircle,
  Inbox,
  User,
  Calendar,
  Key
} from "lucide-react";

interface HostingerEmail {
  uid: number;
  subject: string;
  from: string;
  date: string;
}

export default function HostingerMailWidget() {
  const [data, setData] = useState<{
    status: string;
    email: string;
    count: number;
    emails: HostingerEmail[];
    error?: string;
  } | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/emails");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching emails:", err);
      setData({
        status: "CONNECTION_FAILED",
        email: "info@binaries.org.in",
        count: 0,
        emails: [],
        error: "Failed to connect to local server endpoint"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
    // Poll every 2 minutes
    const interval = setInterval(fetchEmails, 120000);
    return () => clearInterval(interval);
  }, []);

  // Determine Badge/Status styling
  let statusBadge = null;
  if (loading && !data) {
    statusBadge = <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />;
  } else if (data) {
    if (data.status === "CONFIG_REQUIRED") {
      statusBadge = <Key className="h-3.5 w-3.5 text-amber-500 animate-pulse" />;
    } else if (data.status === "CONNECTION_FAILED") {
      statusBadge = <AlertTriangle className="h-3.5 w-3.5 text-red-500" />;
    } else if (data.count > 0) {
      statusBadge = (
        <span className="flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
          {data.count}
        </span>
      );
    } else {
      statusBadge = <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />;
    }
  }

  return (
    <>
      {/* Sidebar Navigation Link/Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-background/80 transition-all text-xs font-bold border border-transparent hover:border-border cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-accent" />
          <span>Hostinger Mail</span>
        </div>
        {statusBadge}
      </button>

      {/* Popover/Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            
            {/* Background design glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-accent/5 rounded-full filter blur-[50px] pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-accent/15 text-accent">
                  <Inbox className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight leading-snug">
                    info@binaries.org.in
                  </h3>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5">
                    Hostinger IMAP notifications
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-border text-muted hover:text-foreground hover:bg-background transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 relative z-10">
              
              {loading && (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Loader2 className="h-6 w-6 animate-spin text-accent" />
                  <p className="text-xs text-muted font-semibold">Contacting Hostinger mail servers...</p>
                </div>
              )}

              {!loading && data && (
                <>
                  {/* Status checks */}
                  {data.status === "CONFIG_REQUIRED" && (
                    <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-xs leading-relaxed text-amber-600 dark:text-amber-400">
                      <Key className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-500" />
                      <div>
                        <h4 className="font-extrabold uppercase tracking-wider mb-1 text-[10px]">Credentials Required</h4>
                        <p className="font-semibold">
                          To display real-time notifications for your Hostinger mail account, please configure your Hostinger password inside the `.env` file of your workspace:
                        </p>
                        <code className="block mt-2 p-2 bg-background border border-border rounded font-mono text-[9px] text-foreground">
                          HOSTINGER_EMAIL=info@binaries.org.in<br />
                          HOSTINGER_PASSWORD=your_hostinger_password
                        </code>
                        <p className="mt-2 font-semibold">
                          Restart the server (`npm run dev`) after adding these variables.
                        </p>
                      </div>
                    </div>
                  )}

                  {data.status === "CONNECTION_FAILED" && (
                    <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-3 text-xs leading-relaxed text-red-500">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold uppercase tracking-wider mb-1 text-[10px]">IMAP Connection Failure</h4>
                        <p className="font-semibold">
                          Could not establish connection to <strong>imap.hostinger.com</strong>:
                        </p>
                        <p className="font-mono text-[10px] mt-1.5 p-2 bg-background border border-border rounded text-foreground overflow-x-auto">
                          {data.error || "Authentication failure or connection timeout"}
                        </p>
                        <p className="mt-2 font-semibold text-muted">
                          Double check that your password in `.env` matches your Hostinger email account settings.
                        </p>
                      </div>
                    </div>
                  )}

                  {data.status === "SUCCESS" && (
                    <>
                      {data.count === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center gap-3 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-6">
                          <CheckCircle className="h-8 w-8 text-emerald-500 animate-pulse" />
                          <div>
                            <p className="text-xs font-bold text-foreground">All caught up!</p>
                            <p className="text-[11px] text-muted font-medium mt-1">
                              No unread messages found in your Hostinger Inbox folder.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-muted uppercase tracking-wider">
                            <span>Unread Messages ({data.count})</span>
                            <span className="text-accent">Latest 5 shown</span>
                          </div>

                          <div className="space-y-2.5">
                            {data.emails.map((mail) => (
                              <div 
                                key={mail.uid} 
                                className="p-4 rounded-xl bg-surface/80 border border-border/80 hover:border-accent/40 hover:bg-background transition-all shadow-sm"
                              >
                                <h4 className="text-xs font-bold text-foreground line-clamp-1 mb-1.5">
                                  {mail.subject}
                                </h4>
                                
                                <div className="flex flex-wrap items-center gap-4 text-[9px] text-muted font-semibold">
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3 text-accent" />
                                    {mail.from}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3 text-accent" />
                                    {new Date(mail.date).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit"
                                    })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

            </div>

            {/* Modal Footer */}
            <div className="border-t border-border/60 pt-4 mt-6 flex items-center justify-between relative z-10 gap-3">
              <button
                onClick={fetchEmails}
                disabled={loading}
                className="px-3.5 py-2 rounded-lg border border-border text-[10px] font-bold text-muted hover:text-foreground hover:bg-background transition-colors disabled:opacity-40 cursor-pointer"
              >
                Refresh
              </button>
              
              <a
                href="https://mail.hostinger.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-accent text-white text-[10px] font-bold rounded-lg hover:bg-secondary transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-accent/10"
              >
                Go to Hostinger Webmail
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
