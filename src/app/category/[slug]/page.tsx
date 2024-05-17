import { categoryList } from '@/data/category';
import { CategoryText } from '@/types/enum/category';
import CategoryBlock from '@/components/category-block';

export default function Category({ params }: { params: { slug: string } }) {
  const category = categoryList.find((item) => item.path === params.slug) || {
    tag: 'Gcp',
    paht: '',
  };
  const { tag } = category;
  return (
    <>
      <h1 className="text-4xl font-semibold leading-normal">文章分類</h1>
      <p className="mb-12 text-lg text-secondary">
        目前顯示分類為：{CategoryText[tag]}
      </p>
      <CategoryBlock />
    </>
  );
}
