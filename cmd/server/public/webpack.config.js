const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

// Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const env = process.env;

module.exports = {
  mode: `${env.NODE_ENV ? env.NODE_ENV : 'production'}`,
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [{
      test: /\.(s*)css$/,
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
    },{
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/fonts/'
        }
      }]
    },{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    },{
      test: /\.(yaml)|(yml)$/,
      use: [
        {
          loader: 'json-loader'
        },
        {
          loader: 'yaml-loader'
        }
      ],
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    htmlPlugin
  ]
}
