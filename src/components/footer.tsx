const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Chrome Extension", href: "https://chromewebstore.google.com/detail/meetio/pdgedjihhemnhfocoogmhpnehcpeclfb" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "LinkedIn", href: "https://linkedin.com/company/meetio-ai/" },
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
          <div className="font-bold text-lg mb-2">meetio</div>
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
        &copy; {new Date().getFullYear()} meetio. All rights reserved.
      </div>
    </footer>
  );
}
