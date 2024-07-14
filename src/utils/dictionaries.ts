import 'server-only';

interface DictionaryModule {
  default: Record<string, any>;
}

const dictionaries: Record<string, Record<string, () => Promise<Record<string, any>>>> = {
  'en-US': {
    'common': () => import('./../dictionaries/en-US/common.json').then((module: DictionaryModule) => module.default),
    'article': () => import('./../dictionaries/en-US/article.json').then((module: DictionaryModule) => module.default)
  },
  'zh-Hant': {
    'common': () => import('./../dictionaries/zh-Hant/common.json').then((module: DictionaryModule) => module.default),
    'article': () => import('./../dictionaries/zh-Hant/article.json').then((module: DictionaryModule) => module.default)
  },
};

export const getDictionary = async (locale: string, fileName: string): Promise<Record<string, any>> => {
  return dictionaries[locale][fileName]();
};