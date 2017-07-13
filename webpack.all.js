const path = require('path')
const webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')

var config = {
  devtool: 'source-map',
  entry: {
    corejs: 'core-js',
    index_bundle: './client/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/public/'
  },
  resolve: { // this makes npm link work
    symlinks: false
  },
  module: {
        
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client'),
          path.resolve(__dirname, 'node_modules', 'napchart-canvas')
        ],
        // exclude: /.*node_modules((?!napchart-canvas).)*$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['transform-decorators-legacy']
          }
        }]
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }, 
    ]
  },
}

if(process.env.NODE_ENV == 'production'){
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: false}),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
} else {
  // development
  delete config.entry.corejs
}

module.exports = config
// 