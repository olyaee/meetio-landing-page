import { useEffect } from 'react';
import { seoConfig, BASE_URL, type SEOConfig } from '@/config/seo';

function setOrCreateMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOrCreateLink(rel: string, href: string, attrs?: Record<string, string>): HTMLLinkElement {
  const selector = attrs
    ? `link[rel="${rel}"]` + Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join('')
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return el;
}

export function useSEO(pathname: string) {
  useEffect(() => {
    const config: SEOConfig | undefined = seoConfig[pathname];
    if (!config) return;

    const canonicalUrl = BASE_URL + config.canonicalPath;
    const pageUrl = BASE_URL + pathname;

    // Title & lang
    document.title = config.title;
    document.documentElement.lang = config.lang;

    // Meta description
    setOrCreateMeta('name', 'description', config.description);

    // Canonical
    setOrCreateLink('canonical', canonicalUrl);

    // Open Graph
    setOrCreateMeta('property', 'og:title', config.title);
    setOrCreateMeta('property', 'og:description', config.description);
    setOrCreateMeta('property', 'og:url', pageUrl);
    setOrCreateMeta('property', 'og:image', `${BASE_URL}/logo.png`);

    // Twitter
    setOrCreateMeta('name', 'twitter:image', `${BASE_URL}/logo.png`);

    // Hreflang alternates — remove old ones first, then add fresh
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    const addedLinks: HTMLLinkElement[] = [];
    for (const alt of config.alternates) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', alt.lang);
      link.setAttribute('href', BASE_URL + alt.path);
      document.head.appendChild(link);
      addedLinks.push(link);
    }

    return () => {
      addedLinks.forEach((link) => link.remove());
    };
  }, [pathname]);
}
