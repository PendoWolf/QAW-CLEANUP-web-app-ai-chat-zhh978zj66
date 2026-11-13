// Pendo Track Events. The Pendo agent attaches the visitor and account to every
// event, so callers only pass event-specific properties.
type TrackProperties = Record<string, string | number | boolean>;

interface PendoAgent {
  track: (eventName: string, properties?: TrackProperties) => void;
}

declare global {
  interface Window {
    pendo?: PendoAgent;
  }
}

/** Sends a Pendo Track Event. Does nothing when the Pendo agent isn't loaded, and never throws. */
export function trackEvent(eventName: string, properties?: TrackProperties): void {
  try {
    window.pendo?.track(eventName, properties);
  } catch (e) {
    console.warn(`Pendo track "${eventName}" failed`, e);
  }
}
