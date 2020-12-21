const EMPTY_OBJ = {}

export type EmptyObj = typeof EMPTY_OBJ

export type AnyObj = Record<string, any>

export type ExcObj = Exclude<unknown, AnyObj>

export interface ChiProvider {
  ({children}: {children: React.ReactNode}): JSX.Element
}
