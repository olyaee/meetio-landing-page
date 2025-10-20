export const getLocalizedRoute = (route: string, language: string): string => {
  const routeMap: Record<string, Record<string, string>> = {
    aboutUs: {
      de: '/uber-uns',
      en: '/about-us'
    },
    privacy: {
      de: '/datenschutz',
      en: '/privacy'
    },
    terms: {
      de: '/agbs',
      en: '/terms'
    },
    cookies: {
      de: '/cookie-richtlinie',
      en: '/cookies'
    },
    imprint: {
      de: '/impressum',
      en: '/imprint'
    }
  };

  return routeMap[route]?.[language] || routeMap[route]?.de || route;
};