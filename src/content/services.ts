/**
 * Service content for cards + detail pages.
 *
 * Sourced from client-supplied service descriptions (bookkeeping, payroll, tax,
 * GST/HST, CRA support, and financial services). Soften with consultation-scope
 * language where deliverables depend on the engagement.
 *
 * Insurance offerings: publish only with licence-aware wording supplied by the
 * client (“where offered under the appropriate insurance licence”).
 *
 * CONFIRMED tax forms: T1, T2, T4. Related forms (T2125, GST/HST, AT1, etc.) are
 * listed as part of the tax practice and confirmed per engagement.
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

/** Grouped offering blocks on detail pages (e.g. T1 / T2 / GST/HST) */
export type ServiceArea = {
  title: string;
  description?: string;
  items: readonly string[];
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
  /** Optional detailed groupings shown on the detail page */
  serviceAreas?: readonly ServiceArea[];
  benefits: readonly string[];
  audiences: readonly string[];
  process: readonly ServiceProcessStep[];
  faqs: readonly ServiceFaq[];
  /** Optional tax-form list (used on Tax Services) */
  taxForms?: readonly ServiceTaxForm[];
  /** Optional scope / licence note shown on the detail page */
  disclaimer?: string;
};

export const serviceContent: readonly ServiceContent[] = [
  {
    slug: "bookkeeping",
    name: "Bookkeeping",
    href: "/services/bookkeeping",
    journey: serviceJourneyStages[0],
    bestFor:
      "Business owners who want accurate, organized records that are ready when decisions or tax season arrive.",
    what: "Bookkeeping that keeps financial records accurate, organized, and ready when you need them.",
    problem:
      "When books fall behind, it becomes hard to see where money is going—or to make decisions with confidence.",
    outcome:
      "Organized, up-to-date financial records that give business owners a clearer view of where their money is going.",
    summary:
      "Keep your financial records accurate, organized, and ready when you need them—including catch-up and cleanup support when books have fallen behind.",
    description:
      "At Sari Financial Management, bookkeeping support focuses on accurate records, clear categorization, and reports you can use. We help individuals, families, self-employed professionals, and small businesses stay organized throughout the year—and we can help bring past books up to date when needed.",
    includes: [
      "Monthly bookkeeping",
      "Bank and credit card reconciliation",
      "Accounts payable and receivable tracking",
      "Financial reports (Profit & Loss and Balance Sheet)",
      "Catch-up and cleanup bookkeeping",
      "Year-end bookkeeping preparation",
    ],
    seoTitle: "Bookkeeping Services in Calgary for Small Businesses",
    seoDescription:
      "Bookkeeping in Calgary from Sari Financial Management—monthly books, reconciliations, reports, catch-up cleanup, and tax-ready records for small businesses.",
    h1: "Bookkeeping services in Calgary that keep your records clear",
    intro:
      "Keep your financial records accurate, organized, and ready when you need them. We support Calgary businesses with ongoing bookkeeping, reconciliations, reporting, and catch-up work when the books have fallen behind.",
    problems: [
      "Books that are months behind and hard to catch up on alone",
      "Uncertainty about where money is going month to month",
      "Bank or credit card accounts that do not match your records",
      "Stress when tax season arrives and documents are incomplete",
      "Limited time to categorize transactions while running the business",
    ],
    mayInclude: [
      "Recording and categorizing income and expenses",
      "Bank and credit card reconciliations",
      "Accounts receivable and accounts payable tracking",
      "General ledger maintenance",
      "Transaction review and corrections",
      "Monthly bookkeeping and account reconciliation",
      "Financial statement preparation",
      "Profit & Loss and Balance Sheet reports",
      "Bookkeeping cleanup and catch-up services",
      "Year-end bookkeeping preparation",
      "Organizing records for tax preparation",
      "QuickBooks and Sage bookkeeping support",
    ],
    serviceAreas: [
      {
        title: "Ongoing bookkeeping",
        description:
          "Day-to-day recording and maintenance so your books stay current.",
        items: [
          "Recording and categorizing income and expenses",
          "Bank and credit card reconciliations",
          "Accounts receivable and accounts payable tracking",
          "General ledger maintenance",
          "Transaction review and corrections",
          "Monthly bookkeeping and account reconciliation",
        ],
      },
      {
        title: "Reporting & year-end readiness",
        description:
          "Clear reports and organized records for decisions and tax preparation.",
        items: [
          "Financial statement preparation",
          "Profit & Loss and Balance Sheet reports",
          "Year-end bookkeeping preparation",
          "Organizing records for tax preparation",
          "QuickBooks and Sage bookkeeping support",
        ],
      },
      {
        title: "Catch-up & cleanup",
        description:
          "Behind on your books? We can help organize past transactions, correct errors, reconcile accounts, and bring your bookkeeping up to date.",
        items: [
          "Bookkeeping cleanup and catch-up services",
          "Correction of prior-period recording issues",
          "Reconciliation of overdue accounts",
        ],
      },
    ],
    benefits: [
      "A clearer view of income, expenses, and cash movement",
      "Records that stay closer to current instead of falling behind",
      "Less scramble when you need figures for decisions or filings",
      "A calmer handoff into tax season with better-organized information",
    ],
    audiences: [
      "Calgary business owners who want cleaner, more current books",
      "Self-employed professionals and small businesses",
      "Operators who have outgrown DIY spreadsheets or sporadic updates",
      "Anyone preparing for tax filing, lender conversations, or growth",
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
        question: "Can you help if my books are behind?",
        answer:
          "Yes. Catch-up and cleanup bookkeeping is part of what we offer—organizing past transactions, correcting errors, reconciling accounts, and bringing records up to date.",
      },
      {
        question: "Do you work with QuickBooks or Sage?",
        answer:
          "Yes. Bookkeeping support can include QuickBooks and Sage. Share the tools you use during the consultation so we can confirm fit.",
      },
      {
        question: "How is bookkeeping different from tax services?",
        answer:
          "Bookkeeping keeps your day-to-day records organized throughout the year. Tax services focus on preparing filings and related CRA obligations. Many clients use both so records and filings stay aligned.",
      },
    ],
  },
  {
    slug: "payroll",
    name: "Payroll",
    href: "/services/payroll",
    journey: serviceJourneyStages[1],
    bestFor:
      "Businesses that need accurate payroll processing and help staying on top of CRA payroll obligations.",
    what: "Payroll support so you can pay employees correctly and keep payroll records organized.",
    problem:
      "Payroll administration can consume time and leave payment or remittance records harder to track.",
    outcome:
      "Reliable payroll support designed to help businesses keep employee payments, deductions, and related records organized.",
    summary:
      "Payroll processing support—including CPP, EI, and income tax deductions, CRA remittance calculations, T4 preparation, and ROE support—scoped to your pay schedule.",
    description:
      "We help businesses manage payroll accurately and meet their payroll obligations. Our goal is to help you pay employees correctly, maintain accurate payroll records, and stay on top of CRA deadlines. Exact remittance filing responsibilities are confirmed during consultation.",
    includes: [
      "Payroll processing (weekly to monthly schedules)",
      "CPP, EI, and income tax deductions",
      "CRA payroll remittance calculations",
      "T4 and T4 Summary preparation",
      "Records of Employment (ROE) support",
      "Year-end payroll reconciliation",
    ],
    seoTitle: "Payroll Services in Calgary | Sari Financial Management",
    seoDescription:
      "Payroll services in Calgary—pay runs, CPP/EI/tax deductions, CRA remittance support, T4s, and ROE help from Sari Financial Management.",
    h1: "Payroll services in Calgary that keep pay runs organized",
    intro:
      "We help Calgary businesses process payroll, calculate deductions, and keep payroll records ready for remittances and year-end. Scope—including who files remittances—is confirmed together before work begins.",
    problems: [
      "Pay runs that take too much owner or manager time each cycle",
      "Difficulty keeping payroll deductions and records consistent",
      "Uncertainty around CRA remittance timing and amounts",
      "Year-end T4 preparation that feels rushed",
      "Growing teams that need a more reliable payroll process",
    ],
    mayInclude: [
      "Payroll setup for new employers",
      "Weekly, bi-weekly, semi-monthly, and monthly payroll",
      "Employee payroll calculations",
      "CPP, EI, and income tax deductions",
      "Employer CPP and EI calculations",
      "CRA payroll remittance calculations",
      "Payroll remittance deadline support",
      "Vacation pay calculations",
      "Taxable benefits and other payroll deductions",
      "Payroll record maintenance",
      "T4 and T4 Summary preparation",
      "Records of Employment (ROE) support",
      "Year-end payroll reconciliation",
      "Payroll corrections and adjustments",
    ],
    serviceAreas: [
      {
        title: "Payroll processing",
        items: [
          "Payroll setup for new employers",
          "Weekly, bi-weekly, semi-monthly, and monthly payroll",
          "Employee payroll calculations",
          "Vacation pay calculations",
          "Taxable benefits and other payroll deductions",
          "Payroll corrections and adjustments",
        ],
      },
      {
        title: "Deductions & CRA remittances",
        description:
          "We calculate statutory deductions and remittance amounts. Who submits remittances to the CRA is confirmed in your engagement scope.",
        items: [
          "CPP, EI, and income tax deductions",
          "Employer CPP and EI calculations",
          "CRA payroll remittance calculations",
          "Payroll remittance deadline support",
          "Payroll record maintenance",
        ],
      },
      {
        title: "Year-end & employee documents",
        items: [
          "T4 and T4 Summary preparation",
          "Records of Employment (ROE) support",
          "Year-end payroll reconciliation",
        ],
      },
    ],
    benefits: [
      "A more predictable approach to employee pay cycles",
      "Clearer payroll records when questions arise",
      "Better visibility into deductions and remittance timing",
      "Better-organized information heading into year-end",
    ],
    audiences: [
      "Calgary employers who want help keeping payroll organized",
      "New employers setting up payroll for the first time",
      "Business owners ready to hand off routine payroll administration",
      "Teams adding employees and needing a clearer pay process",
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
        body: "We keep documentation in order so remittances, ROEs, and year-end slips are easier to handle.",
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
        answer:
          "We support CRA payroll remittance calculations and deadline planning. Whether remittances are filed on your behalf or remain your responsibility is confirmed in the consultation and written scope.",
      },
      {
        question: "Do you prepare T4s and ROEs?",
        answer:
          "Yes. Payroll services include T4 and T4 Summary preparation support, Records of Employment (ROE) support, and year-end payroll reconciliation within the agreed scope.",
      },
      {
        question: "How does payroll relate to bookkeeping?",
        answer:
          "Payroll creates financial activity that should appear correctly in your books. When both services are engaged, we can help keep pay activity and bookkeeping records aligned.",
      },
    ],
    disclaimer:
      "Payroll remittance filing authority varies by engagement. We confirm responsibilities clearly before work begins.",
  },
  {
    slug: "tax-services",
    name: "Tax Services",
    href: "/services/tax-services",
    journey: serviceJourneyStages[2],
    bestFor:
      "Individuals, families, self-employed professionals, and small businesses who want clear, organized support with Canadian tax and CRA obligations.",
    what: "Clear, accurate, stress-free tax support—from personal and corporate returns to GST/HST and CRA correspondence.",
    problem:
      "Tax season and CRA letters feel unclear when documents, deadlines, and next steps are not organized.",
    outcome:
      "Your taxes organized and explained—so filing deadlines and CRA requests are easier to handle.",
    summary:
      "Tax preparation and CRA support for personal (T1), self-employed (T1/T2125), corporate (T2), GST/HST, prior-year filings, and CRA letter review.",
    description:
      "At Sari Financial Management, we help individuals, families, self-employed professionals, and small businesses understand their taxes and stay organized with their CRA obligations. Support can include personal and corporate returns, GST/HST filings, catch-up work, and help making sense of CRA notices. Exact forms and scope are confirmed in consultation. Complex corporate tax matters can be reviewed or referred to an appropriate tax professional when necessary.",
    includes: [
      "Personal tax (T1)",
      "Self-employed tax (T1 / T2125)",
      "Corporate tax (T2)",
      "GST/HST preparation and filing support",
      "Prior-year tax returns and adjustments",
      "CRA letter and notice review",
    ],
    seoTitle:
      "Tax Services in Calgary | T1, T2, GST/HST & CRA Support | Sari Financial Management",
    seoDescription:
      "Calgary tax services from Sari Financial Management—T1, T2125, T2, GST/HST, prior-year filings, and CRA letter support for individuals and small businesses.",
    h1: "Clear, accurate, stress-free tax support in Calgary",
    intro:
      "We help you prepare personal, self-employed, and corporate tax filings—and stay organized with GST/HST and CRA correspondence. Your numbers explained. Your taxes organized. Your financial decisions made clearer.",
    problems: [
      "Uncertainty about which Canadian tax forms apply to you or your business",
      "Tax season stress caused by incomplete or scattered records",
      "Self-employment or corporate filings that need careful expense review",
      "GST/HST calculations and deadlines that feel hard to track",
      "CRA letters or notices that are unclear",
      "Prior-year returns that still need to be filed",
    ],
    mayInclude: [
      "Personal income tax return preparation (T1)",
      "Self-employed T1 and T2125 preparation",
      "T2 corporate income tax return preparation",
      "GST/HST return preparation and filing support",
      "Prior-year tax returns and catch-up filing",
      "Tax return adjustments and review",
      "CRA letter, Notice of Assessment, and account review",
      "Supporting-document preparation for CRA requests",
    ],
    serviceAreas: [
      {
        title: "Personal income tax – T1",
        description:
          "We prepare personal income tax returns and help you identify eligible deductions and credits.",
        items: [
          "Employment income (T4)",
          "Students and newcomers",
          "Families and individuals",
          "RRSP and other deductions",
          "Medical and eligible tax credits",
          "Multiple income sources",
          "Prior-year tax returns",
          "Tax return adjustments and review",
        ],
      },
      {
        title: "Self-employed & sole proprietor tax",
        description:
          "Running your own business? We help organize your business income and expenses and prepare your T1 and T2125.",
        items: [
          "Business income and expenses",
          "T2125 preparation",
          "Home-office expenses",
          "Vehicle and eligible business expenses",
          "Capital asset information",
          "GST/HST considerations",
          "Bookkeeping review before tax filing",
          "Tax-ready bookkeeping coordination",
          "Year-end tax preparation",
        ],
      },
      {
        title: "Corporate tax – T2",
        description:
          "Tax preparation and support for small incorporated businesses. Complex corporate tax matters can be reviewed or referred when necessary.",
        items: [
          "T2 corporate income tax return preparation",
          "Review of business income and expenses",
          "Year-end bookkeeping review",
          "Financial information preparation",
          "Tax adjustments and year-end support",
          "Prior-year corporate tax support",
          "Organizing supporting documentation",
          "CRA correspondence related to corporate tax matters",
        ],
      },
      {
        title: "GST/HST services",
        description:
          "We help businesses calculate, prepare, and file their GST/HST returns—and understand ITCs, amounts payable, or refunds.",
        items: [
          "GST/HST registration support",
          "GST/HST return preparation and filing",
          "GST/HST collected on sales calculations",
          "Input Tax Credit (ITC) review",
          "GST/HST payable or refund calculations",
          "Monthly, quarterly, and annual filing support",
          "GST/HST account reconciliation",
          "Review of previous GST/HST filings",
          "Corrections, adjustments, and catch-up filing",
          "Supporting-document organization",
          "Filing deadline support",
        ],
      },
      {
        title: "CRA support",
        description:
          "Received a CRA letter or notice and you’re not sure what it means? We help you understand the issue and determine appropriate next steps—in clear, simple language.",
        items: [
          "CRA letter and notice review",
          "Notice of Assessment (NOA) review",
          "Notice of Reassessment review",
          "CRA account review",
          "Explanation of amounts owing or refunds",
          "Tax return adjustment support",
          "Supporting-document preparation",
          "Responding to CRA requests for information",
          "Payroll and GST/HST account review",
          "CRA balance and payment review",
          "Prior-year filing support",
          "CRA representative assistance when properly authorized",
        ],
      },
      {
        title: "Catch-up & prior-year tax filing",
        description:
          "Behind on your taxes? We can help organize your records and bring your filings up to date.",
        items: [
          "Prior-year personal and business filings",
          "Document organization for overdue returns",
          "Coordination with bookkeeping catch-up when needed",
        ],
      },
    ],
    taxForms: [
      {
        code: "T1",
        name: "Personal Income Tax and Benefit Return",
        description:
          "The main individual return filed with the CRA—covering employment income, self-employment, families, students, newcomers, and other personal tax situations.",
        confirmed: true,
      },
      {
        code: "T2125",
        name: "Statement of Business or Professional Activities",
        description:
          "Reports business or professional income and expenses on a personal T1—commonly used by sole proprietors and self-employed individuals.",
        confirmed: true,
      },
      {
        code: "T2",
        name: "Corporation Income Tax Return",
        description:
          "The federal corporate return filed with the CRA for incorporated businesses. Alberta corporations may also need provincial AT1 filing.",
        confirmed: true,
      },
      {
        code: "T4",
        name: "Statement of Remuneration Paid",
        description:
          "Employer slips reporting employee wages and deductions—typically prepared with payroll year-end support and a T4 Summary.",
        confirmed: true,
      },
      {
        code: "GST/HST",
        name: "GST/HST Return",
        description:
          "Sales-tax filing for GST/HST-registered businesses, including ITC review and reconciliation support.",
        confirmed: true,
      },
      {
        code: "AT1",
        name: "Alberta Corporate Income Tax Return",
        description:
          "Alberta’s provincial corporate return when a corporation has a permanent establishment in Alberta—typically discussed alongside the federal T2.",
      },
      {
        code: "T4A",
        name: "Statement of Pension, Retirement, Annuity, and Other Income",
        description:
          "Used for certain non-employment payments that do not belong on a T4—included when it applies to your situation.",
      },
    ],
    benefits: [
      "Clearer understanding of personal, self-employed, and corporate filings",
      "Organized GST/HST and CRA follow-up when issues arise",
      "Less last-minute stress when filing deadlines approach",
      "Plain-language explanations of what CRA is asking for",
    ],
    audiences: [
      "Individuals and families who need T1 preparation support",
      "Self-employed professionals and sole proprietors",
      "Small incorporated businesses that need T2 support",
      "GST/HST-registered businesses",
      "Anyone behind on filings or dealing with CRA correspondence",
    ],
    process: [
      {
        title: "Consultation",
        body: "We discuss your filing situation—personal, self-employed, corporate, GST/HST, CRA notices, or a mix—plus deadlines and the records you already have.",
      },
      {
        title: "Document checklist",
        body: "You receive a clear picture of which forms apply and what information is needed so gathering stays manageable.",
      },
      {
        title: "Preparation support",
        body: "Within the agreed scope, we prepare returns, slips, or GST/HST filings from the records you provide and keep you informed.",
      },
      {
        title: "Review and next steps",
        body: "We walk through what was prepared and outline follow-up items—deadlines, CRA responses, or related filings—in plain language.",
      },
    ],
    faqs: [
      {
        question: "Do you prepare T1, T2, and self-employed returns?",
        answer:
          "Yes. Tax services include personal T1 preparation, self-employed T1/T2125 support, and T2 corporate return preparation for eligible small incorporated businesses. Related work such as GST/HST and CRA correspondence is confirmed in consultation.",
      },
      {
        question: "Can you help with GST/HST?",
        answer:
          "Yes. We help with GST/HST registration support, return preparation and filing, ITC review, reconciliations, adjustments, and catch-up filing for overdue periods—within the scope we agree together.",
      },
      {
        question: "What if I received a CRA letter?",
        answer:
          "We can review CRA letters and notices, explain what they mean in plain language, help prepare supporting documents, and assist with next steps. CRA representative assistance is available when properly authorized.",
      },
      {
        question: "Are you a CPA firm?",
        answer:
          "This website does not describe Sari Financial Management as a CPA firm. Complex corporate tax matters can be reviewed or referred to an appropriate tax professional when necessary. Ask during consultation if you need a service that requires a specific designation.",
      },
      {
        question: "How do I book tax services in Calgary?",
        answer:
          "Contact Sari Financial Management to discuss your situation. Share whether you need personal, self-employed, corporate, GST/HST, or CRA support—and your timeline—so we can outline a clear scope.",
      },
    ],
    disclaimer:
      "Tax and CRA support is scoped per engagement. Complex corporate matters may be referred when appropriate. This is not a substitute for legal advice.",
  },
  {
    slug: "business-advisory",
    name: "Financial Services",
    href: "/services/business-advisory",
    journey: serviceJourneyStages[3],
    bestFor:
      "Individuals, families, and business owners who want clearer financial guidance—and, where licensed, protection planning through insurance.",
    what: "Financial guidance, business financial review, and insurance solutions based on your needs.",
    problem:
      "It is hard to make confident decisions—or protect what you have built—when your financial picture feels unclear.",
    outcome:
      "Understand your numbers, protect what you’ve built, and plan with more confidence.",
    summary:
      "Financial needs reviews, budgeting and cash-flow guidance, business financial review, and life / critical illness / disability insurance where offered under the appropriate insurance licence.",
    description:
      "At Sari Financial Management, we help individuals, families, and business owners better understand their financial position and make informed financial decisions. Support can include personal financial guidance, business financial review, and insurance needs assessment. Accident & sickness, life, critical illness, and disability coverage are offered where permitted under the appropriate insurance licence. This is not investment or securities advice.",
    includes: [
      "Financial needs review",
      "Budget and cash-flow guidance",
      "Small-business financial review",
      "Life insurance needs assessment",
      "Critical illness and disability insurance options",
      "Family and business protection planning",
    ],
    seoTitle:
      "Financial Services in Calgary | Guidance & Insurance | Sari Financial Management",
    seoDescription:
      "Financial services in Calgary from Sari Financial Management—cash-flow and budget guidance, business financial review, and life, critical illness, and disability insurance where licensed.",
    h1: "Financial services in Calgary to understand, protect, and plan",
    intro:
      "One place for coordinated support: understand your numbers, review your financial position, and explore protection options based on your individual, family, or business needs.",
    problems: [
      "Income and expenses that feel hard to organize or track",
      "Cash flow that is unpredictable without a clear plan",
      "Business reports that exist but are hard to interpret",
      "Uncertainty about family or business protection needs",
      "Wanting practical guidance—not investment product pitches",
    ],
    mayInclude: [
      "Personal financial needs review",
      "Income and expense review",
      "Cash-flow planning and budgeting",
      "Financial goal planning",
      "Debt and expense management guidance",
      "Understanding financial statements",
      "Small-business financial review and cash-flow analysis",
      "Life insurance needs assessment",
      "Term and permanent life insurance options",
      "Disability and critical illness insurance options",
      "Family and business-owner protection planning",
      "Existing policy and beneficiary review",
    ],
    serviceAreas: [
      {
        title: "Financial guidance",
        description:
          "Practical support to organize your finances and clarify priorities.",
        items: [
          "Personal financial needs review",
          "Income and expense review",
          "Cash-flow planning",
          "Budgeting and financial organization",
          "Financial goal planning",
          "Debt and expense management guidance",
          "Understanding financial statements",
          "Financial record organization",
        ],
      },
      {
        title: "Financial review for business owners",
        description:
          "We combine your financial records with practical business insights.",
        items: [
          "Revenue and expense review",
          "Profitability and cash-flow analysis",
          "Payroll cost visibility",
          "Tax obligation awareness",
          "Business financial performance review",
          "Areas where costs may need attention",
          "Financial information that can support better business decisions",
        ],
      },
      {
        title: "Life insurance",
        description:
          "Protect what matters most with insurance solutions based on your individual and family needs.",
        items: [
          "Life insurance needs assessment",
          "Term life insurance",
          "Permanent life insurance options",
          "Family protection planning",
          "Income protection considerations",
          "Business-owner insurance needs",
          "Beneficiary and coverage review",
          "Existing policy review",
        ],
      },
      {
        title: "Accident & sickness insurance",
        description:
          "Where offered under the appropriate insurance licence.",
        items: [
          "Disability insurance",
          "Critical illness insurance",
          "Accident and sickness coverage",
          "Income protection solutions",
          "Individual and family needs assessment",
        ],
      },
    ],
    benefits: [
      "Clearer understanding of your personal or business financial position",
      "Practical budgeting and cash-flow organization",
      "Protection planning conversations grounded in your actual needs",
      "Coordinated support alongside bookkeeping, payroll, and tax services",
    ],
    audiences: [
      "Individuals and families who want clearer financial organization",
      "Self-employed professionals planning cash flow and protection needs",
      "Small-business owners reviewing performance and costs",
      "Anyone seeking practical guidance—not investment advice",
    ],
    process: [
      {
        title: "Consultation",
        body: "We discuss your goals, current financial picture, and whether you need guidance, business review, insurance assessment, or a combination.",
      },
      {
        title: "Review",
        body: "We look at the information you share—budgets, statements, or existing coverage—and identify priorities.",
      },
      {
        title: "Recommendations",
        body: "You receive plain-language next steps for organization, planning, or protection options that fit the agreed scope.",
      },
      {
        title: "Ongoing support",
        body: "If helpful, we continue with follow-up so your financial services stay coordinated with your books, payroll, and tax work.",
      },
    ],
    faqs: [
      {
        question: "Is this investment advice?",
        answer:
          "No. Financial services at Sari Financial Management focus on understanding your financial position, organizing cash flow and budgets, reviewing business numbers, and—where licensed—insurance needs. It is not investment or securities advice.",
      },
      {
        question: "Do you offer life and disability insurance?",
        answer:
          "Yes, where offered under the appropriate insurance licence. That can include life insurance needs assessment, term and permanent options, critical illness, disability, and related family or business protection planning.",
      },
      {
        question: "Can financial services work with my bookkeeping or tax work?",
        answer:
          "Yes. With bookkeeping, payroll, tax, GST/HST, CRA support, and financial services available in one practice, we can coordinate support so your records and planning conversations stay aligned.",
      },
      {
        question: "How do I get started?",
        answer:
          "Book a consultation with Sari Financial Management. Tell us whether you need personal guidance, business financial review, insurance assessment, or a mix—we’ll outline a clear scope before work begins.",
      },
    ],
    disclaimer:
      "Insurance products are offered only where permitted under the appropriate insurance licence. Financial services here are not investment or securities advice. Suitability and availability are confirmed in consultation.",
  },
] as const;

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContent.find((service) => service.slug === slug);
}

/** Services in customer-progression order (Organize → … → Understand & Plan). */
export function getServicesInJourneyOrder(): readonly ServiceContent[] {
  return [...serviceContent].sort((a, b) => a.journey.order - b.journey.order);
}
