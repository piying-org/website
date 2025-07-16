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
import {
  PI_VIEW_FIELD_TOKEN,
  PiViewGroupBase,
} from '@piying/view-angular';
import { NavigationComponent, NavigationItem } from '../navigation';
import { filter, merge, of, map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
const Menu: NavigationItem[] = [
  {
    title: '首页',
    type: 'basic',
    link: '/',
  },
  {
    title: '加入测试',
    type: 'basic',
    link: '/docs/join-test',
  },
  {
    title: `文档`,
    type: 'group',
    children: [
      { title: `介绍`, link: '/docs/intro/', type: 'basic' },
      { title: `安装`, link: '/docs/install/', type: 'basic' },
    ],
  },
  {
    title: '客户端',
    type: 'group',
    children: [
      { title: `介绍`, link: '/docs/client/intro', type: 'basic' },
      { title: `组件使用`, link: '/docs/client/component-use', type: 'basic' },
      { title: `表单使用`, link: '/docs/client/form-use', type: 'basic' },
    ],
  },
  {
    title: '服务端',
    type: 'group',
    children: [{ title: `介绍`, link: '/docs/server/intro', type: 'basic' }],
  },
  { title: '游乐场', type: 'basic', link: '/playground/group/form' },
];
@Component({
  selector: '',
  templateUrl: './component.html',
  imports: [RouterOutlet, NgTemplateOutlet, NavigationComponent, MatIcon],
})
export class MainNFCC extends PiViewGroupBase {
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
      this.drawerOpen$.set((filePath === '/'||filePath.startsWith('/playground')) ? false : true);
    });
  }
}
