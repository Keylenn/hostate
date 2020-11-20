/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 16:57:07
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-20 18:36:17
 */

import {Actions} from './action'

interface ComScopeStore<A> {
  Provider: ChiProvider
  useActions: () => Actions<A>
}

export interface ScopeExcObjStore<I, A> extends ComScopeStore<A> {
  // useGetState: () => I
  useStore: () => [I, Actions<A>]
}

export interface ScopeObjStore<I, A> extends ComScopeStore<A> {
  // useGetState: <K extends keyof I | null>(subKey: K) => K extends Exclude<keyof I, null> ? I[K] : I
  useStore: <K extends keyof I | null>(subKey: K) => [K extends Exclude<keyof I, null> ? I[K] : I, Actions<A>]
}


export type SubCtxsMapObject<I, T> = Record<keyof I, React.Context<T>>

export type SubProvider<I> = React.Provider<I[keyof I]>



/**2.0.0 */

export interface ChiProvider {
  ({children}: {children: React.ReactNode}): JSX.Element
}

export interface ScopeStore<I, A> {
  Provider: ChiProvider
  useActions: () => Actions<A>
  useStore: () => [I, Actions<A>]
}

