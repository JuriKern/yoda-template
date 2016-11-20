const webpack = require("webpack");

module.exports = {
  context: __dirname + "/src/components",
  entry: "./app.js",

  output: {
    filename: "bundle.js",
    path: __dirname + "/build",
    publicPath: "http://localhost:3020/build/"
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.css$/, loaders: ["style", "css"] },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "url-loader" },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] }
    ]
  }
}