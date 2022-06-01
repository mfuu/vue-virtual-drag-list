import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonJs from 'rollup-plugin-commonjs'
const packageJson = require('./package.json')
const version = packageJson.version
const homepage = packageJson.homepage

const banner = `
/*!
 * vue-virtual-drag-list v${version}
 * open source under the MIT license
 * ${homepage}
 */
`

export default [
  {
    external: ['vue'],
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: 'dist/draglist.js',
      name: 'VirtualDragList',
      sourcemap: false,
      globals: {
        vue: 'Vue'
      },
      banner: banner.replace(/\n/, '')
    },
    plugins: [
      babel(),
      resolve(),
      commonJs()
    ]
  },
  {
    external: ['vue'],
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: 'dist/draglist.min.js',
      name: 'VirtualDragList',
      sourcemap: false,
      globals: {
        vue: 'Vue'
      },
      banner: banner.replace(/\n/, '')
    },
    plugins: [
      babel(),
      uglify(),
      resolve(),
      commonJs()
    ]
  }
]
