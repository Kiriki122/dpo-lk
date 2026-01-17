export type ObjectPropertyPaths<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : T[K] extends object ? ObjectPropertyPaths<T[K]> : never;
}[keyof T];
