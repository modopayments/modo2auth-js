const fs = require('fs')
const path = require('path')

const getDirs = p =>
  fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())

const resolveAlias = getDirs(path.resolve(__dirname)).reduce((acc, name) => {
  acc[name] = path.resolve(__dirname, `/${name}/`)

  return acc
}, {})

module.exports = () => {
  console.log('*****************') // eslint-disable-line
  console.log('modo2auth-js: umd') // eslint-disable-line
  console.log('*****************') // eslint-disable-line

  const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

  return {
    entry: [path.resolve(__dirname, 'src/index.js')],
    // target: 'node',
    output: {
      filename: 'modo2auth.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'Modo2Auth',
      libraryTarget: 'umd',
    },
    mode,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      alias: resolveAlias,
    },
  }
}
