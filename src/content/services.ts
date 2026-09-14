/**
 * Service content for cards + detail pages.
 *
 * VERIFIED / SAFE TO PUBLISH: messaging aligned with client-supplied service names
 * and brand positioning. Softened with “may include” where exact deliverables are
 * not confirmed.
 *
 * TODO — CLIENT VERIFY (do not invent on the live site until confirmed):
 * - Exact software tools used (e.g. QuickBooks, Xero, Wagepoint)
 * - Whether payroll remittances are filed on the client’s behalf vs. advisory/record support only
 * - Turnaround times, pricing, packages, and retainer vs. project models
 * - Industries served / minimum business size
 * - Any professional designations or CRA program registrations
 * - Guarantees, accuracy promises, or “audit defence” language (omit unless verified)
 *
 * CONFIRMED (tax forms): T1, T2, and T4 preparation support.
 * Related Canadian/Alberta forms listed below are standard companions to that work;
 * exact engagement scope is still confirmed in consultation.
 */

export type ServiceSlug =
  | "bookkeeping"
  | "payroll"
  | "tax-services"
  | "business-advisory";

/**
 * Customer progression stages — framing only.
 * Official service names stay unchanged; clients need not purchase every stage.
 */
export type ServiceJourneyKey =
  | "organize"
  | "operate"
  | "prepare"
  | "understand";

export type ServiceJourneyStage = {
  key: ServiceJourneyKey;
  /** Short stage label shown in UI (e.g. ORGANIZE) */
  label: string;
  order: number;
};

export const serviceJourneyStages: readonly ServiceJourneyStage[] = [
  { key: "organize", label: "Organize", order: 1 },
  { key: "operate", label: "Operate", order: 2 },
  { key: "prepare", label: "Prepare", order: 3 },
  { key: "understand", label: "Understand & Plan", order: 4 },
] as const;

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceProcessStep = {
  title: string;
  body: string;
};

/** Canadian / Alberta tax forms shown on service detail pages */
export type ServiceTaxForm = {
  code: string;
  name: string;
  description: string;
  /** Confirmed by client vs. standard related filing often needed with core returns */
  confirmed?: boolean;
};

export type ServiceContent = {
  slug: ServiceSlug;
  name: string;
  href: `/services/${ServiceSlug}`;
  /** Where this service sits in the optional customer progression */
  journey: ServiceJourneyStage;
  /**
   * One-line self-identification cue (“Best for…”).
   * Soft fit language only — no eligibility gates or invented capabilities.
   */
  bestFor: string;
  /** Card: what the service is */
  what: string;
  /** Card: client problem */
  problem: string;
  /** Card: outcome */
  outcome: string;
  /** Short blurb (meta + hero support) */
  summary: string;
  /** Longer plain-English explanation */
  description: string;
  /** Compact include list (cards / older references) */
  includes: readonly string[];

  /** SEO */
  seoTitle: string;
  seoDescription: string;

  /** Benefit-oriented H1 */
  h1: string;
  /** Short intro under H1 */
  intro: string;

  problems: readonly string[];
  mayInclude: readonly string[];
  benefits: readonly string[];
  audiences: readonly string[];
  process: readonly ServiceProcessStep[];
  faqs: readonly ServiceFaq[];
  /** Optional tax-form list (used on Tax Services) */
  taxForms?: readonly ServiceTaxForm[];
};

