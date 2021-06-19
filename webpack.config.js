var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
// const webpack = require("webpack");
// I think theoretically this is a worse solution than
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const mainConfig = {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "SPA",
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/404.html", to: "404.html" },
        { from: "./src/data/icons", to: "./src/data/icons" },
        { from: "./src/data/objMaterials", to: "./src/data/objMaterials" },
        { from: "./src/data/objFiles", to: "./src/data/objFiles" },
        {
          from: "./src/data/objFilesCompressed",
          to: "./src/data/objFilesCompressed",
        },
        {
          from: "./src/data/highResHeatMaps",
          to: "./src/data/highResHeatMaps",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: "file-loader",
        options: {
          name(resourcePath, resourceQuery) {
            // `resourcePath` - `/absolute/path/to/file.js`
            // `resourceQuery` - `?foo=bar`
            return "[path][name].[ext]";
          },
        },
      },
      {
        test: /\.(obj|mtl)$/,
        loader: "file-loader",
        options: {
          name(resourcePath, resourceQuery) {
            // `resourcePath` - `/absolute/path/to/file.js`
            // `resourceQuery` - `?foo=bar`
            return "[path][name].[ext]";
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  name: "main",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    globalObject: "this",
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    historyApiFallback: true,
  },
};

const offscreenConfig = {
  name: "offscreen",
  entry: "./src/OffScreenCanvas/OffScreenCanvas.worker.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "offscreen.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

module.exports = [mainConfig, offscreenConfig];
