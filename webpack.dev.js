const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const InjectSourcePlugin = require("./webpack-plugin/injectSource");

module.exports = {
  mode: "development",
  entry: "./src/App.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      // 处理script
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: path.resolve(__dirname, "/node_modules/"),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      // 处理样式文件
      {
        test: /\.(css|less)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader"
          },
          "less-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      ".jsx",
      ".ts",
      ".js",
      ".json",
      ".vue",
      ".scss",
      ".css",
      ".less"
    ]
  },
  devServer: {
    host: "0.0.0.0",
    contentBase: path.join(__dirname, "public"),
    proxy: {
      // '/ugis': 'http://192.168.121.16:16550',
      "/api/ugis": "http://192.168.121.16:16550",
      "/api/uss/v1/gis": "http://192.168.121.16:16510",
      "/api/infra-udm/": "http://192.168.121.16"
    }
  },
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM"
  // },
  plugins: [
    new htmlWebpackPlugin({
      template: "public/index.html"
    }),
    // new InjectSourcePlugin({
    //   paths: ["/react-dom.development.js"]
    // })
  ]
};
