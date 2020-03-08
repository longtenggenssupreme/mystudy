//这里是配置webpack相关信息
const path = require("path");
const webpack = require("webpack");
const htmlwebpackplugin = require("html-webpack-plugin");
module.exports = {
  entry: path.join(__dirname, "./src/main.js"),
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js"
  },
  devServer: {
    open: true,
    port: 3000,
    contentBase: "src",
    hot: true
  },
  plugins: [
    // 该模块中是添加配置插件的
    new webpack.HashedModuleIdsPlugin(),
    new htmlwebpackplugin({
      template: path.join(__dirname, "./src/index.html"),
      filename: "index.html"
    })
  ],
  module: {
    // 该模块中是添加配置第三方的file type的loader加载器的以及匹配规则
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] }, // css样式的filetype的loader
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] }, // less样式的filetype的loader
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }, // scss样式的filetype的loader
      { test: /\.(eot|ttf|svg|woff|woff2)$/, use: "url-loader" }, // 字体样式的filetype的loader
      //   { test: /\.(png|jpg|jpeg|bmp|git)$/, use: "url-loader" } // url图片格式filetype的loader
      {
        test: /\.(png|jpg|jpeg|bmp|git)$/,
        use: "url-loader?limit=98&name=[hash:8]-[name].[ext]"
      }
      //   //babel-loader处理es6已经更高级的怨言编写的js文件
      //   {
      //     test: /\.js$/,
      //     use: "babel-loader",
      //     exclude: /node_modules/
      //   }
      //图片的设置?limit=5998&name=[hash:8]-[name].[ext]
      //参数设置，和http的url的query地址中的请求一样，
      //limit限制图片的大小，下一这个图片字节的页面渲染时是base64，大于等于则是URL地址
      //name是名字，一旦图片超出限制，会显示图片的hash值命名的名字，但name如果想要显示名字和扩展名的话，就要设置name=[name].[ext]
      //但是设置了name=[name].[ext]这种形式会导致图片的覆盖，如果有两张一样名字的图片的话，name第一张图片第二张图片覆盖
      //谪仙人不是我们想要的，要想既显示图片名称和扩展名，又不想备后面的重名字的图片覆盖掉，可以以
      //使用name=[hash:8]-[name].[ext]，shah值默认是32位的，我们可以支取前8位加上图片名称和扩展名，这样就解决了重名字被覆盖的问题，
      //同时有解决的我们想要名字和扩展名的问题了
    ]
  }
};
