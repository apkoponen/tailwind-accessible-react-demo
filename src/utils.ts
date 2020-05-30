export function isFunction(
  //@ts-ignore
  value: any
): value is Function {
  return value && {}.toString.call(value) === "[object Function]";
}

export function isString(
  //@ts-ignore
  value: any
): value is string {
  return typeof value === "string" || value instanceof String;
}
