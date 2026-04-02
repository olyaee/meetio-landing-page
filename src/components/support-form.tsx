"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "@/components/toast";

type FormState = "idle" | "loading" | "error";

export function SupportForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setEmail("");
      setSubject("");
      setMessage("");
      setState("idle");
      toast("Message sent! We'll get back to you soon.");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Your email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
      />
      <input
        type="text"
        placeholder="Subject *"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        className="px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
      />
      <textarea
        placeholder="Your message *"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        className="px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
      />
      {state === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={state === "loading"}
        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-white rounded-lg text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50 cursor-pointer"
      >
        {state === "loading" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={14} />
        )}
        {state === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
