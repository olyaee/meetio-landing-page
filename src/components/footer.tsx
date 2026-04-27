import { BrandLogo } from "@/components/brand-logo";
import { BRAND_NAME, CHROME_EXTENSION_URL, LINKEDIN_URL } from "@/lib/brand";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Chrome Extension", href: CHROME_EXTENSION_URL },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "LinkedIn", href: LINKEDIN_URL },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Support", href: "/support" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      <div className="max-w-[1100px] mx-auto px-6 pt-16 pb-10 flex flex-wrap justify-between gap-10">
        <div>
          <BrandLogo className="mb-2" iconSize={22} textClassName="font-bold text-lg" />
          <div className="text-[13px] text-muted">
            Bug reporting that developers actually love.
          </div>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
              {col.title}
            </h4>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-muted mb-2 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-[1100px] mx-auto px-6 py-5 border-t border-border text-[13px] text-muted">
        &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
