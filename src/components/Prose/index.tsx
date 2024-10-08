import type { ReactNode } from 'react';

type propsType = {
  children: ReactNode;
};

export default function Prose(props: propsType) {
  return (
    <div className="prose font-rbtm prose-h2:scroll-mt-20 prose-h2:border-b prose-h2:border-border prose-h4:mb-3 prose-hr:border-dashed prose-hr:border-gray-200 prose-h4:text-lg">
      {props.children}
    </div>
  );
}
