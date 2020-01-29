const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  env = env || {};

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    //entry: ['@babel/polyfill', './src/index.js'],
    entry: [
      "./src/index.tsx"
    ],
    devtool: "source-map",
    resolve: {
      "extensions": [
        ".ts",
        ".tsx",
        ".js"
      ],
      "modules": [
        "./node_modules"
      ]
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [{
            loader: "ts-loader"
          }]
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
          exclude: [
            /\/node_modules\//
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.json$/,
          loader: 'file-loader',
          type: 'javascript/auto',
          options: {
            name: '[name].[ext]'
          },
        }
      ]
    },
    devServer: {
      proxy: {
        '/api': 'http://localhost:3001'
      },
      historyApiFallback: true,
      publicPath: '/',
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
        favicon: "./public/favicon.ico",
        publicPath: "./dist"
      }),
    ]
  }
};
