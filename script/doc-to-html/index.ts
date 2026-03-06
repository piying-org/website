import { sync } from 'fast-glob';
import path from 'path';
import fs from 'fs';
import { mdToHtml } from './md-to-html';
import * as prettier from 'prettier';
import { loadTranslations } from '@cyia/localize';
const outputDir = path.join(process.cwd(), './public/resolved/docs');

export async function main() {
  const cwd = path.join(process.cwd(), './public/docs');
  const list = sync('./**/*.md', {
    cwd: cwd,
  });
  for (const language of ['zh-hans', 'en']) {
    if (language !== 'zh-hans') {
      const transData = await import(`../../public/i18n/${language}.json`);
      loadTranslations(transData.default);
    }
    for (const item of list) {
      const fp = path.join(cwd, item);
      const content = await fs.promises.readFile(fp, { encoding: 'utf-8' });
      const result = await mdToHtml(
        content,
        path.posix
          .normalize(path.relative(path.dirname(cwd), fp.slice(0, -3)))
          .replaceAll('\\', '/'),
        language,
      );
      const prettierResult = await prettier.format(result, { parser: 'html' });

      const outputPath = path
        .join(outputDir, language, item)
        .replace(/\.md$/, '.html');

      await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.promises.writeFile(outputPath, prettierResult);
    }
  }
}
main();
