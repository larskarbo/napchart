const path = require('path')
const webpack = require('webpack')

var config = {
  devtool: 'source-map',
  entry: './lib/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'napchart.min.js',
    library: 'Napchart',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'buble-loader',
          options: {
            objectAssign: 'Object.assign'
          }
        }]
      }
    ]
  }
}

if (process.env.NODE_ENV == 'production') {
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: false})
  ]
}

module.exports = config
