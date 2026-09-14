import { escapeHtml, sanitizeHeaderValue } from "@/lib/contact/encode";
import {
  contactServiceLabels,
  type ContactFormInput,
} from "@/lib/contact/schema";
import { site } from "@/lib/site";

export type SendContactResult =
  | { ok: true; mode: "resend" | "log" }
  | { ok: false; reason: "config" | "provider" };

function buildBodies(data: ContactFormInput) {
  const serviceLabel = contactServiceLabels[data.service];
  const phoneLine = data.phone ? data.phone : "(not provided)";

  const text = [
    `New consultation request from ${site.name} website`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${phoneLine}`,
    `Service of interest: ${serviceLabel}`,
    "",
    "Message:",
    data.message,
    "",
    "—",
    "Submitted via the public contact form. Do not expect SIN, banking, CRA credentials, or documents in this channel.",
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #0a1628;">
  <h1 style="font-size: 1.25rem;">New consultation request</h1>
  <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
  <p><strong>Phone:</strong> ${escapeHtml(phoneLine)}</p>
  <p><strong>Service of interest:</strong> ${escapeHtml(serviceLabel)}</p>
  <p><strong>Message:</strong></p>
  <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
  <hr />
  <p style="font-size: 0.875rem; color: #5a6a7a;">
    Submitted via the public contact form. Sensitive financial documents and credentials must not be collected through this channel.
  </p>
</body>
</html>`.trim();

  return { text, html };
}

/**
 * Deliver contact inquiry. Uses Resend when configured; otherwise logs in
 * development so local work does not require secrets.
 */
export async function sendContactMessage(
  data: ContactFormInput,
): Promise<SendContactResult> {
  const { text, html } = buildBodies(data);
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = (process.env.CONTACT_TO_EMAIL ?? site.email).trim();
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    `${site.name} Website <onboarding@resend.dev>`;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY is not configured");
      return { ok: false, reason: "config" };
    }
    console.info("[contact] Dev delivery (no RESEND_API_KEY):\n", text);
    return { ok: true, mode: "log" };
  }

  try {
    const subject = sanitizeHeaderValue(
      `Consultation request: ${data.name} (${contactServiceLabels[data.service]})`,
    );

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Provider rejected email", res.status);
      return { ok: false, reason: "provider" };
    }

    return { ok: true, mode: "resend" };
  } catch {
    console.error("[contact] Provider request failed");
    return { ok: false, reason: "provider" };
  }
}
