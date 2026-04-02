"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle } from "lucide-react";

let showToastFn: ((msg: string) => void) | null = null;

export function toast(message: string) {
  showToastFn?.(message);
}

export function ToastProvider() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  useEffect(() => {
    showToastFn = show;
    return () => { showToastFn = null; };
  }, [show]);

  return (
    <div
      className="fixed bottom-6 left-4 right-4 mx-auto md:left-1/2 md:right-auto md:mx-0 md:w-auto z-[100] flex items-center justify-center gap-2 bg-foreground text-white px-5 py-3 rounded-2xl md:rounded-full shadow-lg text-sm font-medium transition-all duration-300 pointer-events-none md:-translate-x-1/2"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? undefined
          : "translateY(20px)",
      }}
    >
      <CheckCircle size={16} className="text-green-400" />
      {message}
    </div>
  );
}
