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
  console.log('modo2auth-node') // eslint-disable-line
  console.log('*****************') // eslint-disable-line

  const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

  return {
    entry: [path.resolve(__dirname, 'src/index.js')],
    target: 'node',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist/'),
    },
    plugins: [new CleanWebpackPlugin()],
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
