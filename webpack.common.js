const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// style stuff
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// webpack plugins
const webpack = require('webpack')

/*
  Entrypoint: the main index file of the app and the main style file
*/
const entry = {
  'main': ['@babel/polyfill', './src/index.js', './src/site.scss']
}

/*
  Output: name of the file(s) webpack builds
  and the location of the file
*/
const output = {
  path: path.join(__dirname, '/dist'),
  filename: 'index_bundle.js'
}

/*
  Rules: which files are transformed by which loaders
*/

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.scss/,
    exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ]
  }
]

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new MiniCssExtractPlugin({
    filename: 'style.css'
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer()
      ]
    }
  })
]

/*
  Resolve: for aliases (making imports a bit simpler)
*/
const resolve = {
  alias: {
    components: path.resolve(__dirname, './src/components'),
  }
}

module.exports = {
  entry: entry,
  output: output,
  plugins: plugins,
  resolve: resolve,
  module: {
    rules: rules
  }
}
