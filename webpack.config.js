const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "development",

  entry: "./src/index.ts",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      { test: /\.ts$/, use: "ts-loader", exclude: /node-module/ },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      title: "View",
    }),
  ],

  resolve: {
    extensions: [".ts", ".js"]
  },
};
