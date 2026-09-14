/**
 * In-memory sliding-window rate limiter for serverless-friendly single-instance
 * and long-lived Node hosts. On multi-instance serverless, limits are best-effort
 * per instance; document upgrades (Redis/Upstash) in SECURITY.md.
 */

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

function prune(bucket: Bucket, now: number) {
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);
}

export function checkContactRateLimit(key: string): {
  ok: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }
  prune(bucket, now);

  if (bucket.timestamps.length >= MAX_REQUESTS) {
    const oldest = bucket.timestamps[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((WINDOW_MS - (now - oldest)) / 1000),
    );
    return { ok: false, retryAfterSeconds };
  }

  bucket.timestamps.push(now);
  return { ok: true };
}

export const CONTACT_RATE_LIMIT_MESSAGE =
  "Too many messages were sent from this connection. Please wait a few minutes and try again, or call us directly.";
