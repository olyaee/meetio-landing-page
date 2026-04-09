import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: false,
      maskTextSelector: ".ph-mask",
    },
  });
}
