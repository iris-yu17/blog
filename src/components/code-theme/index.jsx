'use client';

import { useTheme } from 'next-themes';
import { Theme } from '@/types/enum/theme';

const lightCodeTheme = () => {
  return (
    <style jsx global>
      {`
        .hljs {
          color: #2a2c2d;
          background: #e6e6e6;
        }

        .hljs-emphasis {
          font-style: italic;
        }

        .hljs-strong {
          font-weight: bold;
        }

        .hljs-link {
          text-decoration: underline;
        }

        .hljs-comment,
        .hljs-quote {
          color: #676b79;
          font-style: italic;
        }

        .hljs-params {
          color: #676b79;
        }

        .hljs-punctuation,
        .hljs-attr {
          color: #2a2c2d;
        }

        .hljs-selector-tag,
        .hljs-name,
        .hljs-meta,
        .hljs-operator,
        .hljs-char.escape_ {
          color: #c56200;
        }

        .hljs-keyword,
        .hljs-deletion {
          color: #d92792;
        }

        .hljs-regexp,
        .hljs-selector-pseudo,
        .hljs-selector-attr,
        .hljs-variable.language_ {
          color: #cc5e91;
        }

        .hljs-subst,
        .hljs-property,
        .hljs-code,
        .hljs-formula,
        .hljs-section,
        .hljs-title.function_ {
          color: #3787c7;
        }

        .hljs-string,
        .hljs-symbol,
        .hljs-bullet,
        .hljs-addition,
        .hljs-selector-class,
        .hljs-title.class_,
        .hljs-title.class_.inherited__,
        .hljs-meta .hljs-string {
          color: #0d7d6c;
        }

        .hljs-variable,
        .hljs-template-variable,
        .hljs-number,
        .hljs-literal,
        .hljs-type,
        .hljs-link,
        .hljs-built_in,
        .hljs-title,
        .hljs-selector-id,
        .hljs-tag,
        .hljs-doctag,
        .hljs-attribute,
        .hljs-template-tag,
        .hljs-meta .hljs-keyword {
          color: #7641bb;
        }
      `}
    </style>
  );
};

const darkCodeTheme = () => {
  return (
    <style jsx global>
      {`
        .hljs {
          color: #adbac7;
          background: #22272e;
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-meta .hljs-keyword,
        .hljs-template-tag,
        .hljs-template-variable,
        .hljs-type,
        .hljs-variable.language_ {
          /* prettylights-syntax-keyword */
          color: #f47067;
        }

        .hljs-title,
        .hljs-title.class_,
        .hljs-title.class_.inherited__,
        .hljs-title.function_ {
          /* prettylights-syntax-entity */
          color: #dcbdfb;
        }

        .hljs-attr,
        .hljs-attribute,
        .hljs-literal,
        .hljs-meta,
        .hljs-number,
        .hljs-operator,
        .hljs-variable,
        .hljs-selector-attr,
        .hljs-selector-class,
        .hljs-selector-id {
          /* prettylights-syntax-constant */
          color: #6cb6ff;
        }

        .hljs-regexp,
        .hljs-string,
        .hljs-meta .hljs-string {
          /* prettylights-syntax-string */
          color: #96d0ff;
        }

        .hljs-built_in,
        .hljs-symbol {
          /* prettylights-syntax-variable */
          color: #f69d50;
        }

        .hljs-comment,
        .hljs-code,
        .hljs-formula {
          /* prettylights-syntax-comment */
          color: #768390;
        }

        .hljs-name,
        .hljs-quote,
        .hljs-selector-tag,
        .hljs-selector-pseudo {
          /* prettylights-syntax-entity-tag */
          color: #8ddb8c;
        }

        .hljs-subst {
          /* prettylights-syntax-storage-modifier-import */
          color: #adbac7;
        }

        .hljs-section {
          /* prettylights-syntax-markup-heading */
          color: #316dca;
          font-weight: bold;
        }

        .hljs-bullet {
          /* prettylights-syntax-markup-list */
          color: #eac55f;
        }

        .hljs-emphasis {
          /* prettylights-syntax-markup-italic */
          color: #adbac7;
          font-style: italic;
        }

        .hljs-strong {
          /* prettylights-syntax-markup-bold */
          color: #adbac7;
          font-weight: bold;
        }

        .hljs-addition {
          /* prettylights-syntax-markup-inserted */
          color: #b4f1b4;
          background-color: #1b4721;
        }

        .hljs-deletion {
          /* prettylights-syntax-markup-deleted */
          color: #ffd8d3;
          background-color: #78191b;
        }

        .hljs-char.escape_,
        .hljs-link,
        .hljs-params,
        .hljs-property,
        .hljs-punctuation,
        .hljs-tag {
          /* purposely ignored */
        }
      `}
    </style>
  );
};

export default function CodeTheme() {
  const { theme, setTheme } = useTheme();
  return theme === Theme.dark ? darkCodeTheme() : lightCodeTheme();
}
