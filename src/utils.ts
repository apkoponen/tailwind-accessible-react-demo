export function isFunction(value): value is Function {
  return value && {}.toString.call(value) === "[object Function]";
}

export function isString(value): value is string {
  return typeof value === "string" || value instanceof String;
}
