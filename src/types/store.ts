/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 16:57:07
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-15 21:05:41
 */

import {Actions} from './action'

interface ComScopeStore<A> {
  Provider: ChiProvider
  useActions: () => Actions<A>
}

export interface ScopeExcObjStore<I, A> extends ComScopeStore<A> {
  useGetState: () => I
}

export interface ScopeObjStore<I, A> extends ComScopeStore<A> {
  useGetState: <K extends keyof I | null>(subKey: K) => K extends Exclude<keyof I, null> ? I[K] : I
}

export interface ChiProvider {
  ({children}: {children: React.ReactNode}): JSX.Element
}

export interface ComposeStores<T> {
  Provider: ChiProvider
  useStoreByKey: (key: keyof T) => unknown
  useActionsByKey: (key: keyof T) => unknown
}

export type SubCtxsMapObject<I, T> = Record<keyof I, React.Context<T>>

export type SubProvider<I> = React.Provider<I[keyof I]>
