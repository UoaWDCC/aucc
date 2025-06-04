/**
 * Convert fields that are number | string to just string,
 * while preserving pure number fields and number | null | undefined fields
 * @param T - The type to transform
 * @returns The transformed type with number | string fields converted to string
 */

export type NoNumber<T> = {
  [K in keyof T]: T[K] extends (infer U)[] // Handle Array Types
    ? [U] extends [number | null | undefined] // If element type U (as a whole) is purely NNU
      ? T[K] // Then preserve the original array structure (T[K])
      : Exclude<U, number>[] // Else, remove 'number' from the element type U
    : // Handle Non-Array Types
      [T[K]] extends [number | null | undefined] // If T[K] (as a whole) is purely NNU
      ? T[K] // Then preserve T[K]
      : Exclude<T[K], number> // Else, remove 'number' from T[K]
}
