const InlineMap = new Map();
export const PlayContext = {
  set: (key: any, value: any) => {
    InlineMap.set(key, value);
  },
  get: (key: any) => InlineMap.get(key),
};
