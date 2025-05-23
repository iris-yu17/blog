import { CategoryKey } from "./enum/category";

export type Article = {
  id: string,
  name: string,
  description: string,
  tags: CategoryKey[],
  updated: string;
  priority?: number;
  recommend?: string[];
  revalidate?: true;
};
