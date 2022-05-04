export function isNotNull<T>(el: T | null | undefined): el is T {
  return !!el;
}