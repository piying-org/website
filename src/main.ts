import { bootstrapApplication } from '@angular/platform-browser';
import { loadTranslations } from '@cyia/localize';
import '@valibot/i18n/zh-CN';
import { setGlobalConfig } from 'valibot';

const browserLanguage = navigator.language;
if (!localStorage.getItem('lang')) {
  localStorage.setItem(
    'lang',
    browserLanguage.startsWith('zh') ? 'zh-hans' : 'en',
  );
}
const lang = localStorage.getItem('lang')!;
if (lang === 'zh-hans') {
  setGlobalConfig({ lang: 'zh-CN' });
}
fetch(`i18n/${lang}.json`)
  .then((a) => a.json())
  .then((data) => {
    loadTranslations(data);
  })
  .catch((rej) => {
    console.error(rej);
    loadTranslations({});
  })
  .then(async () => {
    const [{ App }, { appConfig }] = await Promise.all([
      import('./app/app'),
      import('./app/app.config'),
    ]);
    bootstrapApplication(App, appConfig).catch((err) => console.error(err));
  });
