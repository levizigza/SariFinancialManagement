import { cn } from "@/lib/cn";
import type { ServiceSlug } from "@/lib/site";

type ServiceIconProps = {
  slug: ServiceSlug;
  className?: string;
};

const iconClass = "h-6 w-6";

/** Simple line icons — navy stroke by default; gold on navy surfaces via CSS. */
export function ServiceIcon({ slug, className }: ServiceIconProps) {
  const shared = {
    className: cn(iconClass, className),
    viewBox: "0 0 24 24",
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (slug) {
    case "bookkeeping":
      return (
        <svg {...shared}>
          <path
            d="M6 4.5h9.5A2.5 2.5 0 0 1 18 7v13.5H8A2.5 2.5 0 0 1 5.5 18V6A1.5 1.5 0 0 1 7 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 9h6M9 12.5h6M9 16h3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "payroll":
      return (
        <svg {...shared}>
          <circle
            cx="9"
            cy="8"
            r="2.25"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M4.5 17.5c.4-2.4 2.2-3.75 4.5-3.75s4.1 1.35 4.5 3.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M15 9.5h4.5M17.25 7.25v4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "tax-services":
      return (
        <svg {...shared}>
          <path
            d="M7 3.75h7.5L19 8.25V20.25H7V3.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 3.75V8.25H19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M10 12.5h6M10 15.75h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "business-advisory":
      return (
        <svg {...shared}>
          <path
            d="M4.5 18.5V14M9.5 18.5V9.5M14.5 18.5v-6M19.5 18.5V6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M4.5 11.5 9.5 8l5 2.5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
