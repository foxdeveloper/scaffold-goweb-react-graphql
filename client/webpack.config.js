const path = require('path');

// Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const env = process.env;

module.exports = {
  mode: `${env.NODE_ENV ? env.NODE_ENV : 'production'}`,
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    writeToDisk: true,
  },
  module: {
    rules: [{
      test: /\.s(a|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {}
        },
        {
          loader: "resolve-url-loader",
          options: {}
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    }, {
      test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: '/resources/'
        }
      }]
    }, {
      test: /\.(t|j)sx?$/,
      exclude: /node_modules/,
      loaders: ['ts-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].css"
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      favicon: "./src/resources/favicon.png",
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/resources/config.sample.js', to: 'config.js' },
      ],
    }),
  ]
}