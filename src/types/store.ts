import {TupleTail, ChiProvider} from './common'
import {TscopeStore} from '../createScopeStore'

export interface ActionCreator<I> {
  (...args: any[]): React.SetStateAction<I> | Promise<React.SetStateAction<I> | void> | void
}

export type ActionCreatorsMapObject<I, A> = Record<keyof A, ActionCreator<I>>

export type Actions<I, A extends ActionCreatorsMapObject<I, A>> = {
  [P in keyof A]: (...args: TupleTail<Parameters<A[P]>>) => void
}

export type SubCtsxMapObject<S, T> = {[P in keyof S]: React.Context<T>}

export interface ScopeStore<I, A extends ActionCreatorsMapObject<I, A>, S extends Record<string, (state: I) => any>> {
  Provider: ChiProvider
  useActions: () => Actions<I, A>
  useStore: () => [I, Actions<I, A>]
  useSubscribe: <K extends keyof S>(subKey: K) => ReturnType<S[K]>
}

export interface CompScopeStore<T extends Record<string, TscopeStore>> {
  Provider: ChiProvider
  useStoresByKey: <K extends keyof T>(key: K) => ReturnType<T[K]['useStore']>
  useActionsByKey: <K extends keyof T>(key: K) => ReturnType<T[K]['useActions']>
}
