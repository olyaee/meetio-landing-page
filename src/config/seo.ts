const BASE_URL = 'https://meetio.ai';

export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  lang: 'de' | 'en';
  alternates: { lang: string; path: string }[];
  ogImage?: string;
}

const aboutAlternates = [
  { lang: 'de', path: '/uber-uns' },
  { lang: 'en', path: '/about-us' },
];

const privacyAlternates = [
  { lang: 'de', path: '/datenschutz' },
  { lang: 'en', path: '/privacy' },
];

const termsAlternates = [
  { lang: 'de', path: '/agbs' },
  { lang: 'en', path: '/terms' },
];

const cookieAlternates = [
  { lang: 'de', path: '/cookie-richtlinie' },
  { lang: 'en', path: '/cookies' },
];

const imprintAlternates = [
  { lang: 'de', path: '/impressum' },
  { lang: 'en', path: '/imprint' },
];

export const seoConfig: Record<string, SEOConfig> = {
  '/': {
    title: 'meetio.ai – AI-Powered Bug Intake Engineer',
    description:
      'Stop burning 30–120 minutes per bug. The first AI Intake Engineer that interviews users, captures the DOM, and creates deterministic test scripts.',
    canonicalPath: '/',
    lang: 'en',
    alternates: [{ lang: 'en', path: '/' }],
  },

  // About Us
  '/uber-uns': {
    title: 'Über uns – meetio.ai',
    description:
      'Erfahren Sie mehr über meetio.ai – das Münchener Team hinter dem KI-gestützten Bug-Intake-Assistenten.',
    canonicalPath: '/uber-uns',
    lang: 'de',
    alternates: aboutAlternates,
  },
  '/about-us': {
    title: 'About Us – meetio.ai',
    description:
      'Learn about meetio.ai – the Munich-based team behind the AI-powered bug intake assistant.',
    canonicalPath: '/uber-uns',
    lang: 'en',
    alternates: aboutAlternates,
  },

  // Privacy Policy
  '/datenschutz': {
    title: 'Datenschutzerklärung – meetio.ai',
    description:
      'Datenschutzerklärung von meetio.ai – wie wir Ihre Daten schützen und verarbeiten.',
    canonicalPath: '/datenschutz',
    lang: 'de',
    alternates: privacyAlternates,
  },
  '/privacy': {
    title: 'Privacy Policy – meetio.ai',
    description:
      'meetio.ai privacy policy – how we protect and process your data.',
    canonicalPath: '/datenschutz',
    lang: 'en',
    alternates: privacyAlternates,
  },

  // Terms & Conditions
  '/agbs': {
    title: 'Allgemeine Geschäftsbedingungen – meetio.ai',
    description:
      'AGB von meetio.ai – unsere allgemeinen Geschäftsbedingungen für die Nutzung unserer Dienste.',
    canonicalPath: '/agbs',
    lang: 'de',
    alternates: termsAlternates,
  },
  '/terms': {
    title: 'Terms & Conditions – meetio.ai',
    description:
      'meetio.ai terms and conditions for using our services.',
    canonicalPath: '/agbs',
    lang: 'en',
    alternates: termsAlternates,
  },

  // Cookie Policy
  '/cookie-richtlinie': {
    title: 'Cookie-Richtlinie – meetio.ai',
    description:
      'Cookie-Richtlinie von meetio.ai – welche Cookies wir verwenden und warum.',
    canonicalPath: '/cookie-richtlinie',
    lang: 'de',
    alternates: cookieAlternates,
  },
  '/cookies': {
    title: 'Cookie Policy – meetio.ai',
    description:
      'meetio.ai cookie policy – which cookies we use and why.',
    canonicalPath: '/cookie-richtlinie',
    lang: 'en',
    alternates: cookieAlternates,
  },

  // Imprint
  '/impressum': {
    title: 'Impressum – meetio.ai',
    description:
      'Impressum von meetio.ai – rechtliche Angaben gemäß § 5 TMG.',
    canonicalPath: '/impressum',
    lang: 'de',
    alternates: imprintAlternates,
  },
  '/imprint': {
    title: 'Imprint – meetio.ai',
    description:
      'meetio.ai legal notice and imprint information.',
    canonicalPath: '/impressum',
    lang: 'en',
    alternates: imprintAlternates,
  },
};

export { BASE_URL };
