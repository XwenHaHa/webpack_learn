const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log("process.env.NODE_ENV=", process.env.NODE_ENV);

const config = {
  mode: "development", // 模式
  entry: "./src/index.js", // 打包入口文件
  output: {
    filename: "bundle.js", // 输出文件名
    path: path.join(__dirname, "dist"), // 输出文件路径
  },
  module: {
    rules: [
      //转换规则
      {
        test: /\.(s[ac]|c)ss$/i, // 匹配所有sass/scss/css文件
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ], // use:对应的loader名称
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(), // 引入目录清空插件
    new MiniCssExtractPlugin({
      // 引入css插件
      filename: "[name].[hash:8].css",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "public"), // 静态文件目录
    compress: true, // 是否开启gzip压缩
    port: 8080, // 端口号
  },
};

module.exports = (env, argv) => {
  console.log("argv.mode=", argv.mode); // 打印mode
  return config;
};
