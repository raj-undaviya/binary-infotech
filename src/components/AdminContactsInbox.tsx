"use client";

import { useState } from "react";
import { markContactReadState, deleteContactMessage } from "@/app/actions";
import { ContactMessage } from "@/lib/db";
import { Check, Mail, MailOpen, Trash2, Calendar, User, Search, MessageSquare, ChevronRight, ShieldAlert } from "lucide-react";
import Card from "./design-system/Card";
import Button from "./design-system/Button";

export default function AdminContactsInbox({ initialContacts }: { initialContacts: ContactMessage[] }) {
  const [contacts, setContacts] = useState<ContactMessage[]>(initialContacts);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialContacts.length > 0 ? initialContacts[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const selectedContact = contacts.find(c => c.id === selectedId);

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

  return (
    <Card variant="default" className="border border-border overflow-hidden flex flex-col lg:flex-row h-[600px] bg-surface/50 backdrop-blur-sm card-border p-0">
      
      {/* Messages List Pane (Left Column) */}
      <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-border flex flex-col bg-surface/30">
        
        {/* Search Header */}
        <div className="p-4 border-b border-border/60 flex items-center gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Message Items Scroll List */}
        <div className="flex-grow overflow-y-auto divide-y divide-border/20">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => {
              const isSelected = contact.id === selectedId;
              return (
                <button
                  key={contact.id}
                  onClick={() => {
                    setSelectedId(contact.id);
                    if (!contact.read) {
                      handleToggleRead(contact.id, false);
                    }
                  }}
                  className={`w-full text-left p-4 hover:bg-surface/80 transition-colors flex items-start justify-between gap-4 cursor-pointer ${
                    isSelected ? "bg-surface border-l-4 border-accent" : ""
                  }`}
                >
                  <div className="space-y-1 w-full min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground truncate">{contact.name}</span>
                      <span className="text-[9px] text-muted whitespace-nowrap">
                        {new Date(contact.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className={`text-xs truncate ${contact.read ? "text-muted font-medium" : "text-foreground font-bold"}`}>
                      {contact.subject}
                    </h4>
                    <p className="text-[11px] text-muted truncate leading-normal font-medium">
                      {contact.message}
                    </p>
                  </div>
                  
                  {!contact.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2.5 animate-pulse" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="text-center py-12 text-muted text-xs font-medium">
              No messages found.
            </div>
          )}
        </div>
      </div>

      {/* Message Reader Pane (Right Column) */}
      <div className="flex-grow flex flex-col bg-background h-full min-w-0">
        {selectedContact ? (
          <div className="flex flex-col h-full">
            {/* Action Bar */}
            <div className="p-4 border-b border-border/60 flex items-center justify-between bg-surface/20">
              <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider flex items-center gap-1.5">
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
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground mb-2 leading-tight">{selectedContact.subject}</h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/40 pb-4 text-xs text-muted font-medium">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-foreground">{selectedContact.name}</span>
                    <span>&lt;{selectedContact.email}&gt;</span>
                  </div>
                  <span>Received {new Date(selectedContact.date).toLocaleString()}</span>
                </div>
              </div>

              {/* Message text */}
              <div className="text-foreground text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-surface/50 border border-border/40 rounded-2xl p-6 font-medium">
                {selectedContact.message}
              </div>

              <div className="pt-4">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                >
                  <Button variant="primary" size="md" className="flex items-center gap-1">
                    Reply via Email
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted text-xs font-medium gap-2">
            <ShieldAlert className="h-5 w-5 text-muted" />
            Select a message from the column to read details.
          </div>
        )}
      </div>
    </Card>
  );
}
