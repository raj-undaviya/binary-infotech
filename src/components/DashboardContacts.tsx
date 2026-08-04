"use client";

import { useState } from "react";
import { markContactReadState, deleteContactMessage } from "@/app/actions";
import { ContactMessage } from "@/lib/db";
import { Check, Mail, MailOpen, Trash2, Calendar, User, ShieldAlert } from "lucide-react";
import Card from "./design-system/Card";
import Button from "./design-system/Button";

export default function DashboardContacts({ initialContacts }: { initialContacts: ContactMessage[] }) {
  const [contacts, setContacts] = useState<ContactMessage[]>(initialContacts);

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
      }
    }
  }

  return (
    <Card variant="default" className="p-6 border border-border bg-surface/50 backdrop-blur-sm card-border">
      <div className="flex items-center justify-between mb-6 border-b border-border/40 pb-4">
        <div>
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-widest">Recent Messages</h3>
          <p className="text-[10px] text-muted font-medium mt-0.5">Inbox sync</p>
        </div>
        <span className="text-[10px] text-accent font-extrabold bg-accent/10 border border-accent/15 px-2.5 py-1 rounded-full">
          {contacts.filter(c => !c.read).length} Unread
        </span>
      </div>

      {contacts.length > 0 ? (
        <div className="divide-y divide-border/40 space-y-4">
          {contacts.slice(0, 5).map((contact) => (
            <div key={contact.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-xl min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${contact.read ? 'bg-border' : 'bg-accent animate-pulse'}`} />
                  <h4 className="text-xs font-bold text-foreground truncate">{contact.subject}</h4>
                </div>
                
                <p className="text-xs text-muted leading-relaxed line-clamp-2 pr-4 font-medium">
                  {contact.message}
                </p>

                <div className="flex items-center gap-4 text-[10px] text-muted font-bold">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {contact.name} ({contact.email})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(contact.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 self-end sm:self-center">
                <button
                  onClick={() => handleToggleRead(contact.id, contact.read)}
                  title={contact.read ? "Mark as unread" : "Mark as read"}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    contact.read
                      ? "text-muted border-border hover:text-foreground hover:bg-surface"
                      : "text-accent bg-accent/10 border-accent/25 hover:bg-accent/20"
                  }`}
                >
                  {contact.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  title="Delete message"
                  className="p-2 rounded-lg border border-border text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted text-xs font-medium flex flex-col items-center gap-2 justify-center">
          <ShieldAlert className="h-5 w-5 text-muted" />
          No contact submissions found in your database.
        </div>
      )}
    </Card>
  );
}
