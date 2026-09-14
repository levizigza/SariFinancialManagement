"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { analyticsClickAttrs } from "@/lib/analytics/events";
import { cn } from "@/lib/cn";
import { primaryNav, site, type NavItem } from "@/lib/site";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      el.getAttribute("aria-hidden") !== "true" &&
      el.tabIndex !== -1,
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
};

function NavLink({ href, children, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  /* Defer aria-current until mount to avoid SSR/client pathname hydration mismatch */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const active = mounted && isActivePath(pathname, href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "inline-flex items-center rounded-md font-sans text-sm font-semibold no-underline tracking-wide transition-colors duration-200",
        "min-h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300",
        /* Colors enforced in .site-header CSS; classes reinforce intent */
        active ? "text-gold-300" : "text-white hover:text-gold-300",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function ServicesDropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const buttonId = useId();
  const menuId = useId();
  const children = item.children ?? [];
  const sectionActive = isActivePath(pathname, item.href);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <li ref={wrapRef} className="relative">
      <div className="flex items-center">
        <NavLink href={item.href} className="h-11 px-3" onNavigate={close}>
          {item.label}
        </NavLink>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          aria-label={`${item.label} submenu`}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-md text-ivory-50 transition-colors",
            "hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300",
            (open || sectionActive) && "text-gold-300",
          )}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M2.5 4.5 L6 8 L9.5 4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {open ? (
        <ul
          id={menuId}
          role="list"
          aria-labelledby={buttonId}
          className="absolute left-0 top-full z-50 mt-1 min-w-[14rem] list-none m-0 p-2 rounded-md border border-gold-500/30 bg-navy-900 shadow-lg"
        >
          {children.map((child) => (
            <li key={child.href}>
              <NavLink
                href={child.href}
                onNavigate={close}
                className="w-full flex-col items-start justify-center gap-0.5 px-3 py-2.5 hover:bg-white/5"
              >
                {child.journeyLabel ? (
                  <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-300/85">
                    {child.journeyLabel}
                  </span>
                ) : null}
                <span>{child.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function DesktopNav() {
  return (
    <nav aria-label="Primary" className="site-header-nav hidden pl-4 lg:block xl:pl-8">
      <ul className="m-0 flex list-none items-center gap-0.5 p-0">
        {primaryNav.map((item) =>
          item.children ? (
            <ServicesDropdown key={item.href} item={item} />
          ) : (
            <li key={item.href}>
              <NavLink href={item.href} className="h-11 px-3">
                {item.label}
              </NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

export function MainNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonId = useId();
  const panelId = useId();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    const inertTargets = [main, footer].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );
    for (const el of inertTargets) {
      el.inert = true;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobile();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = getFocusableElements(panelRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      for (const el of inertTargets) {
        el.inert = false;
      }
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen, closeMobile]);

  return (
    <div className="site-header-nav flex flex-1 items-center gap-3 lg:gap-6">
      <DesktopNav />

      <div className="ml-auto flex items-center gap-3 lg:gap-4">
        <a
          href={site.phoneHref}
          className="hidden min-h-11 items-center rounded-sm font-sans text-sm font-semibold text-white no-underline transition-colors hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 lg:inline-flex"
          {...analyticsClickAttrs("phone_click", "header")}
        >
          {site.phoneDisplay}
        </a>
        <ButtonLink
          href={site.cta.href}
          variant="onNavy"
          size="sm"
          className="hidden lg:inline-flex"
          {...analyticsClickAttrs("book_consultation_click", "header")}
        >
          {site.cta.label}
        </ButtonLink>

        <ButtonLink
          href={site.cta.href}
          variant="onNavy"
          size="sm"
          className="lg:hidden max-[380px]:px-3"
          aria-label={site.cta.label}
          {...analyticsClickAttrs("book_consultation_click", "header_mobile")}
        >
          <span className="sm:hidden" aria-hidden="true">
            Book
          </span>
          <span className="hidden sm:inline">{site.cta.label}</span>
        </ButtonLink>

        <button
          type="button"
          ref={menuButtonRef}
          id={menuButtonId}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
          aria-expanded={mobileOpen}
          aria-controls={panelId}
          aria-haspopup="dialog"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4 6 H16 M4 10 H16 M4 14 H16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          ref={panelRef}
          id={panelId}
          className="fixed inset-0 z-[110] lg:hidden bg-navy-950 text-ivory-50 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex items-center justify-between gap-3 border-b border-gold-500/25 px-6 py-4">
            <p className="font-display text-lg font-semibold m-0">{site.name}</p>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ivory-50 hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
              aria-label="Close menu"
              onClick={closeMobile}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M5 5 L15 15 M15 5 L5 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="flex flex-col list-none m-0 p-0 gap-1">
              {primaryNav.map((item) =>
                item.children ? (
                  <li key={item.href} className="flex flex-col">
                    <div className="flex items-stretch">
                      <NavLink
                        href={item.href}
                        onNavigate={closeMobile}
                        className="flex-1 min-h-12 px-3 text-base"
                      >
                        {item.label}
                      </NavLink>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="mobile-services-submenu"
                        className="inline-flex min-h-12 w-12 items-center justify-center rounded-md text-ivory-50 hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
                        onClick={() => setServicesOpen((value) => !value)}
                      >
                        <span className="sr-only">Toggle Services submenu</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                          <path
                            d={
                              servicesOpen
                                ? "M2.5 7.5 L6 4 L9.5 7.5"
                                : "M2.5 4.5 L6 8 L9.5 4.5"
                            }
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <ul
                      id="mobile-services-submenu"
                      hidden={!servicesOpen}
                      className="list-none m-0 mb-2 ml-3 border-l border-gold-500/25 pl-3"
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            href={child.href}
                            onNavigate={closeMobile}
                            className="min-h-12 w-full flex-col items-start justify-center gap-0.5 px-3 py-2 text-base"
                          >
                            {child.journeyLabel ? (
                              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-300/85">
                                {child.journeyLabel}
                              </span>
                            ) : null}
                            <span>{child.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      onNavigate={closeMobile}
                      className="min-h-12 w-full px-3 text-base"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="border-t border-gold-500/20 p-6 space-y-4">
            <div className="font-sans text-sm space-y-2">
              <p className="m-0 text-ivory-50/70">{site.location}</p>
              <p className="m-0">
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-11 items-center text-gold-300 no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 rounded-sm"
                  {...analyticsClickAttrs("phone_click", "mobile_menu")}
                >
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="m-0">
                <a
                  href={site.emailHref}
                  className="inline-flex min-h-11 items-center text-ivory-50 break-all no-underline hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 rounded-sm"
                  {...analyticsClickAttrs("email_click", "mobile_menu")}
                >
                  {site.email}
                </a>
              </p>
            </div>
            <ButtonLink
              href={site.cta.href}
              variant="onNavy"
              className="w-full"
              onClick={closeMobile}
              {...analyticsClickAttrs("book_consultation_click", "mobile_menu")}
            >
              {site.cta.label}
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
