import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'docs/:l1/',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { l1: 'intro' },
      { l1: 'source-code' },
      { l1: 'contact-me' },
    ],
  },
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
    path: 'docs/:l1/:l2/:l3',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { l1: 'client', l2: 'concept', l3: 'core' },
      { l1: 'client', l2: 'concept', l3: 'component' },
      { l1: 'client', l2: 'concept', l3: 'action' },
      { l1: 'client', l2: 'concept', l3: 'field' },
    ],
  },
  {
    path: 'playground/group/:type',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
