const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ]
  },
  // devServer: {
  //   historyApiFallback: true,
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/src/index.html",
      filename: "./index.html"
    })
  ]
};