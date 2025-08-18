import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
export function bootstrap() {
  return bootstrapApplication(App, appConfig).catch((err) =>
    console.error(err),
  );
}
