import type { ReactNode } from 'react';

type propsType = {
  children: ReactNode;
};

export default function Prose(props: propsType) {
  return <div className="prose prose-h2:border-b prose-a:text-blue-500">{props.children}</div>;
}
