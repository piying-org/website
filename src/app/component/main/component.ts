import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { PI_VIEW_FIELD_TOKEN, PiyingViewGroupBase } from '@piying/view-angular';
import { NavigationComponent, NavigationItem } from '../navigation';
import { filter, merge, of, map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { $localize } from '@cyia/localize';
const Menu: NavigationItem[] = [
  {
    title: $localize`首页`,
    type: 'basic',
    link: '/',
  },
  {
    title: $localize`加入测试`,
    type: 'basic',
    link: '/docs/join-test',
  },
  {
    title: $localize`文档`,
    type: 'group',
    children: [{ title: $localize`介绍`, link: '/docs/intro/', type: 'basic' }],
  },
  {
    title: $localize`客户端`,
    type: 'group',
    children: [
      { title: $localize`介绍`, link: '/docs/client/intro', type: 'basic' },
      {
        title: $localize`快速开始`,
        link: '/docs/client/quick-start',
        type: 'basic',
      },
      {
        title: $localize`概念`,
        link: '/docs/client/concept',
        type: 'basic',
      },
      {
        title: $localize`表单`,
        link: '/docs/client/form',
        type: 'basic',
      },
      {
        title: $localize`Action`,
        link: '/docs/client/action',
        type: 'basic',
      },
      {
        title: $localize`验证`,
        link: '/docs/client/validator',
        type: 'basic',
      },
      {
        title: $localize`路径查询`,
        link: '/docs/client/path-query',
        type: 'basic',
      },
      {
        title: $localize`组件使用(用例)`,
        link: '/docs/client/component-use',
        type: 'basic',
      },
      {
        title: $localize`表单使用(用例)`,
        link: '/docs/client/form-use',
        type: 'basic',
      },
      {
        title: $localize`ngx-formly迁移`,
        link: '/docs/client/ngx-formly-migrate',
        type: 'basic',
      },
      {
        title: $localize`差异`,
        type: 'group',
        children: [
          {
            title: $localize`Vue`,
            type: 'basic',
            link: '/docs/client/difference-vue',
          },
          {
            title: $localize`React`,
            type: 'basic',
            link: '/docs/client/difference-react',
          },
        ],
      },
    ],
  },
  {
    title: $localize`服务端`,
    type: 'group',
    children: [
      { title: $localize`介绍`, link: '/docs/server/intro', type: 'basic' },
    ],
  },
  { title: $localize`游乐场`, type: 'basic', link: '/playground/group/form' },
];
@Component({
  selector: '',
  templateUrl: './component.html',
  imports: [RouterOutlet, NgTemplateOutlet, NavigationComponent, MatIcon],
})
export class MainNFCC extends PiyingViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);
  toolbar$$ = computed(() =>
    this.fields().find((item) => item.keyPath?.[0] === 'toolbar'),
  );
  navList = Menu;
  router = inject(Router);
  drawerToggleEl = viewChild<ElementRef<HTMLInputElement>>('drawerToggleEl');
  drawerOpen$ = signal(false);
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.drawerToggleEl()!.nativeElement.checked = false;
      }
    });
    merge(
      of(this.router.url),
      this.router.events.pipe(
        filter((item) => item instanceof NavigationEnd),
        map((item) => item.url),
      ),
    ).subscribe((filePath) => {
      this.drawerOpen$.set(
        filePath === '/' || filePath.startsWith('/playground') ? false : true,
      );
    });
  }
}
