(() => ({
  schema: v.pipe(
    v.object({
      bool1: v.pipe(v.boolean(), v.title('bool1-label')),
      input1: v.pipe(
        v.string(),
        v.title('input1-label'),
        disableWhen({
          listen: (fn) =>
            fn({ list: [['#', 'bool1']] }).pipe(map(({ list }) => !list[0])),
        }),
      ),
      input2: v.pipe(
        v.string(),
        v.title('input2-label'),
        hideWhen({
          listen: (fn) =>
            fn({ list: [['#', 'bool1']] }).pipe(map(({ list }) => list[0])),
        }),
      ),
    }),
    setComponent('fieldset'),
  ),
}))();
