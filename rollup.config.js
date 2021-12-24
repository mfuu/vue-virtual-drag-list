import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue2'
const packageJson = require('./package.json')
const version = packageJson.version
const homepage = packageJson.homepage

const bannerString = `
/*!
 * vue-virtual-drag-list v${version}
 * open source under the MIT license
 * ${homepage}
 */
`

export default {
  external: ['vue'],
  input: './src/index.js',
  output: {
    format: 'umd',
    file: './dist/index.js',
    name: 'VirtualDragList',
    sourcemap: false,
    globals: {
      vue: 'Vue'
    },
    banner: bannerString.replace(/\n/, '')
  },
  plugins: [
    vue({
      compileTemplate: true 
    }),
    babel()
  ]
}
