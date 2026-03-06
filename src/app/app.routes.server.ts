import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'docs/:l1/:l2',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { l1: 'client', l2: 'quick-start' },
      { l1: 'client', l2: 'api' },
      { l1: 'client', l2: 'form' },
      { l1: 'client', l2: 'action' },
      { l1: 'client', l2: 'validator' },
      { l1: 'client', l2: 'path-query' },
      { l1: 'client', l2: 'component-use' },
      { l1: 'client', l2: 'form-use' },
      { l1: 'client', l2: 'ngx-formly-migrate' },
      { l1: 'client', l2: 'vee-validate-migration' },
      { l1: 'client', l2: 'formik-migration' },
      { l1: 'client', l2: 'react-hook-form-migration' },
      { l1: 'client', l2: 'react-tanstack-migration' },
      { l1: 'client', l2: 'difference-vue' },
      { l1: 'client', l2: 'difference-react' },
      { l1: 'client', l2: 'difference-svelte' },
      { l1: 'client', l2: 'difference-solid' },
      { l1: 'client', l2: 'jsonschema' },
    ],
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
