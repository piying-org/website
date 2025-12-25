import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  NumberValueAccessor,
  RangeValueAccessor,
} from '@angular/forms';
import { actions, PiViewConfig, PiyingViewGroup } from '@piying/view-angular';
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
import { BlockWC } from './wrapper/block/component';
const LazyRestGroup = () =>
  import('./group/rest-group/component').then((item) => item.default);
export const FieldGlobalConfig = {
  types: {
    string: {
      type: InputFCC,
      actions: [
        actions.attributes.set({
          class: 'input',
        }),
      ],
    },
    number: {
      type: InputNumberFCC,
      actions: [
        actions.attributes.set({
          class: 'input',
        }),
      ],
    },
    radio: {
      type: () => import('./radio/component').then((a) => a.default),
    },
    boolean: {
      type: InputCheckboxFCC,
      actions: [
        actions.attributes.set({
          class: 'checkbox',
        }),
      ],
    },
    checkbox: {
      type: CheckboxComponent,

      actions: [
        actions.props.set({
          hideTitle: true,
        }),
      ],
    },
    fieldset: {
      type: FieldsetFGC,
    },
    toggle: {
      type: InputCheckboxFCC,

      actions: [
        actions.attributes.set({
          class: 'toggle',
        }),
      ],
    },
    picklist: {
      type: SelectComponent,
      actions: [actions.wrappers.set([{ type: 'label' }])],
    },
    multiselect: {
      type: SelectComponent,
      actions: [actions.inputs.set({ multiple: true })],
    },
    'multiselect-repeat': {
      type: SelectComponent,
      actions: [actions.inputs.set({ multiple: true })],
    },
    dropdown: {
      type: DropdownComponent,
      actions: [
        actions.attributes.set({
          type: 'dropdown',
          class: 'dropdown',
        }),
      ],
    },

    rating: {
      type: RatingComponent,
      actions: [
        actions.attributes.set({
          type: 'rating',
          class: 'rating',
        }),
        actions.wrappers.set([{ type: 'label' }]),
      ],
    },
    range: {
      type: InputRangeFCC,

      actions: [
        actions.attributes.set({
          class: 'range',
        }),
      ],
    },
    fileInput: {
      type: InputFileFCC,

      actions: [
        actions.attributes.set({
          class: 'file-input',
        }),
      ],
    },
    textarea: {
      type: TextareaFCC,

      actions: [
        actions.attributes.set({
          class: 'textarea',
        }),
      ],
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
    'oneOf-condition': {
      type: LazyRestGroup,
    },
    'anyOf-condition': {
      type: LazyRestGroup,
    },
    union: {
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

      actions: [
        actions.attributes.set({
          type: 'home',
        }),
      ],
    },
    codeEditor: {
      type: () =>
        import('./monaco-editor/component').then((item) => item.default),
      actions: [
        actions.attributes.set({
          type: 'code-editor',
          class: 'h-full',
        }),
      ],
    },
    jsonEditor: {
      type: () =>
        import('./json-monaco-editor/component').then((item) => item.default),
      actions: [
        actions.attributes.set({
          type: 'json-editor',
          class: 'h-full',
        }),
      ],
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
      actions: [
        actions.attributes.set({
          class: 'divider',
        }),
      ],
    },
    jsonSchema: {
      type: () => import('./json-schema/component').then((a) => a.default),
    },
    'logic-group': {
      type: () => import('./logic-group/component').then((a) => a.default),
    },
    'anyOf-select': {
      type: () => import('./logic-group/component').then((a) => a.default),
    },
    'oneOf-select': {
      type: () => import('./logic-group/component').then((a) => a.default),
    },
    null: {
      type: () => import('./null/component').then((a) => a.default),
    },
    any: {
      type: () => import('./null/component').then((a) => a.default),
    },

    date: {
      type: () => import('./date/component').then((a) => a.default),
    },
    salutation: {
      type: SelectComponent,
      actions: [
        actions.props.set({
          title: 'Salutation',
          placeholder: 'Please Select',
        }),
        actions.inputs.set({
          options: ['Mr.', 'Ms.', 'Dr.', 'Dude'],
        }),
      ],
    },
    firstName: {
      type: InputFCC,
      actions: [
        actions.attributes.set({
          class: 'input',
        }),
        actions.props.set({
          title: 'First Name',
        }),
      ],
    },
    lastName: {
      type: InputFCC,
      actions: [
        actions.attributes.set({
          class: 'input',
        }),
        actions.props.set({
          title: 'Last Name',
        }),
      ],
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
    block: {
      type: BlockWC,
    },
  },
} as PiViewConfig;
