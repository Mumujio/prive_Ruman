const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[contenthash].bundle.js",
  },
  devtool: "source-map",

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "../public/static"), to: "static" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      // CSS
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },
      // MP3
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/audios/",
            },
          },
        ],
      },
      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },
      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: "asset/source",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },
    ],
  },
};
