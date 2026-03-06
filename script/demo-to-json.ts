import { sync } from 'fast-glob';
import fs from 'fs';
import path from 'path';
function main() {
  const dir = path.join(process.cwd(), './src/examples');
  const list = fs.readdirSync(dir);
  const obj = {} as Record<string, any[]>;
  for (const name of list) {
    const stat = fs.statSync(path.join(dir, name));
    if (!stat.isDirectory()) {
      continue;
    }
    const fileList = sync('*.ts', { cwd: path.join(dir, name) });
    obj[name] = [];
    for (const item of fileList) {
      obj[name].push({
        label: item.slice(0, -3),
        value: fs.readFileSync(path.join(dir, name, item), {
          encoding: 'utf-8',
        }),
      });
    }
  }
  fs.mkdirSync(path.join(process.cwd(), './public/examples'), {
    recursive: true,
  });
  for (const [key, value] of Object.entries(obj)) {
    fs.writeFileSync(
      path.join(process.cwd(), './public/examples', key + '.json'),
      JSON.stringify(value, undefined, 4),
    );
  }
}
main();
