/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 21:10:06
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-16 22:20:01
 */
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const extensions = ['.ts', '.tsx']
const external = ['react']

const noDeclarationFiles = {compilerOptions: {declaration: false}}

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: {file: 'lib/hostas.js', format: 'cjs', indent: false},
    external,
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({useTsconfigDeclarationDir: true}),
      babel({
        extensions,
        runtimeHelpers: true,
      }),
    ],
  },
]
