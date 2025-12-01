import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Initialize PostHog
posthog.init("phc_jqqsUYTHT4IpWgC69alnHYHZqhL9vJLFUIKeuQR8V9A", {
  api_host: "https://us.i.posthog.com",
  person_profiles: "identified_only",
  capture_pageview: true,
  capture_pageleave: true,
});

createRoot(document.getElementById("root")!).render(<App />);
