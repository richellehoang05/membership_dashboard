"use client";

import { useMemo, useState } from "react";

const GREETING_RESPONSES = [
  "Hi! I'm the CIC assistant. How can I help today?",
  "Hello there! Need help with your membership dashboard?",
  "Welcome! I'm here if you need anything.",
];

const fallbackResponse = "Thanks for the message. A team member can follow up soon.";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [
    { id: "greeting", from: "bot", text: GREETING_RESPONSES[0] },
  ]);

  const quickReplies = useMemo(
    () => ["Hello!", "Hi there", "Need help", "What can you do?"],
    [],
  );

  const handleSend = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const nextMessages = [
      ...messages,
      { id: `${Date.now()}-user`, from: "user", text: trimmed },
    ];

    const isGreeting = /(hi|hello|hey|good morning|good afternoon|good evening)/i.test(trimmed);
    const replyText = isGreeting
      ? GREETING_RESPONSES[nextMessages.length % GREETING_RESPONSES.length]
      : fallbackResponse;

    setMessages([
      ...nextMessages,
      { id: `${Date.now()}-bot`, from: "bot", text: replyText },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 rounded-2xl border border-zinc-200 bg-white shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
            <div>
              <p className="text-sm font-semibold text-zinc-900">CIC Chat</p>
              <p className="text-xs text-zinc-500">Basic greetings enabled</p>
            </div>
            <button
              type="button"
              className="rounded-full px-2 py-1 text-xs font-semibold text-zinc-500 hover:text-zinc-800"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto px-4 py-3 space-y-3 text-sm">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.from === "bot"
                    ? "rounded-xl bg-zinc-100 px-3 py-2 text-zinc-700"
                    : "rounded-xl bg-zinc-900 px-3 py-2 text-white ml-6"
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-100 px-4 py-3 space-y-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
                  onClick={() => handleSend(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSend(input);
                }}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
              <button
                type="button"
                onClick={() => handleSend(input)}
                className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-zinc-800"
        >
          Chat
        </button>
      )}
    </div>
  );
}
