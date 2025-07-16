import {
  IsActiveMatchOptions,
  Params,
  QueryParamsHandling,
} from '@angular/router';
export const ExactMatchOptions: IsActiveMatchOptions = {
  paths: 'exact',
  fragment: 'ignored',
  matrixParams: 'ignored',
  queryParams: 'exact',
};
export const SubsetMatchOptions: IsActiveMatchOptions = {
  paths: 'subset',
  fragment: 'ignored',
  matrixParams: 'ignored',
  queryParams: 'subset',
};
export interface NavigationItem {
  id?: string;
  title?: string;
  subtitle?: string;
  type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';
  hidden?: (item: NavigationItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  fragment?: string;
  preserveFragment?: boolean;
  queryParams?: Params | null;
  queryParamsHandling?: QueryParamsHandling | null;
  externalLink?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  activateMatchOptions?: IsActiveMatchOptions;
  function?: (item: NavigationItem) => void;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  badge?: {
    title?: string;
    classes?: string;
  };
  children?: NavigationItem[];
  meta?: any;
}

export type NavigationMode = 'over' | 'side';

export type NavigationPosition = 'left' | 'right';