export const serviceContent: readonly ServiceContent[] = [
  {
    slug: "bookkeeping",
    name: "Bookkeeping",
    href: "/services/bookkeeping",
    journey: serviceJourneyStages[0],
    bestFor:
      "Business owners who want organized records and greater visibility into their finances.",
    what: "Day-to-day bookkeeping support that keeps your financial records current and organized.",
    problem:
      "When books fall behind, it becomes hard to see where money is going—or to make decisions with confidence.",
    outcome:
      "Organized, up-to-date financial records that give business owners a clearer view of where their money is going.",
    summary:
      "Organized, up-to-date financial records that give business owners a clearer view of where their money is going.",
    description:
      "Bookkeeping support focused on clear, consistent records. We help organize transactions, reconcile accounts, and maintain books you can rely on when making decisions or preparing for tax season.",
    includes: [
      "Transaction categorization and ledger maintenance",
      "Bank and credit card reconciliation",
      "Monthly financial summaries for clarity",
      "Coordination with tax preparation when needed",
    ],
    seoTitle: "Bookkeeping Services in Calgary for Small Businesses",
    seoDescription:
      "Bookkeeping services in Calgary from Sari Financial Management—organized, up-to-date records so small businesses can see where money is going.",
    h1: "Bookkeeping services in Calgary that bring clarity to your numbers",
    intro:
      "Bookkeeping is the ongoing work of recording and organizing your business finances. We help Calgary small businesses and owners keep records current so spending, income, and cash position are easier to understand.",
    problems: [
      "Books that are months behind and hard to catch up on alone",
      "Uncertainty about where money is going month to month",
      "Bank accounts that do not match the records in your system",
      "Stress when tax season arrives and documents are incomplete",
      "Limited time to categorize transactions while running the business",
    ],
    mayInclude: [
      // TODO(client): confirm which of these are always in scope vs. optional add-ons
      "Categorizing day-to-day transactions",
      "Reconciling bank and credit card accounts",
      "Maintaining a clear general ledger",
      "Preparing straightforward monthly summaries",
      "Organizing records so tax preparation is smoother",
      "Coordinating with your tax work when both services are engaged",
    ],
    benefits: [
      "A clearer view of income, expenses, and cash movement",
      "Records that stay closer to current instead of falling behind",
      "Less scramble when you need figures for decisions or filings",
      "A calmer handoff into tax season with better-organized information",
    ],
    audiences: [
      "Calgary business owners who want cleaner, more current books",
      "Operators who have outgrown DIY spreadsheets or sporadic updates",
      "Teams preparing for growth, lender conversations, or tax filing",
      "Anyone who wants financial records they can actually use",
    ],
    process: [
      {
        title: "Consultation",
        body: "We learn how you operate today—your accounts, tools, and pain points—and what “organized” should look like for you.",
      },
      {
        title: "Scope and setup",
        body: "We agree on what bookkeeping support covers, how often we update records, and how information will be shared.",
      },
      {
        title: "Ongoing bookkeeping",
        body: "Transactions are organized and accounts reconciled on the cadence we set, with clear communication along the way.",
      },
      {
        title: "Useful summaries",
        body: "You receive straightforward reporting so you can see where things stand and ask informed questions.",
      },
    ],
    faqs: [
      {
        question: "Do I need bookkeeping if my business is small?",
        answer:
          "Even smaller businesses benefit from clear records. Organized books make it easier to understand cash flow and prepare for tax obligations. We can discuss a scope that fits your stage.",
      },
      {
        question: "Will you work with the software I already use?",
        // TODO(client): list supported platforms once confirmed
        answer:
          "In many cases, yes—we can discuss the tools you already use during the consultation and confirm whether they fit the engagement.",
      },
      {
        question: "How is bookkeeping different from tax services?",
        answer:
          "Bookkeeping keeps your day-to-day records organized throughout the year. Tax services focus on preparing for filing obligations. Many clients use both so records and filings stay aligned.",
      },
      {
        question: "How do I get started with bookkeeping in Calgary?",
        answer:
          "Book a consultation with Sari Financial Management. We’ll review your current records and outline a clear scope before work begins.",
      },
    ],
  },
  {
    slug: "payroll",
    name: "Payroll",
    href: "/services/payroll",
    journey: serviceJourneyStages[1],
    bestFor:
      "Businesses that need reliable support organizing employee payroll processes and records.",
    what: "Payroll support for employee payments and the records that go with them.",
    problem:
      "Payroll administration can consume time and leave payment or remittance records harder to track.",
    outcome:
      "Reliable payroll support designed to help businesses keep employee payments and related records organized.",
    summary:
      "Reliable payroll support designed to help businesses keep employee payments and related records organized.",
    description:
      "Payroll services designed to reduce administrative burden. We support regular pay runs and help keep related records organized so you can focus on your people and your operations. Exact remittance responsibilities are confirmed during consultation.",
    includes: [
      "Scheduled payroll processing support",
      "Pay stub and payroll record support",
      "Organization of remittance-related records (scope confirmed with you)",
      "Year-end payroll documentation support",
    ],
    seoTitle: "Payroll Services in Calgary | Sari Financial Management",
    seoDescription:
      "Payroll services in Calgary to help keep employee payments and related records organized. Clear processes from Sari Financial Management.",
    h1: "Payroll services in Calgary that keep pay runs organized",
    intro:
      "Payroll support helps you process employee payments and keep related records in order. We work with Calgary businesses that want a steadier, clearer payroll routine without the constant administrative scramble.",
    problems: [
      "Pay runs that take too much owner or manager time each cycle",
      "Difficulty keeping payroll records consistent and easy to find",
      "Uncertainty around what information is needed for each pay period",
      "Year-end payroll documents that feel rushed or incomplete",
      "Growing teams that need a more reliable payroll process",
    ],
    mayInclude: [
      // TODO(client): clarify remittance filing authority vs. tracking/support only
      "Scheduled payroll processing support",
      "Help preparing pay information and related records",
      "Tracking and organizing remittance-related information",
      "Support for payroll documentation throughout the year",
      "Year-end payroll record organization",
      "T4 slip preparation support for employees (coordinated with Tax Services when needed)",
    ],
    benefits: [
      "A more predictable approach to employee pay cycles",
      "Clearer payroll records when questions arise",
      "Less time spent reinventing the process each pay period",
      "Better-organized information heading into year-end",
    ],
    audiences: [
      "Calgary employers who want help keeping payroll organized",
      "Business owners ready to hand off routine payroll administration",
      "Teams adding employees and needing a clearer pay process",
      "Operators who want payroll records that stay orderly year-round",
    ],
    process: [
      {
        title: "Consultation",
        body: "We review your current payroll approach, pay schedule, and what support would be most useful.",
      },
      {
        title: "Define the workflow",
        body: "We agree on timing, responsibilities, and how employee and pay information will be shared each cycle.",
      },
      {
        title: "Run payroll support",
        body: "Pay cycles are supported on the agreed schedule, with records kept organized as we go.",
      },
      {
        title: "Stay current",
        body: "We keep documentation in order so year-end and day-to-day questions are easier to handle.",
      },
    ],
    faqs: [
      {
        question: "Can you help if we only have a few employees?",
        answer:
          "Yes. Payroll support can be scoped for small teams as well as growing ones. We’ll match the scope to your pay schedule and needs.",
      },
      {
        question: "Do you handle remittances to the CRA?",
        // TODO(client): replace this answer once remittance responsibility is confirmed
        answer:
          "Remittance responsibilities depend on the scope we agree together. During your consultation, we’ll clarify what we support directly and what remains your responsibility.",
      },
      {
        question: "How does payroll relate to bookkeeping?",
        answer:
          "Payroll creates financial activity that should appear correctly in your books. When both services are engaged, we can help keep pay activity and bookkeeping records aligned.",
      },
      {
        question: "How do I start payroll services in Calgary?",
        answer:
          "Contact Sari Financial Management to book a consultation. Bring a summary of your pay schedule and employee setup if you have one—we’ll outline next steps from there.",
      },
    ],
  },
  {
    slug: "tax-services",
    name: "Tax Services",
    href: "/services/tax-services",
    journey: serviceJourneyStages[2],
    bestFor:
      "Individuals and businesses who need practical support preparing Canadian tax returns and year-end slips—including T1, T2, and T4.",
    what: "Tax preparation support for personal returns, corporate returns, and employer slips.",
    problem:
      "Tax season feels unclear when documents, deadlines, and filing forms are not organized.",
    outcome:
      "Clearer preparation for Canadian tax filings—including T1, T2, and T4—so tax season feels more organized.",
    summary:
      "Tax preparation support for Calgary individuals and businesses, including T1, T2, and T4 filings and related Canadian forms confirmed in consultation.",
    description:
      "Tax services for individuals and businesses who want a calm, organized approach to Canadian filing season. We prepare personal income tax returns (T1), corporate income tax returns (T2), and employer T4 slips, and we can support related Alberta and CRA filings that commonly go with that work. Exact forms and deadlines are confirmed together before engagement begins.",
    includes: [
      "T1 personal income tax return preparation",
      "T2 corporate income tax return preparation",
      "T4 slips and related year-end employer filings",
      "Organization of tax documents and plain-language timelines",
    ],
    seoTitle: "Tax Services in Calgary | T1, T2 & T4 | Sari Financial Management",
    seoDescription:
      "Tax services in Calgary including T1 personal returns, T2 corporate returns, and T4 slips—plus related Canadian and Alberta filings confirmed in consultation.",
    h1: "Tax services in Calgary for T1, T2, and T4 filings",
    intro:
      "Sari Financial Management helps Calgary individuals and businesses prepare for Canadian tax obligations—including personal T1 returns, corporate T2 returns, and employer T4 slips. Related forms that often go with that work are listed below; we confirm the right scope for your situation in consultation.",
    problems: [
      "Uncertainty about which Canadian tax forms apply to you or your business",
      "Tax season stress caused by incomplete or scattered records",
      "Difficulty coordinating personal, corporate, and payroll year-end filings",
      "Books and tax prep that do not connect cleanly",
      "Wanting plain-language guidance instead of last-minute scrambling",
    ],
    mayInclude: [
      "T1 personal income tax and benefit return preparation",
      "T2 corporation income tax return preparation",
      "T4 slips and T4 Summary for employee remuneration",
      "Related Alberta corporate filing support (AT1) when your corporation has an Alberta permanent establishment",
      "T2125 business or professional activities statement for self-employed / sole proprietors filing a T1",
      "T4A slips when other qualifying payments need to be reported",
      "GST/HST return preparation support for registered businesses",
      "Help organizing tax documents, slips, and supporting records",
      "Plain-language explanation of filing steps and timelines",
      "Coordination with bookkeeping and payroll when records need to be brought current",
    ],
    taxForms: [
      {
        code: "T1",
        name: "Personal Income Tax and Benefit Return",
        description:
          "The main individual return filed with the CRA for Alberta residents—covering employment income, self-employment, and other personal tax situations.",
        confirmed: true,
      },
      {
        code: "T2",
        name: "Corporation Income Tax Return",
        description:
          "The federal corporate return filed with the CRA for incorporated businesses. Most Alberta corporations also need a separate provincial AT1 filing.",
        confirmed: true,
      },
      {
        code: "T4",
        name: "Statement of Remuneration Paid",
        description:
          "Employer slips reporting employee wages, deductions, and related amounts for the calendar year—filed with a T4 Summary and provided to employees.",
        confirmed: true,
      },
      {
        code: "AT1",
        name: "Alberta Corporate Income Tax Return",
        description:
          "Alberta’s provincial corporate return, filed with Tax and Revenue Administration when a corporation has a permanent establishment in Alberta. Typically prepared alongside the federal T2.",
      },
      {
        code: "T2125",
        name: "Statement of Business or Professional Activities",
        description:
          "Reports business or professional income and expenses on a personal T1—commonly used by sole proprietors and self-employed individuals in Calgary.",
      },
      {
        code: "T4A",
        name: "Statement of Pension, Retirement, Annuity, and Other Income",
        description:
          "Used for certain non-employment payments such as fees, commissions, or other qualifying amounts that do not belong on a T4.",
      },
      {
        code: "GST/HST",
        name: "GST/HST Return",
        description:
          "Sales-tax filing for GST/HST-registered businesses. Alberta does not have a provincial sales tax; most local registrants report GST to the CRA on the required schedule.",
      },
      {
        code: "T5",
        name: "Statement of Investment Income",
        description:
          "Prepared when a business or payer must report certain investment income paid to Canadian residents. Included only when it applies to your situation.",
      },
    ],
    benefits: [
      "Clearer understanding of which forms apply—T1, T2, T4, and related filings",
      "Less last-minute stress when filing deadlines approach",
      "Better-organized records supporting personal, corporate, and payroll tax work",
      "Straightforward communication about next steps",
    ],
    audiences: [
      "Calgary individuals who need T1 preparation support",
      "Incorporated businesses that need T2 (and Alberta AT1) preparation",
      "Employers who need T4 slips prepared at year-end",
      "Sole proprietors who report business income on a T1 with Form T2125",
      "Clients whose bookkeeping or payroll is ready—or nearly ready—for tax work",
    ],
    process: [
      {
        title: "Consultation",
        body: "We discuss your filing situation—personal, corporate, payroll slips, or a mix—plus deadlines and the records you already have.",
      },
      {
        title: "Document checklist",
        body: "You receive a clear picture of which forms apply (for example T1, T2, T4) and what information is needed so gathering stays manageable.",
      },
      {
        title: "Preparation support",
        body: "Within the agreed scope, we prepare the returns and slips from the records you provide and keep you informed along the way.",
      },
      {
        title: "Review and next steps",
        body: "We walk through what was prepared and outline any follow-up items—deadlines, supporting schedules, or related filings—in plain language.",
      },
    ],
    faqs: [
      {
        question: "Are you a CPA firm?",
        answer:
          "This website does not describe Sari Financial Management as a CPA firm. If you need a service that requires a specific designation, ask during your consultation so we can clarify scope.",
      },
      {
        question: "Do you prepare T1, T2, and T4 forms?",
        answer:
          "Yes. Tax services include preparation support for T1 personal returns, T2 corporate returns, and T4 employer slips. Related filings—such as Alberta AT1 corporate returns, T2125 for self-employed income on a T1, T4A slips, or GST/HST returns—are included when they apply and are confirmed in your consultation.",
      },
      {
        question: "Do you prepare both personal and business taxes?",
        answer:
          "Yes. We support personal (T1) and corporate (T2) tax preparation, and we can coordinate year-end employer slips such as T4s. Share your entity type and timeline in the consultation so we can outline the right scope.",
      },
      {
        question: "What about Alberta corporate tax?",
        answer:
          "Corporations with a permanent establishment in Alberta generally file a federal T2 with the CRA and a separate AT1 Alberta Corporate Income Tax Return with Alberta Tax and Revenue Administration. We can discuss AT1 support alongside your T2 during consultation.",
      },
      {
        question: "When should I start preparing for tax season?",
        answer:
          "Earlier is usually easier. Organizing documents before peak season reduces pressure. If your books or payroll records need attention first, bookkeeping or payroll support can help before tax work begins.",
      },
      {
        question: "How do I book tax services in Calgary?",
        answer:
          "Use Book a Consultation or call Sari Financial Management. Share whether you need T1, T2, T4, or a combination—and your timeline—so we can plan an appropriate scope.",
      },
    ],
  },
  {
    slug: "business-advisory",
    name: "Business Advisory",
    href: "/services/business-advisory",
    journey: serviceJourneyStages[3],
    bestFor:
      "Business owners who want to better understand financial information when making decisions.",
    what: "Advisory support focused on understanding your financial picture for day-to-day decisions.",
    problem:
      "Financial reports are less useful when it is unclear what the numbers mean for your next move.",
    outcome:
      "Financial insight and planning support designed to help business owners understand their numbers and make more informed decisions.",
    summary:
      "Financial insight and planning support designed to help business owners understand their numbers and make more informed decisions.",
    description:
      "Business advisory support centred on financial clarity for day-to-day operations. We help you understand your books, cash flow patterns, and reporting so you can plan with more confidence. This is not investment advisory or securities advice.",
    includes: [
      "Review of financial reports and key trends",
      "Cash flow visibility and planning conversations",
      "Practical recommendations for stronger recordkeeping",
      "Support for budgeting and operational decision-making",
    ],
    seoTitle: "Business Advisory in Calgary | Sari Financial Management",
    seoDescription:
      "Business advisory in Calgary focused on understanding your numbers for day-to-day decisions—not investment advice. Sari Financial Management.",
    h1: "Business advisory in Calgary to help you understand your numbers",
    intro:
      "Business advisory here means practical financial insight for running your company—not investment advice. We help Calgary owners interpret their numbers, spot cash flow patterns, and plan day-to-day decisions with more clarity.",
    problems: [
      "Reports exist, but it is unclear what they mean for next steps",
      "Cash flow feels unpredictable without a simple way to review it",
      "Decisions are made without a clear read on the financial picture",
      "Bookkeeping is in place, but guidance on using the numbers is missing",
      "Growth plans need grounded conversations about costs and capacity",
    ],
    mayInclude: [
      // TODO(client): confirm meeting cadence and deliverable formats
      "Review of financial reports and notable trends",
      "Conversations focused on cash flow visibility",
      "Practical recommendations to strengthen recordkeeping",
      "Support for budgeting and operational planning discussions",
      "Help connecting bookkeeping outputs to everyday decisions",
    ],
    benefits: [
      "A clearer understanding of what your numbers are saying",
      "More informed operating decisions—not guesswork",
      "Stronger connection between records and planning",
      "A plain-language conversation partner for financial clarity questions",
    ],
    audiences: [
      "Calgary business owners who want help interpreting their finances",
      "Operators with books in place who need clearer decision support",
      "Owners planning hiring, pricing, or cost changes and want grounded input",
      "Anyone seeking operational financial clarity—not investment advice",
    ],
    process: [
      {
        title: "Consultation",
        body: "We discuss your goals, current reporting, and the decisions you want more clarity around.",
      },
      {
        title: "Review the numbers",
        body: "We look at available reports and identify patterns, questions, and priorities worth focusing on.",
      },
      {
        title: "Practical recommendations",
        body: "You receive plain-language observations and suggested next steps for records, cash flow, or planning.",
      },
      {
        title: "Ongoing clarity",
        body: "If helpful, we continue with periodic check-ins so advisory support stays tied to real decisions.",
      },
    ],
    faqs: [
      {
        question: "Is this investment advice?",
        answer:
          "No. Business advisory at Sari Financial Management focuses on operational and financial clarity—understanding books, cash flow, and reporting. It is not investment or securities advice.",
      },
      {
        question: "Do I need bookkeeping before advisory?",
        answer:
          "Useful advisory conversations usually depend on reasonably organized records. If your books need attention first, we can start with bookkeeping and add advisory when the numbers are clearer.",
      },
      {
        question: "How often would we meet?",
        // TODO(client): confirm standard cadence once defined
        answer:
          "Meeting frequency depends on your needs and the scope we agree. Some clients prefer seasonal check-ins; others want more regular conversations. We’ll recommend a rhythm during the consultation.",
      },
      {
        question: "How do I start business advisory in Calgary?",
        answer:
          "Book a consultation with Sari Financial Management. Bring recent reports if you have them—we’ll outline how advisory support could help.",
      },
    ],
  },
] as const;

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContent.find((service) => service.slug === slug);
}

/** Services in customer-progression order (Organize → … → Understand & Plan). */
export function getServicesInJourneyOrder(): readonly ServiceContent[] {
  return [...serviceContent].sort((a, b) => a.journey.order - b.journey.order);
}
