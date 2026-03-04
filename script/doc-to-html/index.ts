import { sync } from 'fast-glob';
import path from 'path';
import fs from 'fs';
import { mdToHtml } from './md-to-html';
import * as prettier from 'prettier';
import { loadTranslations } from '@cyia/localize';

let outputDir = path.join(process.cwd(), './public/resolved/docs');
export async function main() {
  let cwd = path.join(process.cwd(), './public/docs');
  let list = sync('./**/*.md', {
    cwd: cwd,
  });
  for (const language of ['zh-hans', 'en']) {
    if (language !== 'zh-hans') {
      let transData = await import(`../../public/i18n/${language}.json`);
      loadTranslations(transData.default);
    }
    for (const item of list) {
      let fp = path.join(cwd, item);
      let content = await fs.promises.readFile(fp, { encoding: 'utf-8' });
      let result = await mdToHtml(content, language);
      let prettierResult = await prettier.format(result, { parser: 'html' });

      let outputPath = path
        .join(outputDir, language, item)
        .replace(/\.md$/, '.html');

      await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.promises.writeFile(outputPath, prettierResult);
    }
  }
}
main();
