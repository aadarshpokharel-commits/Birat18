import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { getCustomerBookings, getWorkerBookings } from "@/api/booking";
import { getConversation, sendMessage, markMessagesRead, type Message } from "@/api/message";
import { getWorkerByUserId } from "@/api/worker";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — SkillHire" },
      {
        name: "description",
        content: "Chat with SkillHire workers to coordinate your booking in real time.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MessagesPage,
});

interface Contact {
  userId: number;
  name: string;
  subtitle: string;
  initials: string;
  color: string;
}

const COLORS = [
  "#f59e0b",
  "#0ea5e9",
  "#a16207",
  "#ec4899",
  "#334155",
  "#22c55e",
  "#8b5cf6",
  "#ef4444",
];

function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function colorFor(id: number) {
  return COLORS[id % COLORS.length];
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function MessagesPage() {
  const [myUserId] = useState<number | null>(() => {
    const u = getUser();
    return u ? Number(u.id) : null;
  });
  const [myRole] = useState<string | null>(() => getUser()?.role ?? null);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [sending, setSending] = useState(false);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgBoxRef = useRef<HTMLDivElement>(null);
  const prevMsgCountRef = useRef<number>(0);

  useEffect(() => {
    if (!myUserId || !myRole) {
      setLoadingContacts(false);
      return;
    }

    let cancelled = false;

    async function loadContacts() {
      setLoadingContacts(true);
      try {
        const seen = new Set<number>();
        const list: Contact[] = [];

        if (myRole === "customer") {
          const bookings = await getCustomerBookings(myUserId!);
          for (const b of bookings) {
            // workerUserId is the worker's actual User id (added in Mapper fix)
            const contactId = b.workerUserId;
            if (contactId && contactId !== myUserId && !seen.has(contactId)) {
              seen.add(contactId);
              list.push({
                userId: contactId,
                name: b.workerName,
                subtitle: b.category,
                initials: initialsOf(b.workerName),
                color: colorFor(contactId),
              });
            }
          }
        } else if (myRole === "worker") {
          const wp = await getWorkerByUserId(myUserId!);
          const bookings = await getWorkerBookings(wp.id);
          for (const b of bookings) {
            const contactId = b.customerId;
            if (contactId && contactId !== myUserId && !seen.has(contactId)) {
              seen.add(contactId);
              list.push({
                userId: contactId,
                name: b.customerName,
                subtitle: "Customer",
                initials: initialsOf(b.customerName),
                color: colorFor(contactId),
              });
            }
          }
        }

        if (!cancelled) {
          setContacts(list);
          if (list.length > 0) setActiveContact(list[0]);
        }
      } catch (err) {
        console.error("Failed to load contacts:", err);
      } finally {
        if (!cancelled) setLoadingContacts(false);
      }
    }

    loadContacts();
    return () => {
      cancelled = true;
    };
  }, [myUserId, myRole]);

  // Poll messages every 3 seconds
  useEffect(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (!myUserId || !activeContact) return;

    async function fetchMessages() {
      try {
        const msgs = await getConversation(myUserId!, activeContact!.userId);
        setMessages((prev) => {
          if (msgs.length !== prev.length) return msgs;
          return prev;
        });
        // Always mark messages from this contact as read
        markMessagesRead(myUserId!, activeContact!.userId).catch(() => {});
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    }

    fetchMessages();
    pollRef.current = setInterval(fetchMessages, 3000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [myUserId, activeContact?.userId]);

  // Scroll the message box to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > prevMsgCountRef.current && msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
    prevMsgCountRef.current = messages.length;
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !myUserId || !activeContact || sending) return;

    const text = input.trim();
    setInput("");
    setSending(true);

    try {
      const msg = await sendMessage(myUserId, activeContact.userId, text);
      setMessages((prev) => [...prev, msg]);
    } catch (err) {
      console.error("Failed to send:", err);
      setInput(text);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-4 px-4 py-8 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <Card className="overflow-hidden p-0">
          <div className="border-b p-4 font-semibold">Chats</div>

          {loadingContacts && <p className="p-4 text-sm text-muted-foreground">Loading...</p>}

          {!loadingContacts && contacts.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">
              {myRole === "customer"
                ? "Book a worker to start chatting."
                : "Conversations appear when customers book you."}
            </p>
          )}

          <ul>
            {contacts.map((c) => (
              <li key={c.userId}>
                <button
                  onClick={() => {
                    setActiveContact(c);
                    setMessages([]);
                  }}
                  className={`flex w-full items-center gap-3 border-b p-3 text-left transition-colors hover:bg-secondary ${
                    activeContact?.userId === c.userId ? "bg-secondary" : ""
                  }`}
                >
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{c.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{c.subtitle}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          className="flex flex-col p-0 overflow-hidden"
          style={{ height: "calc(100vh - 180px)" }}
        >
          {activeContact ? (
            <>
              <div className="flex items-center gap-3 border-b p-4 bg-white">
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: activeContact.color }}
                >
                  {activeContact.initials}
                </div>
                <div>
                  <div className="font-semibold">{activeContact.name}</div>
                  <div className="text-xs text-muted-foreground">{activeContact.subtitle}</div>
                </div>
              </div>

              <div
                ref={msgBoxRef}
                className="flex-1 space-y-3 overflow-y-auto p-5"
                style={{ background: "#f0f4f8" }}
              >
                {messages.length === 0 && (
                  <p className="pt-8 text-center text-sm text-muted-foreground">
                    No messages yet. Say hello!
                  </p>
                )}
                {messages.map((m) => {
                  const isMe = m.senderId === myUserId;
                  return (
                    <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm"
                        style={{
                          background: isMe
                            ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                            : "linear-gradient(135deg, #00c9a7 0%, #00a86b 100%)",
                          color: "#ffffff",
                          border: "none",
                        }}
                      >
                        {m.content}
                        <div className="mt-1 text-[10px]" style={{ opacity: 0.6 }}>
                          {formatTime(m.sentAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSend} className="flex gap-2 border-t p-3 bg-white">
                <Input
                  placeholder="Type a message…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={sending}
                  autoComplete="off"
                />
                <Button type="submit" disabled={sending || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            !loadingContacts && (
              <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Select a conversation
              </div>
            )
          )}
        </Card>
      </div>

      <Footer />
    </div>
  );
}
