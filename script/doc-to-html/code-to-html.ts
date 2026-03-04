import { codeToHtml as _codeToHtml } from 'shiki';

export async function codeToHtml(text: string, lang: string) {
  const html = await _codeToHtml(text, {
    lang: lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    colorReplacements: { '#fff': 'transparent' },
  });
  return html;
}
