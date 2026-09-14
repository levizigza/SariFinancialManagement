/**
 * Temporary royalty-free atmosphere photography (Unsplash License).
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
    height: 1333,
    alt: "Calgary skyline silhouetted at sunset, with the Calgary Tower visible",
    credit: "Photo via Unsplash",
    creditUrl: "https://unsplash.com/photos/S1oGZ9Jt71s",
  },
  advisoryConversation: {
    id: "advisory-conversation",
    src: "/images/stock/advisory-conversation.jpg",
    width: 1800,
    height: 1200,
    alt: "Two people reviewing handwritten plans and notes together at a desk",
    credit: "Photo via Unsplash",
    creditUrl: "https://unsplash.com/photos/5fNmWej4tAA",
  },
  organizedDesk: {
    id: "organized-desk",
    src: "/images/stock/organized-desk.jpg",
    width: 1800,
    height: 1200,
    alt: "Professionals in conversation at a desk with a laptop and notebook",
    credit: "Photo via Unsplash",
    creditUrl: "https://unsplash.com/photos/5QgIuuBxKwM",
  },
  workspaceCalm: {
    id: "workspace-calm",
    src: "/images/stock/workspace-calm.jpg",
    width: 1800,
    height: 1200,
    alt: "Calm workspace with an open notebook, pen, laptop, and natural light",
    credit: "Photo via Unsplash",
    creditUrl: "https://unsplash.com/photos/FHnnjk1Yj7Y",
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
} as const satisfies Record<string, StockPhoto>;

/** Default hero imagery by route — keeps pages visually distinct */
export const pageHeroPhotos = {
  about: stockPhotos.workspaceCalm,
  services: stockPhotos.advisoryConversation,
  bookkeeping: stockPhotos.advisoryConversation,
  payroll: stockPhotos.organizedDesk,
  tax: stockPhotos.taxFormsDesk,
  advisory: stockPhotos.organizedDesk,
  contact: stockPhotos.calgarySkyline,
  resources: stockPhotos.workspaceCalm,
  faq: stockPhotos.organizedDesk,
  privacy: stockPhotos.workspaceCalm,
} as const;
