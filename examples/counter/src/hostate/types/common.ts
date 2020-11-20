/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 16:26:30
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-20 14:36:07
 */

const EMPTY_OBJ = {}

export type EmptyObj = typeof EMPTY_OBJ

export type AnyObj = Record<string, any>

export type ExcObj = Exclude<unknown, AnyObj>
