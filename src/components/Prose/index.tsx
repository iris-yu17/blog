import type { ReactNode } from 'react';

type propsType = {
  children: ReactNode;
};

export default function Prose(props: propsType) {
  return <div className="prose prose-h2:border-b prose-h2:border-border prose-a:text-blue-500 font-rbtm">{props.children}</div>;
}
