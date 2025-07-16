(() => ({
  schema: v.pipe(
    v.object({
      input1: v.pipe(v.string(), v.title('input1-label')),
      num1: v.pipe(v.number(), v.title('num1-label')),
      bool1: v.pipe(v.boolean(), v.title('bool1-label')),
    }),
    setComponent('fieldset'),
  ),
}))();
