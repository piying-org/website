import { actions, PiViewConfig, PiyingViewGroup } from '@piying/view-angular';
import { FieldsetFGC } from './fieldset/component';
import { ButtonLinkComponent } from './link/component';
import { ValidWC } from './wrapper/valid/component';
import { DropdownComponent } from './dropdown/component';
import { FormlyFieldWC } from './wrapper/formly-field-wrapper/component';
import { JoinItemWC } from './wrapper/join-wrapper/component';
import { PanelWC } from './wrapper/panel-wrapper/component';
import { TooltipWC } from './wrapper/tooltip/component';
import { JsonSchemaLabelWC } from './wrapper/json-schema-label/component';
import { DivNFCC } from './block';
import { DemoNFCC } from './demo';
import { SelectorlessNFCC } from './selector-less';
import { BlockWC } from './wrapper/block/component';
import * as FCCGroup from '@piying-lib/angular-daisyui/field-control';
import { setComponent } from '@piying/view-angular-core';
const LazyRestGroup = () =>
  import('./group/rest-group/component').then((item) => item.default);
const selectActions = [
  setComponent(FCCGroup.SelectFCC),
  actions.wrappers.set([{ type: 'label' }]),
  actions.inputs.mapAsync((field) => {
    let props = field.props;
    return (value) => {
      return { options: props()['options'], ...value };
    };
  }),
];
export const FieldGlobalConfig = {
  types: {
    string: {
      type: FCCGroup.InputFCC,
    },
    number: {
      type: FCCGroup.InputFCC,
      actions: [
        actions.inputs.patch({
          type: 'number',
        }),
      ],
    },
    radio: {
      type: () =>
        import('@piying-lib/angular-daisyui/field-control').then(
          (a) => a.RadioFCC,
        ),
    },
    boolean: {
      actions: [
        setComponent(FCCGroup.CheckboxFCC),
        actions.wrappers.set([{ type: 'label' }]),
      ],
    },
    checkbox: {
      actions: [
        setComponent(FCCGroup.CheckboxFCC),
        actions.props.set({
          hideTitle: true,
        }),
      ],
    },
    fieldset: {
      type: FieldsetFGC,
    },
    toggle: {
      actions: [setComponent(FCCGroup.ToggleFCC)],
    },
    picklist: {
      actions: selectActions,
    },
    multiselect: {
      actions: [...selectActions, actions.inputs.set({ multiple: true })],
    },
    'multiselect-repeat': {
      actions: [...selectActions, actions.inputs.set({ multiple: true })],
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
      type: FCCGroup.RatingFCC,
      actions: [
        actions.wrappers.set([{ type: 'label' }]),
        actions.inputs.patch({ max: 6 }),
      ],
    },
    range: {
      type: FCCGroup.RangeFCC,
    },
    fileInput: {
      type: FCCGroup.FileInputFCC,
    },
    textarea: {
      type: FCCGroup.TextareaFCC,
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
      actions: [
        ...selectActions,
        actions.attributes.set({
          placeholder: 'Please Select',
        }),
        actions.props.set({
          title: 'Salutation',
        }),
        actions.inputs.set({
          options: ['Mr.', 'Ms.', 'Dr.', 'Dude'],
        }),
      ],
    },
    firstName: {
      type: FCCGroup.InputFCC,
      actions: [
        actions.props.set({
          title: 'First Name',
        }),
      ],
    },
    lastName: {
      type: FCCGroup.InputFCC,
      actions: [
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
