import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NODE_ENV === "development"
    ? (process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com")
    : "/ph";
const ENABLE_WEB_VITALS_ATTRIBUTION = false;

if (POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    ui_host: "https://eu.posthog.com",
    capture_exceptions: true,
    capture_performance: {
      network_timing: true,
      web_vitals: true,
      web_vitals_attribution: ENABLE_WEB_VITALS_ATTRIBUTION,
    },
    capture_heatmaps: true,
    capture_dead_clicks: true,
    capture_pageleave: true,
    enable_recording_console_log: true,
    mask_personal_data_properties: true,
    debug: process.env.NODE_ENV === "development",
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: false,
      maskTextSelector: ".ph-mask",
      recordHeaders: true,
    },
    request_queue_config: {
      flush_interval_ms: 1000,
    },
  });
}
