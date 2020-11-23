/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 16:57:07
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-23 18:28:37
 */

import {Actions} from './action'

export interface ChiProvider {
  ({children}: {children: React.ReactNode}): JSX.Element
}

export interface ScopeStore<I, A> {
  Provider: ChiProvider
  useActions: () => Actions<A>
  useStore: () => [I, Actions<A>]
}

