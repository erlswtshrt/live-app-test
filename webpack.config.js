// Copyright 2017 Quip

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const Autoprefixer = require('autoprefixer')
const cwd = process.cwd()

function plugins() {
  let plugins = [new WriteFilePlugin()]
  return plugins
}

module.exports = {
  node: {
    fs: 'empty'
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  entry: ['core-js', 'quip-apps-compat', path.resolve(cwd, './src/root.jsx')],
  output: {
    path: path.resolve(cwd, './app/dist'),
    filename: 'app.js',
    publicPath: 'dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              require.resolve('babel-preset-env'),
              {
                corejs: 3
              }
            ],
            require.resolve('babel-preset-react-app')
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [Autoprefixer()]
              }
            }
          ]
        })
      },
      {
        test: /\.svg/,
        use: [
          {
            loader: 'svg-react-loader',
            options: {
              jsx: true
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: 'url-loader'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(cwd, 'src'),
      path.resolve(cwd, 'node_modules'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  resolveLoader: {
    modules: [
      path.resolve(cwd, 'node_modules'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  plugins: plugins(),
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    quip: 'quip',
    quiptext: 'quiptext'
  },
  devServer: {
    contentBase: path.resolve(cwd, 'app/dist'),
    // host: "docker.qa",
    port: 8888,
    inline: false
  }
}
