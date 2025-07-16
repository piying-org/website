const InlineMap = new Map();
export const PlayContext = {
  set: (key: any, value: any) => {
    InlineMap.set(key, value);
  },
  get: (key: any) => {
    return InlineMap.get(key);
  },
};
