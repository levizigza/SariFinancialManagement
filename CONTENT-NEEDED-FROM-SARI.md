# Content needed from Sari (pre-launch)

**Rule:** Keep unverified answers off the production website. Update live pages only after Sari confirms wording suitable for public use.

Verified identity already in use (safe):

- Name: **Sari Goitom Tekle**
- Title: **Founder & Financial Advisor**
- Business: **Sari Financial Management**
- Location: **Calgary, Alberta**
- Phone: **825-935-3739**
- Email: **sari.financialmanagement@gmail.com**
- Brand phrase: **More Than Numbers**
- Values: **Clarity · Trust · Confidence**
- Services named on site: Bookkeeping, Payroll, Tax Services, Business Advisory

Portrait swap path: `src/content/founder-media.ts` + `public/images/founder/`  
Related internal notes: `docs/CLIENT_BIO_TODOS.md`, `src/content/client-bio-todos.ts`

---

## Questions to answer before final launch

Please provide answers in writing (email is fine). Mark anything that must **not** appear publicly.

### 1. Verified education

- What degrees, diplomas, or certificates may we list publicly (full name of credential, institution, year if you want year shown)?
- Anything that should stay private?

### 2. Verified certifications / designations

- Which professional designations may appear on the site (exact letters and full name)?
- Confirm whether **CPA** (or any similar designation) applies — the site currently does **not** claim CPA status.
- Any designations that sound related but must **not** be implied?

### 3. Verified professional memberships

- Which associations or memberships may we list (organization name, membership type, optional member ID if appropriate)?
- Any that are personal/professional but not for marketing?

### 4. Accounting software proficiency

- Which platforms do you actually use with clients (e.g. QuickBooks Online, Xero, Wave, Excel, others)?
- Which may we name on the site vs. discuss only in consultation?

### 5. Years / type of relevant experience

- Is there a **specific** years-of-experience number you want published? (Only if you supply an exact figure.)
- Brief, approved description of the *type* of work background we may summarize (without inventing employers or roles)?

### 6. Industries genuinely served

- Which industries have you **actually** worked with and are comfortable naming (e.g. retail, trades, professional services)?
- Any industries we should avoid claiming?

### 7. Languages spoken professionally (if relevant)

- Which languages are you comfortable using with clients for professional work?
- Preferred framing (e.g. “Consultations available in …”)?

### 8. Exact scope of tax services

- **Confirmed for the site:** T1 (personal), T2 (corporate), and T4 (employer slips).
- Related forms listed publicly as commonly supported alongside that work (scope still confirmed per engagement): AT1 (Alberta corporate), T2125, T4A, GST/HST returns, T5 when applicable.
- Still confirm if helpful: filing vs. preparation-only language, ROE involvement, notice/audit representation (currently omitted), and any forms that must **not** be advertised.

### 9. Exact scope of business advisory

- What conversations do you include (cash flow, reporting, operational clarity, planning)?
- Confirm we should keep stating: **not investment or securities advice**.
- What should we explicitly exclude?

### 10. Remote / in-person availability

- Calgary in-person meetings: yes / no / by arrangement?
- Video / phone consultations: yes / no?
- Serving clients outside Calgary or Alberta? If yes, under what conditions?

### 11. Consultation pricing / free status

- Is the initial consultation free, paid, or credited toward engagement?
- Approximate length, if you want that published?
- Anything that must stay “contact us for details”?

### 12. Service pricing model

- Hourly, fixed-fee packages, monthly retainers, hybrid, or custom quotes only?
- Any published starting points, or keep pricing off the site entirely?

### 13. Secure client-document process

- How should clients send documents today (email, portal, encrypted share, in person)?
- What may we describe publicly without over-promising security?
- Planned tools (portal name) once confirmed?

### 14. Portrait & biography (supporting)

- Approved professional portrait file (web rights cleared) + preferred alt text?
- Short approved biography (2–4 sentences) to replace approach-only copy?
- Preferred public name style in headings (full name vs. “Sari”)?

---

## How we will use answers

| Area | Until confirmed | After confirmation |
|------|-----------------|--------------------|
| Credentials / education / memberships | Hidden (`credentialsVerified: false`) | Shown only where approved |
| Pricing / remote policy / industries | Honest “confirm in consultation” FAQ tone | Specific published answers |
| Portrait | Designed placeholder SVG | Real photo via `founder-media.ts` |
| Bio | Approach language only (no invented CV) | Client-approved text |

**Do not publish draft answers on the live site until Sari signs off.**
