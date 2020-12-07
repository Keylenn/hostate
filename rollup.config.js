/*
 * @Description:
 * @Author: hejilun
 * @Date: 2020-11-15 21:10:06
 * @LastEditors: hejilun
 * @LastEditTime: 2020-12-07 17:56:58
 */
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'

const extensions = ['.ts', '.tsx']
const external = ['react']

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: {file: 'lib/hostate.js', format: 'cjs', indent: false},
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
