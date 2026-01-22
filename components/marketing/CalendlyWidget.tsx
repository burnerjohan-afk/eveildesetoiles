"use client";

import { useEffect } from "react";

interface CalendlyWidgetProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
  };
}

export function CalendlyWidget({ url, prefill }: CalendlyWidgetProps) {
  useEffect(() => {
    // Charger le script Calendly
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Nettoyer le script au démontage
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const calendlyUrl = prefill
    ? `${url}?name=${encodeURIComponent(prefill.name || "")}&email=${encodeURIComponent(prefill.email || "")}`
    : url;

  return (
    <div className="calendly-inline-widget" data-url={calendlyUrl} style={{ minWidth: "320px", height: "700px" }}>
      <div className="calendly-spinner">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
