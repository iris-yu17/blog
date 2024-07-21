import BreadCrumb from '@/components/breadcrumb';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';
import { Props } from '@/types/props';

export default function Search(props: Props) {
  const { params } = props;
  return (
    <>
      <BreadCrumb lang={params.lang} items={[{ key: BreadcrumbKey.Search }]} />
      <div>Search page</div>
    </>
  );
}
