"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { usePostHog } from "@/components/posthog-provider";

type FormState = "idle" | "loading" | "error";

export function DemoForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const posthog = usePostHog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      posthog?.capture("form_submitted", { form_type: "demo_request", has_company: !!company });
      posthog?.identify(email, { name, company: company || undefined });

      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setState("idle");
      onSuccess?.();
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      posthog?.capture("form_error", { form_type: "demo_request" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 min-w-0 px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 min-w-0 px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
      </div>
      <input
        type="text"
        placeholder="Company (optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
      />
      <textarea
        placeholder="Tell us about your use case (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
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
        {state === "loading" ? "Sending..." : "Request a demo"}
      </button>
    </form>
  );
}
