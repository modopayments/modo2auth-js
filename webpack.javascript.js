const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

const getDirs = p =>
  fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())

const resolveAlias = getDirs(path.resolve(__dirname)).reduce((acc, name) => {
  acc[name] = path.resolve(__dirname, `/${name}/`)

  return acc
}, {})

module.exports = () => {
  console.log('*****************') // eslint-disable-line
  console.log('modo-auth: javascript') // eslint-disable-line
  console.log('*****************') // eslint-disable-line

  const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

  return {
    entry: [path.resolve(__dirname, 'src/index_javascript_build.js')],
    output: {
      filename: 'modo2Auth.js',
      path: path.resolve(__dirname, '../javascript/'),
      libraryTarget: 'var',
      library: 'Modo2Auth',
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
    stats: {
      colors: true,
    },
    resolve: {
      alias: resolveAlias,
    },
  }
}
