/// <reference types="@angular/localize" />

import { setGlobalConfig } from 'valibot';

import { bootstrap } from './bootstrap';
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
  .then(bootstrap);
