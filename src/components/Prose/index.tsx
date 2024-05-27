import type { ReactNode } from 'react';

type propsType = {
  children: ReactNode;
};

export default function Prose(props: propsType) {
  return (
    <div className="prose font-rbtm prose-h2:border-b prose-h2:border-border prose-hr:border-dashed">
      {props.children}
    </div>
  );
}
