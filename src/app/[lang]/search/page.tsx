import BreadCrumb from '@/components/breadcrumb';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';

export default function Search() {
  return (
    <>
      <BreadCrumb items={[{ key: BreadcrumbKey.Search }]} />
      <div>Search page</div>
    </>
  );
}
