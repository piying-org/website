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
import { ButtonLinkComponent } from './link/component';
import { ValidWC } from './wrapper/valid/component';
import { DropdownComponent } from './dropdown/component';
import { CheckboxComponent } from './checkbox/component';
import { FormlyFieldWC } from './wrapper/formly-field-wrapper/component';
import { JoinItemWC } from './wrapper/join-wrapper/component';
import { PanelWC } from './wrapper/panel-wrapper/component';
import { TooltipWC } from './wrapper/tooltip/component';
import { JsonSchemaLabelWC } from './wrapper/json-schema-label/component';
import { InputFCC } from './input';
import { InputNumberFCC } from './input-number';
import { InputCheckboxFCC } from './input-checkbox';
import { InputRangeFCC } from './input-range';
import { InputFileFCC } from './input-file';
import { TextareaFCC } from './textarea';
import { DivNFCC } from './block';
import { DemoNFCC } from './demo';
import { SelectorlessNFCC } from './selector-less';
const LazyRestGroup = () =>
  import('./group/rest-group/component').then((item) => item.default);
export const FieldGlobalConfig = {
  types: {
    string: {
      type: InputFCC,
      attributes: {
        class: 'input',
      },
    },
    number: {
      type: InputNumberFCC,
      attributes: {
        class: 'input',
      },
    },
    radio: {
      type: () => import('./radio/component').then((a) => a.default),
    },
    boolean: {
      type: InputCheckboxFCC,
      attributes: {
        class: 'checkbox',
      },
      // wrappers: ['label'],
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
      type: InputCheckboxFCC,
      attributes: {
        class: 'toggle',
      },
    },
    picklist: {
      type: SelectComponent,
      wrappers: ['label'],
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
      wrappers: ['label'],
    },
    range: {
      type: InputRangeFCC,
      attributes: {
        class: 'range',
      },
    },
    fileInput: {
      type: InputFileFCC,
      attributes: {
        class: 'file-input',
      },
    },
    textarea: {
      type: TextareaFCC,
      attributes: {
        class: 'textarea',
      },
    },

    object: {
      type: PiyingViewGroup,
    },
    restGroup: {
      type: LazyRestGroup,
    },
    strict_object: {
      type: LazyRestGroup,
    },
    loose_object: {
      type: LazyRestGroup,
    },
    object_with_rest: {
      type: LazyRestGroup,
    },
    array: {
      type: LazyRestGroup,
    },
    tuple: {
      type: LazyRestGroup,
    },
    strict_tuple: {
      type: LazyRestGroup,
    },
    loose_tuple: {
      type: LazyRestGroup,
    },
    tuple_with_rest: {
      type: LazyRestGroup,
    },
    record: {
      type: LazyRestGroup,
    },
    intersect: {
      type: PiyingViewGroup,
    },
    'intersect-group': {
      type: PiyingViewGroup,
    },
    main: {
      type: () => import('./main/component').then((item) => item.MainNFCC),
    },
    'main-1': {
      type: () =>
        import('./main-1/component').then((item) => item.Main1Component),
      selector: 'main',
      attributes: {
        type: 'home',
      },
    },
    codeEditor: {
      attributes: {
        type: 'code-editor',
        class: 'h-full',
      },
      type: () =>
        import('./monaco-editor/component').then((item) => item.default),
    },
    jsonEditor: {
      attributes: {
        type: 'json-editor',
        class: 'h-full',
      },
      type: () =>
        import('./json-monaco-editor/component').then((item) => item.default),
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
      type: DivNFCC,
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
    formHelper: {
      type: () => import('./form-helper/component').then((a) => a.default),
    },
    divider: {
      type: DivNFCC,
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
      type: InputFCC,
      attributes: {
        class: 'input',
      },
      props: {
        title: 'First Name',
      },
    },
    lastName: {
      type: InputFCC,
      attributes: {
        class: 'input',
      },
      props: {
        title: 'Last Name',
      },
    },
    demo: {
      type: DemoNFCC,
    },
    'selectorless-demo': {
      type: SelectorlessNFCC,
    },
  },
  wrappers: {
    validator: {
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
      type: JsonSchemaLabelWC,
    },
    'jsonschema-label': {
      type: JsonSchemaLabelWC,
    },
    tooltip: {
      type: TooltipWC,
    },
  },
} as PiViewConfig;
