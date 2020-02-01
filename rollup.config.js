const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')

const { include } = require('./include')

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/umd/puzzlescript.min.js',
    format: 'umd',
    name: 'PuzzleScript',
    sourcemap: true,
    strict: false
  },
  plugins: [
    commonjs(),
    terser({
      compress: {
        hoist_funs: true
      }
    }),
    include()
  ]
}
