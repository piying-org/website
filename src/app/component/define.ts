import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  RangeValueAccessor,
  SelectControlValueAccessor,
} from '@angular/forms';
import { PiViewConfig, PiViewGroup } from '@piying/view-angular';
import { SelectComponent } from './select/component';
import { RatingComponent } from './rating/component';
import { FileInputDirective } from './file-input/file-input.directive';
import { FieldsetFGC } from './fieldset/component';
import { MainNFCC } from './main/component';
import { Main1Component } from './main-1/component';
import { ButtonLinkComponent } from './link/component';
import { ValidWC } from './wrapper/valid/component';
export const FieldGlobalConfig = {
  types: {
    string: {
      type: 'input',
      attributes: {
        class: 'input',
      },
      directives: [{ type: DefaultValueAccessor, selector: 'formControl' }],
    },
    boolean: {
      type: 'input',
      attributes: {
        type: 'checkbox',
        class: 'checkbox',
      },
      directives: [
        { type: CheckboxControlValueAccessor, selector: 'formControl' },
      ],
    },
    number: {
      type: 'input',
      attributes: {
        type: 'number',
        class: 'input',
      },
      directives: [{ type: DefaultValueAccessor, selector: 'formControl' }],
    },
    toggle: {
      type: 'input',
      attributes: {
        type: 'checkbox',
        class: 'toggle',
      },
      directives: [
        { type: CheckboxControlValueAccessor, selector: 'formControl' },
      ],
    },
    picklist: {
      type: SelectComponent,
      attributes: {
        class: 'select',
      },
      directives: [
        { type: SelectControlValueAccessor, selector: 'formControl' },
      ],
    },
    rating: {
      type: RatingComponent,
      selector: 'div',
      attributes: {
        type: 'rating',
        class: 'rating',
      },
    },
    range: {
      type: 'input',
      attributes: {
        type: 'range',
        class: 'range',
      },
      directives: [{ type: RangeValueAccessor, selector: 'formControl' }],
    },
    fileInput: {
      type: 'input',
      attributes: {
        type: 'file',
        class: 'file-input',
      },
      directives: [{ type: FileInputDirective, selector: 'input' }],
    },
    textarea: {
      type: 'textarea',
      attributes: {
        class: 'textarea',
      },
      directives: [{ type: DefaultValueAccessor, selector: 'formControl' }],
    },
    fieldset: {
      type: FieldsetFGC,
    },
    object: {
      type: PiViewGroup,
    },
    intersect: {
      type: PiViewGroup,
    },
    'intersect-group': {
      type: PiViewGroup,
    },
    main: {
      type: MainNFCC,
    },
    'main-1': {
      type: Main1Component,
    },
    codeEditor: {
      selector: 'div',
      attributes: {
        type: 'code-editor',
        class: 'h-full',
      },
      type: () =>
        import('./monaco-editor/component').then((item) => item.default),
    },
    evalView: {
      type: () =>
        import('./playground-eval-view/component').then(
          (a) => a.PlayGroundEvalViewNFCC,
        ),
    },
    'button-link': {
      type: ButtonLinkComponent,
    },
    block: {
      type: 'div',
    },
    'array-rw': {
      type: () => import('./array-rw/component').then((a) => a.default),
    },
    tabs: {
      type: () => import('./tag-group/component').then((a) => a.default),
    },
    validGroup: {
      type: () => import('./valid-group/component').then((a) => a.default),
    },
    filterGroup:{
      type:() => import('./filter-group/component').then((a) => a.default)
    },
    scrollGroup:{
      type:() => import('./scroll-group/component').then((a) => a.default)
    }
  },
  wrappers: {
    valid: {
      type: ValidWC,
    },
  },
} as PiViewConfig;
