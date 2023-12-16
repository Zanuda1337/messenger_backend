export const filterObject = <T extends Record<string, any>>(
  object: T
): T => {
  const obj: Record<string, any> = {};
  Object.entries(object)
    .filter(([key, value]) => value !== undefined)
    .forEach(([key, value]) => {
      if (value !== 'string') return;
      obj[key] = value;
    });
  return obj as T;
};
