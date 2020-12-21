/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 16:26:30
 * @LastEditors: hejilun
 * @LastEditTime: 2020-12-21 13:52:46
 */

const EMPTY_OBJ = {}

export type EmptyObj = typeof EMPTY_OBJ

export type AnyObj = Record<string, any>

export type ExcObj = Exclude<unknown, AnyObj>

export interface ChiProvider {
  ({children}: {children: React.ReactNode}): JSX.Element
}

// 去除第一个元素
export type TupleTail<T extends any[]> = T extends [x: any, ...t: infer R] ? R : never
