import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'docs/:l1/:l2',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [{ l1: 'client', l2: 'quick-start' }],
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
