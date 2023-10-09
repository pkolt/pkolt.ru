import { onCLS, onFID, onLCP, type ReportCallback } from 'web-vitals';

declare global {
  function gtag(...args: any[]): void;
}

const sendToGoogleAnalytics: ReportCallback = ({ delta, id, name, value }) => {
  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/ga4
  gtag('event', name, {
    metric_delta: delta, // Optional.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    // Built-in params:
    value: delta, // Use `delta` so the value can be summed.

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-performance-in-the-field/
    // metric_rating: 'good' | 'needs-improvement' | 'poor',
    // debug_info: '...',
    // ...
  });
};

if (!import.meta.env.SSR) {
  onCLS(sendToGoogleAnalytics);
  onFID(sendToGoogleAnalytics);
  onLCP(sendToGoogleAnalytics);
}
