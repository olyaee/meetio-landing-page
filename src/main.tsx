import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { PostHogProvider } from "posthog-js/react";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: "2025-05-24",
        capture_exceptions: true,
        debug: import.meta.env.MODE === "development",
        disable_session_recording: false,
        session_recording: {
          maskAllInputs: false,
          maskTextSelector: ".ph-mask",
        },
      }}
    >
      <App />
    </PostHogProvider>
  </StrictMode>
);