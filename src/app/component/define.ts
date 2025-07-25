import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  NumberValueAccessor,
  RangeValueAccessor,
} from '@angular/forms';
import { PiViewConfig, PiyingViewGroup } from '@piying/view-angular';
import { SelectComponent } from './select/component';
import { RatingComponent } from './rating/component';
import { FileInputDirective } from './file-input/file-input.directive';
import { FieldsetFGC } from './fieldset/component';
import { MainNFCC } from './main/component';
import { Main1Component } from './main-1/component';
import { ButtonLinkComponent } from './link/component';
import { ValidWC } from './wrapper/valid/component';
import { DropdownComponent } from './dropdown/component';
import { CheckboxComponent } from './checkbox/component';
import { FormlyFieldWC } from './wrapper/formly-field-wrapper/component';
import { JoinItemWC } from './wrapper/join-wrapper/component';
import { PanelWC } from './wrapper/panel-wrapper/component';
import { LabelWC } from './wrapper/label/component';
export const FieldGlobalConfig = {
  types: {
    string: {
      type: 'input',
      attributes: {
        class: 'input',
      },
      directives: [{ type: DefaultValueAccessor, selector: 'formControl' }],
    },
    number: {
      type: 'input',
      attributes: {
        type: 'number',
        class: 'input',
      },
      directives: [{ type: NumberValueAccessor, selector: 'formControl' }],
    },
    radio: {
      type: () => import('./radio/component').then((a) => a.default),
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
    checkbox: {
      type: CheckboxComponent,
      props: {
        hideTitle: true,
      },
    },
    fieldset: {
      type: FieldsetFGC,
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
    },
    multiselect: {
      type: SelectComponent,
      inputs: { multiple: true },
    },
    dropdown: {
      type: DropdownComponent,
      selector: 'div',
      attributes: {
        type: 'dropdown',
        class: 'dropdown',
      },
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

    object: {
      type: PiyingViewGroup,
    },
    intersect: {
      type: PiyingViewGroup,
    },
    'intersect-group': {
      type: PiyingViewGroup,
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
    button: {
      type: () => import('./button/component').then((a) => a.default),
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
    steps: {
      type: () => import('./step-group/component').then((a) => a.default),
    },
    validGroup: {
      type: () => import('./valid-group/component').then((a) => a.default),
    },
    filterGroup: {
      type: () => import('./filter-group/component').then((a) => a.default),
    },
    scrollGroup: {
      type: () => import('./scroll-group/component').then((a) => a.default),
    },
    'formly-custom-input-1': {
      type: () =>
        import('./formly-custom-input-1/component').then((a) => a.default),
    },
    'formly-group': {
      type: () =>
        import('./group/formly-group/component').then((a) => a.default),
    },
    formHelper: {
      type: () => import('./form-helper/component').then((a) => a.default),
    },
    divider: {
      type: 'div',
      attributes: {
        class: 'divider',
      },
    },
    jsonSchema: {
      type: () => import('./json-schema/component').then((a) => a.default),
    },
    'logic-group': {
      type: () => import('./logic-group/component').then((a) => a.default),
    },
    null: {
      type: () => import('./null/component').then((a) => a.default),
    },

    date: {
      type: () => import('./date/component').then((a) => a.default),
    },
    salutation: {
      type: SelectComponent,
      props: {
        title: 'Salutation',
        placeholder: 'Please Select',
      },
      inputs: {
        options: ['Mr.', 'Ms.', 'Dr.', 'Dude'],
      },
    },
    firstName: {
      type: 'input',
      attributes: {
        class: 'input',
      },
      directives: [{ type: DefaultValueAccessor, selector: 'formControl' }],
      props: {
        title: 'First Name',
      },
    },
    lastName: {
      type: 'input',
      attributes: {
        class: 'input',
      },
      directives: [{ type: DefaultValueAccessor, selector: 'formControl' }],
      props: {
        title: 'Last Name',
      },
    },
  },
  wrappers: {
    valid: {
      type: ValidWC,
    },
    formlyField: {
      type: FormlyFieldWC,
    },
    joinItem: {
      type: JoinItemWC,
    },
    panel: {
      type: PanelWC,
    },
    label: {
      type: LabelWC,
    },
  },
} as PiViewConfig;
