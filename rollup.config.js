import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { dependencies, devDependencies, peerDependencies } from './package.json'

function config(format) {
  return {
    input: 'src/index.js',
    output: {
      file: `dist/index.${format}.js`,
      format,
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: ['.jsx', '.js'],
      }),
      babel(),
    ],
    external: id =>
      (dependencies && dependencies[id]) ||
      (devDependencies && devDependencies[id]) ||
      (peerDependencies && peerDependencies[id]),
  }
}

export default ['es', 'cjs'].map(config)
