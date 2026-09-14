/**
 * Temporary royalty-free / editorial atmosphere photography.
 * Replace with client-approved photos when available.
 * These do NOT depict Sari Goitom Tekle or her clients.
 */

export type StockPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  creditUrl: string;
};

export const stockPhotos = {
  calgarySkyline: {
    id: "calgary-skyline",
    src: "/images/stock/calgary-skyline.jpg",
    width: 2000,
    height: 1331,
    alt: "Calgary skyline silhouetted at sunset, with the Calgary Tower visible",
    credit: "Photo via Unsplash",
    creditUrl: "https://unsplash.com/photos/S1oGZ9Jt71s",
  },
  consultationDesk: {
    id: "consultation-desk",
    src: "/images/stock/organized-desk.jpg",
    width: 1800,
    height: 1200,
    alt: "Professionals in conversation at a desk with a laptop and notebook",
    credit: "Photo via Unsplash",
    creditUrl: "https://unsplash.com/photos/5QgIuuBxKwM",
  },
  advisoryConversation: {
    id: "advisory-conversation",
    src: "/images/stock/advisory-conversation.jpg",
    width: 1800,
    height: 1201,
    alt: "Two people reviewing handwritten plans and notes together at a desk",
    credit: "Photo via Unsplash",
    creditUrl: "https://unsplash.com/photos/5fNmWej4tAA",
  },
  workspaceCalm: {
    id: "workspace-calm",
    src: "/images/stock/workspace-calm.jpg",
    width: 1800,
    height: 1350,
    alt: "Calm workspace with an open notebook, pen, laptop, and natural light",
    credit: "Photo via Unsplash",
    creditUrl: "https://unsplash.com/photos/FHnnjk1Yj7Y",
  },
  bookkeepingLedgers: {
    id: "bookkeeping-ledgers",
    src: "/images/stock/bookkeeping-ledgers.jpg",
    width: 1280,
    height: 720,
    alt: "Bookkeeping desk with ledger book, receipt tray, calculator, and spreadsheet laptop",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
  payrollPayRun: {
    id: "payroll-pay-run",
    src: "/images/stock/payroll-pay-run.jpg",
    width: 1280,
    height: 720,
    alt: "Payroll desk with pay-run schedule, payroll folder, timesheets, and summary laptop",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
  payrollPaySlips: {
    id: "payroll-pay-slips",
    src: "/images/stock/payroll-pay-slips.jpg",
    width: 1152,
    height: 864,
    alt: "Stack of pay slips beside a staff-pay binder and desk calendar",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
  taxFormsDesk: {
    id: "tax-forms-desk",
    src: "/images/stock/tax-forms-t1-t2-t4.jpg",
    width: 1280,
    height: 720,
    alt: "Organized desk with T1, T2, and T4 tax file folders, calculator, and documents",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
  taxPaperworkCloseup: {
    id: "tax-paperwork-closeup",
    src: "/images/stock/tax-paperwork-closeup.jpg",
    width: 1152,
    height: 864,
    alt: "Close-up of Canadian tax folders and calculator on an organized desk",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
  advisoryReports: {
    id: "advisory-reports",
    src: "/images/stock/advisory-reports.jpg",
    width: 1280,
    height: 720,
    alt: "Business advisory table with financial summary reports, charts, and planning notes",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
  servicesOverview: {
    id: "services-overview",
    src: "/images/stock/services-overview.jpg",
    width: 1280,
    height: 720,
    alt: "Four service folders labeled Bookkeeping, Payroll, Tax Services, and Business Advisory",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
  resourcesLearning: {
    id: "resources-learning",
    src: "/images/stock/resources-learning.jpg",
    width: 1280,
    height: 720,
    alt: "Quiet desk with educational booklets, reading glasses, and an insights notebook",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
  faqSupport: {
    id: "faq-support",
    src: "/images/stock/faq-support.jpg",
    width: 1280,
    height: 720,
    alt: "Support desk with phone, question notepad, and a tablet open to a help article",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
  privacyConfidential: {
    id: "privacy-confidential",
    src: "/images/stock/privacy-confidential.jpg",
    width: 1280,
    height: 720,
    alt: "Closed confidential folder with a lock stamp beside a muted laptop",
    credit: "Editorial illustration for Sari Financial Management",
    creditUrl: "https://sarifinancialmanagement.com",
  },
} as const satisfies Record<string, StockPhoto>;

/**
 * Hero imagery by route — each major surface gets a distinct photo.
 * Intentional reuse is only for place branding (Calgary) or matching CTA context.
 */
export const pageHeroPhotos = {
  about: stockPhotos.workspaceCalm,
  services: stockPhotos.servicesOverview,
  bookkeeping: stockPhotos.bookkeepingLedgers,
  payroll: stockPhotos.payrollPayRun,
  tax: stockPhotos.taxFormsDesk,
  advisory: stockPhotos.advisoryReports,
  contact: stockPhotos.calgarySkyline,
  resources: stockPhotos.resourcesLearning,
  faq: stockPhotos.faqSupport,
  privacy: stockPhotos.privacyConfidential,
  reviews: stockPhotos.advisoryConversation,
} as const;

/** Service detail asides — never identical to that service’s hero */
export const serviceAsidePhotos = {
  bookkeeping: stockPhotos.workspaceCalm,
  payroll: stockPhotos.payrollPaySlips,
  "tax-services": stockPhotos.taxPaperworkCloseup,
  "business-advisory": stockPhotos.advisoryConversation,
} as const;
