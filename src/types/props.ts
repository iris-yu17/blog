import { Locales } from "./enum/locales";

export type Props = {
  params: { slug: string; lang: Locales; };
  searchParams: { [key: string]: string | string[] | undefined; };
};