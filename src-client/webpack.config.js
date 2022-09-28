const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index0.ts',
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      jquery: 'jquery/src/jquery',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './html/template.html'),
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
