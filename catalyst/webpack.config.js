// webpack.config.js
const Dotenv = require('dotenv-webpack');
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
console.log("Webpack config is being used");

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },  
  mode: 'development',  
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },  
  resolve: {
    fallback: {
      "os": require.resolve("os-browserify") ,
      "crypto": require.resolve("crypto-browserify"),
      "path": require.resolve("path-browserify"),

    },
  },    // https://hashinteractive.com/blog/complete-guide-to-webpack-configuration-for-react/
  plugins: [
    new Dotenv(),
    new NodePolyfillPlugin(),
    // any other plugins you have
  ],
  
};

