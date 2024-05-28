import BreadCrumb from '@/components/breadcrumb';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';

export default function About() {
  return (
    <>
      <BreadCrumb
        items={[
          {
            key: BreadcrumbKey.Category,
          },
        ]}
      />
      <div>About page</div>
    </>
  );
}
