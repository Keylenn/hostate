const EMPTY_OBJ = {}

export type EmptyObj = typeof EMPTY_OBJ

export interface ChiProvider {
  ({children}: {children: React.ReactNode}): JSX.Element
}

export type TupleTail<T extends any[]> = ((...t: T) => void) extends (x: any, ...t: infer R) => void ? R : T
