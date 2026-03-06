/// <reference types="@angular/localize" />

import { setGlobalConfig } from 'valibot';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
Promise.resolve()
  .then(() => {
    const locale = $localize.locale;
    if (locale === 'zh-hans') {
      return import('@valibot/i18n/zh-CN').then(() => {
        setGlobalConfig({ lang: 'zh-CN' });
      });
    }
    return;
  })
  .then(() => {
    return bootstrapApplication(App, appConfig);
  })
  .catch((err) => console.error(err));
