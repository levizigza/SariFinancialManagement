"use client";

import { useEffect, useRef, useState } from "react";
import type { ContactActionState } from "@/lib/contact/action-state";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldHint,
  Input,
  Label,
  Select,
  Textarea,
} from "@/components/ui/field";
import { TextLink } from "@/components/ui/text-link";
import { analyticsClickAttrs } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import {
  contactServiceLabels,
  contactServiceValues,
  type ContactServiceValue,
} from "@/lib/contact/options";
import { site } from "@/lib/site";

const initialState: ContactActionState = {
  ok: false,
  message: "",
};

/**
 * Static hosts (GitHub Pages) cannot run Server Actions / Resend.
 * The form opens a prefilled mailto draft instead.
 */
function buildMailtoHref(fields: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): string {
  const serviceLabel =
    contactServiceLabels[fields.service as ContactServiceValue] ??
    fields.service;
  const subject = `Consultation request: ${fields.name} (${serviceLabel})`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "(not provided)"}`,
    `Service of interest: ${serviceLabel}`,
    "",
    "Message:",
    fields.message,
  ].join("\n");

  return `${site.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [state, setState] = useState<ContactActionState>(initialState);
  const [pending, setPending] = useState(false);
  const started = useRef(false);
  const lastSubmitKey = useRef<string | null>(null);

  useEffect(() => {
    if (!state.message) return;
    const key = `${state.ok}:${state.message}`;
    if (lastSubmitKey.current === key) return;
    lastSubmitKey.current = key;

    trackEvent("contact_form_submit", {
      location: "contact_page",
      status: state.ok ? "success" : "error",
    });
  }, [state.message, state.ok]);

  function markFormStart() {
    if (started.current) return;
    started.current = true;
    trackEvent("contact_form_start", { location: "contact_page" });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (String(formData.get("website") ?? "").trim()) {
      setState({
        ok: true,
        message:
          "Thank you. Please send the email from your mail app to complete your request.",
      });
      return;
    }

    const fields = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    const fieldErrors: ContactActionState["fieldErrors"] = {};
    if (!fields.name) fieldErrors.name = "Please enter your name.";
    if (!fields.email || !fields.email.includes("@")) {
      fieldErrors.email = "Please enter a valid email.";
    }
    if (!fields.service) fieldErrors.service = "Please select a service.";
    if (!fields.message || fields.message.length < 10) {
      fieldErrors.message =
        "Please share a short message (at least a few words).";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setState({
        ok: false,
        message: "Please correct the highlighted fields.",
        fieldErrors,
      });
      return;
    }

    setPending(true);
    window.location.href = buildMailtoHref(fields);
    setState({
      ok: true,
      message:
        "Your email app should open next. Send the message there to reach Sari Financial Management.",
    });
    setPending(false);
  }

  return (
    <form
      className="relative grid gap-5"
      onSubmit={onSubmit}
      noValidate
      onFocusCapture={markFormStart}
    >
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.message && !state.ok ? (
        <div
          role="alert"
          className="rounded-md border border-text-error/25 bg-surface-ivory px-4 py-3"
        >
          <p className="m-0 font-sans text-sm text-text-error">{state.message}</p>
        </div>
      ) : null}

      <p className="m-0 font-sans text-sm text-navy-800">
        Submitting opens your email app with a draft to {site.email}. You can
        also call or email directly below.
      </p>

      <Field>
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          placeholder="Your name"
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={
            state.fieldErrors?.name ? "contact-name-error" : undefined
          }
        />
        {state.fieldErrors?.name ? (
          <FieldHint error id="contact-name-error">
            {state.fieldErrors.name}
          </FieldHint>
        ) : null}
      </Field>

      <Field>
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@example.com"
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.fieldErrors?.email ? "contact-email-error" : undefined
          }
        />
        {state.fieldErrors?.email ? (
          <FieldHint error id="contact-email-error">
            {state.fieldErrors.email}
          </FieldHint>
        ) : null}
      </Field>

      <Field>
        <Label htmlFor="contact-phone">Phone (optional)</Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          placeholder={site.phoneDisplay}
          aria-invalid={Boolean(state.fieldErrors?.phone)}
          aria-describedby={
            state.fieldErrors?.phone ? "contact-phone-error" : undefined
          }
        />
        {state.fieldErrors?.phone ? (
          <FieldHint error id="contact-phone-error">
            {state.fieldErrors.phone}
          </FieldHint>
        ) : null}
      </Field>

      <Field>
        <Label htmlFor="contact-service">Service of interest</Label>
        <Select
          id="contact-service"
          name="service"
          required
          defaultValue=""
          aria-invalid={Boolean(state.fieldErrors?.service)}
          aria-describedby={
            state.fieldErrors?.service ? "contact-service-error" : undefined
          }
        >
          <option value="" disabled>
            Select a service…
          </option>
          {contactServiceValues.map((value) => (
            <option key={value} value={value}>
              {contactServiceLabels[value]}
            </option>
          ))}
        </Select>
        {state.fieldErrors?.service ? (
          <FieldHint error id="contact-service-error">
            {state.fieldErrors.service}
          </FieldHint>
        ) : null}
      </Field>

      <Field>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          maxLength={4000}
          placeholder="Share a short overview of your bookkeeping, payroll, tax, or advisory needs—without sensitive account details."
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={
            state.fieldErrors?.message
              ? "contact-message-error contact-message-hint"
              : "contact-message-hint"
          }
        />
        {state.fieldErrors?.message ? (
          <FieldHint error id="contact-message-error">
            {state.fieldErrors.message}
          </FieldHint>
        ) : null}
        <FieldHint id="contact-message-hint">
          Do not include SIN, banking information, CRA passwords, tax documents,
          financial statements, or government ID. Sensitive financial documents
          should only be transmitted using an approved secure method once the
          business establishes one—until then, describe your needs in general
          terms.
        </FieldHint>
      </Field>

      <p className="font-sans text-sm text-blue-muted m-0">
        By submitting, you agree we may use these details to respond to your
        inquiry. See our <TextLink href="/privacy">Privacy Policy</TextLink>. We
        collect only name, email, optional phone, service of interest, and your
        message.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Opening email…" : site.cta.label}
        </Button>
        {state.message && state.ok ? (
          <p
            className="font-sans text-sm text-navy-900 m-0"
            role="status"
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}
      </div>

      <p className="font-sans text-sm text-blue-muted m-0">
        Prefer not to use the form? Call{" "}
        <a
          href={site.phoneHref}
          className="inline-flex min-h-11 items-center font-semibold text-navy-900 underline-offset-[0.2em] hover:underline rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800"
          {...analyticsClickAttrs("phone_click", "contact_form")}
        >
          {site.phoneDisplay}
        </a>{" "}
        or email{" "}
        <a
          href={site.emailHref}
          className="inline-flex min-h-11 items-center font-semibold text-navy-900 underline-offset-[0.2em] hover:underline rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800"
          {...analyticsClickAttrs("email_click", "contact_form")}
        >
          {site.email}
        </a>
        .
      </p>
    </form>
  );
}
