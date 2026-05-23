export const pick = <T extends object, const K extends readonly (keyof T)[]>(
  obj: T,
  keys: K,
): Pick<T, K[number]> => {
  return Object.fromEntries(keys.map((key) => [key, obj[key]])) as Pick<T, K[number]>
}

export const omit = <T extends object, const K extends readonly (keyof T)[]>(
  obj: T,
  keys: K,
): Omit<T, K[number]> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K[number])),
  ) as Omit<T, K[number]>
}
