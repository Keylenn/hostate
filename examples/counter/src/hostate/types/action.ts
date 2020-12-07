/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 16:38:09
 * @LastEditors: hejilun
 * @LastEditTime: 2020-12-07 17:48:33
 */

export interface ActionCreator<I> {
  (...args: any[]): React.SetStateAction<I> | Promise<React.SetStateAction<I>>
}

export type ActionCreatorsMapObject<I, A> = Record<keyof A, ActionCreator<I>>

export type Actions<A> = Record<keyof A, (...args: unknown[]) => void>

