/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 16:57:07
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-27 18:25:33
 */

import {Actions} from './action'

export interface ChiProvider {
  ({children}: {children: React.ReactNode}): JSX.Element
}

export interface ScopeStore<I, A, S> {
  Provider: ChiProvider
  useActions: () => Actions<A>
  useStore: () => [I, Actions<A>]
  useSubscription: <K extends keyof S>(subKey: K) => S[K]
}

