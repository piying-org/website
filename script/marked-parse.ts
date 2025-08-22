import { Tokens, Marked } from 'marked';

const marked = new Marked();
const textList = new Set<string>();

function needAddTranslate(value: string) {
  return !!value.trim() && /\p{Script=Hani}/u.test(value);
}
marked.use({
  hooks: {
    processAllTokens(tokens) {
      for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index];
        if (
          token.type === 'heading' ||
          token.type === 'paragraph' ||
          token.type === 'blockquote'
        ) {
          if (needAddTranslate(token.text)) {
            textList.add(token.text);
          }
        } else if (token.type === 'list') {
          for (let j = 0; j < (token as Tokens.List).items.length; j++) {
            const item = (token as Tokens.List).items[j];
            if (needAddTranslate(item.text)) {
              textList.add(item.text);
            }
          }
        }
      }
      return tokens;
    },
  },
});
export function parseText(text: string) {
  marked.parse(text);
}
export function getLineContent() {
  return JSON.stringify([...textList].sort(), undefined, 4);
}
