"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldHint,
  Input,
  Label,
  Textarea,
} from "@/components/ui/field";
import { TextLink } from "@/components/ui/text-link";
import { trackEvent } from "@/lib/analytics/track";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type ReviewFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<
    Record<"name" | "email" | "rating" | "review" | "permission", string>
  >;
};

const initialState: ReviewFormState = {
  ok: false,
  message: "",
};

function buildMailtoHref(fields: {
  name: string;
  email: string;
  businessOrRole: string;
  rating: string;
  review: string;
  permission: boolean;
}): string {
  const subject = `Client review submission: ${fields.name}`;
  const body = [
    "A website visitor submitted a review for moderation.",
    "",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Business / role: ${fields.businessOrRole || "(not provided)"}`,
    `Rating: ${fields.rating} / 5`,
    `Permission to publish on the website: ${fields.permission ? "Yes" : "No"}`,
    "",
    "Review:",
    fields.review,
    "",
    "—",
    "Do not publish until you have verified this is a real client and approved the wording.",
  ].join("\n");

  return `${site.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type ReviewFormProps = {
  className?: string;
  /** Analytics location label */
  location?: string;
};

/**
 * Collects a review draft via the visitor’s email app (static hosting).
 * Nothing is published automatically — Sari must approve entries in
 * `src/content/testimonials.ts` before they appear on the site.
 */
export function ReviewForm({
  className,
  location = "reviews_page",
}: ReviewFormProps) {
  const [state, setState] = useState<ReviewFormState>(initialState);
  const [pending, setPending] = useState(false);
  const [rating, setRating] = useState<string>("");
  const started = useRef(false);
  const lastSubmitKey = useRef<string | null>(null);

  useEffect(() => {
    if (!state.message) return;
    const key = `${state.ok}:${state.message}`;
    if (lastSubmitKey.current === key) return;
    lastSubmitKey.current = key;

    trackEvent("review_form_submit", {
      location,
      status: state.ok ? "success" : "error",
    });
  }, [state.message, state.ok, location]);

  function markFormStart() {
    if (started.current) return;
    started.current = true;
    trackEvent("review_form_start", { location });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (String(formData.get("website") ?? "").trim()) {
      setState({
        ok: true,
        message:
          "Thank you. Please send the email from your mail app to complete your review.",
      });
      return;
    }

    const fields = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      businessOrRole: String(formData.get("businessOrRole") ?? "").trim(),
      rating: String(formData.get("rating") ?? "").trim(),
      review: String(formData.get("review") ?? "").trim(),
      permission: formData.get("permission") === "on",
    };

    const fieldErrors: ReviewFormState["fieldErrors"] = {};
    if (!fields.name) fieldErrors.name = "Please enter your name.";
    if (!fields.email || !fields.email.includes("@")) {
      fieldErrors.email = "Please enter a valid email.";
    }
    if (!fields.rating || !["1", "2", "3", "4", "5"].includes(fields.rating)) {
      fieldErrors.rating = "Please choose a rating from 1 to 5.";
    }
    if (!fields.review || fields.review.length < 20) {
      fieldErrors.review =
        "Please share a short review (at least a sentence or two).";
    }
    if (!fields.permission) {
      fieldErrors.permission =
        "Please confirm we may contact you about publishing this review.";
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
        "Your email app should open next. Send the message to submit your review for moderation. Published reviews appear only after approval.",
    });
    setPending(false);
  }

  return (
    <form
      className={cn("relative grid gap-5", className)}
      onSubmit={onSubmit}
      noValidate
      onFocusCapture={markFormStart}
      aria-labelledby="review-form-heading"
    >
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="review-website">Website</label>
        <input
          id="review-website"
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
        Submitting opens your email app with a draft to {site.email}. Reviews are
        moderated—nothing appears on the site until {site.founder} approves it.
      </p>

      <Field>
        <Label htmlFor="review-name">Name</Label>
        <Input
          id="review-name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          placeholder="Your name"
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={
            state.fieldErrors?.name ? "review-name-error" : undefined
          }
        />
        {state.fieldErrors?.name ? (
          <FieldHint error id="review-name-error">
            {state.fieldErrors.name}
          </FieldHint>
        ) : null}
      </Field>

      <Field>
        <Label htmlFor="review-email">Email</Label>
        <Input
          id="review-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@example.com"
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.fieldErrors?.email ? "review-email-error" : undefined
          }
        />
        {state.fieldErrors?.email ? (
          <FieldHint error id="review-email-error">
            {state.fieldErrors.email}
          </FieldHint>
        ) : null}
      </Field>

      <Field>
        <Label htmlFor="review-business">Business or role (optional)</Label>
        <Input
          id="review-business"
          name="businessOrRole"
          maxLength={120}
          placeholder="e.g. Owner, Example Co."
        />
      </Field>

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-2 font-sans text-sm font-semibold text-navy-900">
          Rating
        </legend>
        <div
          className="flex flex-wrap gap-2"
          role="radiogroup"
          aria-required="true"
          aria-invalid={Boolean(state.fieldErrors?.rating)}
          aria-describedby={
            state.fieldErrors?.rating ? "review-rating-error" : "review-rating-hint"
          }
        >
          {([1, 2, 3, 4, 5] as const).map((value) => {
            const selected = rating === String(value);
            return (
              <label
                key={value}
                className={cn(
                  "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md border px-3 font-sans text-sm font-semibold transition-colors",
                  selected
                    ? "border-gold-500 bg-gold-500 text-navy-950"
                    : "border-navy-800/20 bg-surface-white text-navy-900 hover:border-navy-800/40",
                )}
              >
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  className="sr-only"
                  checked={selected}
                  onChange={() => setRating(String(value))}
                />
                <span aria-hidden="true">{"★".repeat(value)}</span>
                <span className="sr-only">
                  {value} out of 5 stars
                </span>
              </label>
            );
          })}
        </div>
        <FieldHint id="review-rating-hint">1 = poor · 5 = excellent</FieldHint>
        {state.fieldErrors?.rating ? (
          <FieldHint error id="review-rating-error">
            {state.fieldErrors.rating}
          </FieldHint>
        ) : null}
      </fieldset>

      <Field>
        <Label htmlFor="review-body">Your review</Label>
        <Textarea
          id="review-body"
          name="review"
          required
          maxLength={2000}
          placeholder="Share what it was like working with Sari Financial Management—without including SIN, banking details, or other sensitive information."
          aria-invalid={Boolean(state.fieldErrors?.review)}
          aria-describedby={
            state.fieldErrors?.review
              ? "review-body-error review-body-hint"
              : "review-body-hint"
          }
        />
        {state.fieldErrors?.review ? (
          <FieldHint error id="review-body-error">
            {state.fieldErrors.review}
          </FieldHint>
        ) : null}
        <FieldHint id="review-body-hint">
          Keep it about your experience. Do not include confidential financial
          details.
        </FieldHint>
      </Field>

      <Field>
        <label className="flex items-start gap-3 font-sans text-sm text-navy-900">
          <input
            type="checkbox"
            name="permission"
            className="mt-1 h-4 w-4 shrink-0 rounded border-navy-800/30 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800"
            aria-invalid={Boolean(state.fieldErrors?.permission)}
            aria-describedby={
              state.fieldErrors?.permission
                ? "review-permission-error"
                : undefined
            }
          />
          <span>
            I confirm this reflects my genuine experience, and{" "}
            {site.name} may contact me at this email about publishing an approved
            version on the website. See the{" "}
            <TextLink href="/privacy">Privacy Policy</TextLink>.
          </span>
        </label>
        {state.fieldErrors?.permission ? (
          <FieldHint error id="review-permission-error">
            {state.fieldErrors.permission}
          </FieldHint>
        ) : null}
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Opening email…" : "Submit review"}
        </Button>
        {state.message && state.ok ? (
          <p
            className="m-0 font-sans text-sm text-navy-900"
            role="status"
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
