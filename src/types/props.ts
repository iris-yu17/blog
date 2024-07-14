export type Props = {
  params: { slug: string; lang: string; };
  searchParams: { [key: string]: string | string[] | undefined; };
};