/**
 * Author / reviewer metadata for Resources & Insights.
 *
 * Rules:
 * - Only list credentials the person has verified for public use.
 * - `credentialsVerified: false` means do NOT render a credentials list publicly
 *   even if the array has draft notes for the team.
 * - Prefer “Reviewed by” for tax/legal-sensitive pieces after professional review.
 * - Do not invent degrees, licences, or memberships.
 */

import { founderPortrait } from "@/content/founder-media";

export type AuthorCredential = {
  /** Short label, e.g. "CPA, CA" — only when verified */
  label: string;
  /** Issuing body if known */
  issuer?: string;
  /** Year obtained or verified, if provided */
  year?: string;
  /** Internal only until approved for display */
  approvedForDisplay: boolean;
};

export type Author = {
  id: string;
  name: string;
  /** Public role/title */
  title: string;
  /** Organization affiliation shown on bylines */
  organization: string;
  /**
   * Short public bio — approach language only until a client-approved biography exists.
   * Do not add education, years of experience, or credentials here without verification.
   */
  bio?: string;
  email?: string;
  profilePath?: string;
  /** Portrait path under /public; mirrors founder media until a dedicated crop exists */
  portraitSrc?: string;
  portraitWidth?: number;
  portraitHeight?: number;
  credentials: readonly AuthorCredential[];
  /**
   * Gate for rendering any credential badges on the site.
   * Keep false until the client confirms what may be shown.
   */
  credentialsVerified: boolean;
  /** Roles this person may fill on articles */
  roles: readonly ("author" | "reviewer" | "editor")[];
};

/**
 * Known people. Expand as reviewers are added.
 */
export const authors: readonly Author[] = [
  {
    id: "sari-goitom-tekle",
    name: "Sari Goitom Tekle",
    title: "Founder & Financial Advisor",
    organization: "Sari Financial Management",
    bio: "Leads client work at Sari Financial Management in Calgary, Alberta—focused on clear communication and organized financial information.",
    email: "sari.financialmanagement@gmail.com",
    profilePath: "/about",
    portraitSrc: founderPortrait.src,
    portraitWidth: founderPortrait.width,
    portraitHeight: founderPortrait.height,
    credentials: [
      // Add only credentials approved for public display after client confirmation.
    ],
    credentialsVerified: false,
    roles: ["author", "reviewer", "editor"],
  },
];

export function getAuthor(id: string): Author | undefined {
  return authors.find((author) => author.id === id);
}

/** Credentials safe to show in UI */
export function getPublicCredentials(author: Author): AuthorCredential[] {
  if (!author.credentialsVerified) return [];
  return author.credentials.filter((item) => item.approvedForDisplay);
}
