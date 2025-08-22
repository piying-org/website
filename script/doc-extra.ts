import { sync } from 'fast-glob';
import path from 'path';
import fs from 'fs';
import { getLineContent, parseText } from './marked-parse';
export async function docExtract() {
  const list = sync('./public/docs/**/*', { cwd: process.cwd() });
  for (const item of list) {
    const filePath = path.join(process.cwd(), item);
    const content = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
    parseText(content);
  }
  const extractData = getLineContent();
  await fs.promises.writeFile(
    path.join(process.cwd(), './i18n/input/doc.json'),
    extractData,
  );
}

docExtract();
