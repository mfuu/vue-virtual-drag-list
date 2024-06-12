import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';

const packageJson = require('./package.json');
const version = packageJson.version;
const homepage = packageJson.homepage;

const banner = `
/*!
 * vue-virtual-drag-list v${version}
 * open source under the MIT license
 * ${homepage}
 */
`;

export default {
  external: ['vue'],
  input: 'src/index.js',
  output: [
    {
      format: 'umd',
      file: 'dist/virtual-drag-list.js',
      name: 'VirtualList',
      sourcemap: false,
      globals: {
        vue: 'Vue',
      },
      banner: banner.replace(/\n/, ''),
    },
    {
      format: 'umd',
      file: 'dist/virtual-drag-list.min.js',
      name: 'VirtualList',
      sourcemap: false,
      globals: {
        vue: 'Vue',
      },
      banner: banner.replace(/\n/, ''),
      plugins: [terser()],
    },
  ],
  plugins: [babel(), resolve(), commonJs()],
};
