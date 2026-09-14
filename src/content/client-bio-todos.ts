/**
 * INTERNAL — Biography & credentials to obtain from the client
 *
 * Do NOT publish any of the items below until the client supplies verified wording.
 * This file is for the build team only; it is not linked from the public site.
 *
 * Related slots in code:
 * - `FounderPortraitSlot` (`data-content-slot="founder-portrait"`)
 * - `src/components/sections/founder-section.tsx`
 * - `src/app/about/page.tsx`
 * - Launch questionnaire: `CONTENT-NEEDED-FROM-SARI.md` (repo root)
 */

export const clientBioTodos = [
  {
    id: "portrait",
    priority: "high",
    item: "Approved professional portrait photo (rights cleared for web + social/OG use)",
    notes: "Portrait orientation preferred; provide alt-text preference if any.",
  },
  {
    id: "preferred-name",
    priority: "medium",
    item: "Preferred public first-name usage (Sari vs full name in headings)",
    notes: "Currently using full legal-style name from verified brief.",
  },
  {
    id: "short-bio",
    priority: "high",
    item: "Short first-person or third-person biography (2–4 sentences) approved by Sari",
    notes: "Keep free of unverified credentials; focus on approach and client care.",
  },
  {
    id: "origin-story",
    priority: "medium",
    item: "Why Sari Financial Management was founded / what problem it exists to solve",
    notes: "Client-approved narrative only.",
  },
  {
    id: "education",
    priority: "high",
    item: "Any degrees or diplomas that may be listed publicly",
    notes: "Omit entirely until confirmed. Do not invent.",
  },
  {
    id: "designations",
    priority: "high",
    item: "Professional designations (e.g. CPA) — confirm whether any exist and may be claimed",
    notes: "Site currently does NOT describe the firm as a CPA firm.",
  },
  {
    id: "licences",
    priority: "high",
    item: "Licences or registrations relevant to tax, bookkeeping, or advisory work in Alberta/Canada",
    notes: "Especially important for ‘Financial Advisor’ title vs regulated advice scope.",
  },
  {
    id: "memberships",
    priority: "medium",
    item: "Professional memberships or associations (optional public listing)",
    notes: "",
  },
  {
    id: "experience-years",
    priority: "medium",
    item: "Years of experience — only if client wants a specific verified number",
    notes: "Do not approximate.",
  },
  {
    id: "prior-roles",
    priority: "low",
    item: "Previous employers or career highlights approved for public use",
    notes: "",
  },
  {
    id: "languages",
    priority: "medium",
    item: "Languages spoken with clients",
    notes: "",
  },
  {
    id: "service-area",
    priority: "medium",
    item: "Service area detail (Calgary only vs Alberta / remote Canada)",
    notes: "Affects About + SEO locality copy.",
  },
  {
    id: "community",
    priority: "low",
    item: "Community involvement or causes — only with permission",
    notes: "",
  },
  {
    id: "personal-note",
    priority: "low",
    item: "Optional personal note that feels human (hobbies, Calgary life) — client-approved",
    notes: "Keep light; avoid oversharing or invented colour.",
  },
] as const;

export type ClientBioTodo = (typeof clientBioTodos)[number];
