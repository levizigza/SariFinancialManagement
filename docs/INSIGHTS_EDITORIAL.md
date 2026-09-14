# Resources & Insights — editorial guidelines

## Purpose

Educational content for Calgary / Alberta / Canadian small-business questions—tied to Bookkeeping, Payroll, Tax, and Business Advisory. Not SEO filler.

## Publishing gates

1. **Status pipeline:** `planned` → `draft` → `in-review` → `published`
2. **Do not publish** tax, legal, payroll-compliance, or investment-adjacent articles until `requiresProfessionalReview` is satisfied (`reviewedBy` has at least one reviewer id).
3. **No invented credentials** on author bylines. Use `credentialsVerified` + `approvedForDisplay` in `authors.ts`.
4. Prefer linking to **CRA** and **Government of Alberta** for rule-based topics.
5. Include the standard educational disclaimer on article pages.

## Author metadata

Every article must set:

- `writtenBy` — author id from `src/content/insights/authors.ts`
- `reviewedBy` — array of reviewer ids when review is required or completed

UI components: `AuthorByline` (written by / reviewed by).

## Adding an article

1. Add an entry in `src/content/insights/articles.ts` (start as `planned` or `draft`).
2. Write body blocks (or future MDX) without personalized recommendations.
3. Set reviewers and `status: "in-review"` when ready.
4. After approval, set `status: "published"` and `publishedAt`.
5. Category routes and sitemap pick up published articles automatically.

## Initial topic backlog

See planned items in `articles.ts` (client questions listed in the product brief).
