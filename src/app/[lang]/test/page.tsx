import { useTranslation } from '@/i18n';
import { Locales } from '@/types/enum/locales';

type PageProps = { params: { lng: Locales } };

export default async function Test({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng, 'common');
  return <div>test page: {t('breadcrumbs.home')}</div>;
}
