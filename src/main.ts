import { bootstrapApplication } from '@angular/platform-browser';
import { loadTranslations } from '@cyia/localize';
const browserLanguage = navigator.language;
if (!localStorage.getItem('lang')) {
  localStorage.setItem(
    'lang',
    browserLanguage.startsWith('zh') ? 'zh-hans' : 'en',
  );
}
const lang = localStorage.getItem('lang')!;
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
    let { App } = await import('./app/app');
    let { appConfig } = await import('./app/app.config');

    bootstrapApplication(App, appConfig).catch((err) => console.error(err));
  });
