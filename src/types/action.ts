/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 16:38:09
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-15 21:05:59
 */

export interface ActionCreator<I> {
  (...args: (React.MutableRefObject<I> | unknown)[]): React.SetStateAction<I>
}

export type ActionCreatorsMapObject<I, A> = Record<keyof A, ActionCreator<I>>

export type Actions<A> = Record<keyof A, (...args: unknown[]) => void>
