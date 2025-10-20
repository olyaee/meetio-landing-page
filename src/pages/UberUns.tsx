import React from 'react';
import { useTranslation } from 'react-i18next';

const UberUns: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('aboutUs.title')}</h1>

      <p className="text-xl mb-6 text-center">
        {t('aboutUs.subtitle')}
      </p>

      <p className="mb-4">
        {t('aboutUs.intro1')}
      </p>

      <p className="mb-8">
        {t('aboutUs.intro2')}
      </p>

      <h2 className="text-3xl font-semibold mb-6">{t('aboutUs.frustration.title')}</h2>

      <p className="mb-4">
        {t('aboutUs.frustration.intro')}
      </p>

      <p className="mb-4">
        {t('aboutUs.frustration.elina')}
      </p>

      <p className="mb-4">
        {t('aboutUs.frustration.ehsan')}
      </p>

      <p className="mb-8">
        {t('aboutUs.frustration.juan')}
      </p>

      <p className="mb-8">
        {t('aboutUs.frustration.conclusion')}
      </p>

      <h2 className="text-3xl font-semibold mb-6">{t('aboutUs.mission.title')}</h2>

      <p className="mb-4">
        {t('aboutUs.mission.intro')}
      </p>

      <p className="mb-8">
        {t('aboutUs.mission.description')}
      </p>

      <p className="mb-8">
        {t('aboutUs.mission.conclusion')}
      </p>

      <h2 className="text-3xl font-semibold mb-6">{t('aboutUs.team.title')}</h2>

      <h3 className="text-2xl font-semibold mb-3">{t('aboutUs.team.elina.name')}</h3>
      <p className="mb-8">
        {t('aboutUs.team.elina.description')}
      </p>

      <h3 className="text-2xl font-semibold mb-3">{t('aboutUs.team.ehsan.name')}</h3>
      <p className="mb-8">
        {t('aboutUs.team.ehsan.description')}
      </p>

      <h3 className="text-2xl font-semibold mb-3">{t('aboutUs.team.juan.name')}</h3>
      <p className="mb-8">
        {t('aboutUs.team.juan.description')}
      </p>
    </div>
  );
};

export default UberUns;
