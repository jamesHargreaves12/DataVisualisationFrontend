var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const baseConfig = {};

const mainConfig = {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Application name",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ["file-loader"],
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
  },
};

export const offscreenConfig = {
  name: "offscreen",
  entry: "./src/OffScreenCanvas/OffScreenCanvas.worker.ts",
  output: {
    path: path.resolve(__dirname, "./dist/offscreen"),
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
