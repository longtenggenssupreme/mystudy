## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 新建文件 study

1、然后在 study 下新建 index.html 和 main.js 主界面和注入口
2、可以在 index.html 添加需要的内容 本例中写了一个列表 和 main.js 添加需要的 js 内容

# 选择 study 在终端中打开，初始化 npm 包管理器配置，添加 package.json 文件

1、在终端中输入 ： npm init -y
2、package.json 文件中主要是配置 npm 运行的一些自定义指令的缩写和一些 npm 安装的依赖包
例如：package.json 文件中 scripts 中就是自定义指令的缩写

# 测试

1、在 vs 插件中搜索并安装 open in browser 这个插件是运行 index.html 文件的
2、选择 index.html 右键 open in default browser 就可以看到 index.html 的内容了
3、在 main.js 添加内容，并在 index.html 引入 srcipt 的 main.js 脚本
4、npm i jquery -D 安装 jquery 包来设置列表的样式，偶数和奇数行的背景颜色
运行 index.html 可以 console 控制台报错，
错误：Uncaught SyntaxError: Cannot use import statement outside a module
意思就说我们在 main.js 中使用的 es6 的语法，浏览器无法识别，所以我们要借助一个工具来转换成浏览器可以识别的语法，这个工具就是 webpack，npm i webpack -D 安装 webpack， 运行 webpack
webpack 运行格式 : webpack 要转换的 js 转换以后的 js
本文的运行终端中输入：
webpack .\src\main.js .\dist\bundle.js
如果报错的话，就是添加-o 输入 webpack .\src\main.js -o .\dist\bundle.js --mode development
5、运行 indexl.html 这是有效果了，但是只要我一改变 mian.js 的内容就要重新运行 webpack .\src\main.js -o .\dist\bundle.js --mode development
这样太麻烦了，可以使用 webpack-dev-server 工具来帮我们自动去
生成对应的 bundle.js。这样只要我们一修改，就可以看到效果了
npm 安装 npm i webpack-dev-server -D
安装 webpack-dev-server 之后需创建 webpack.config.js 的文件
配置 webpack 的一些需要转换的 js 内容

webpack.config.js 内容如下
//这里是配置 webpack 相关信息
const path = require("path");
module.exports = {
entry: path.join(**dirname, "./src/main.js"),
output: {
path: path.join(**dirname, "./dist"),
filename: "bundle.js"
}
};

在 package.json 中的 acript 中配置 dev 指令
"dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
这句话的意思是直接运行 npm run dev 就可以直接使用 web-dev-pack 指令来生成可执行的 js 文件
这句话也可以使用 webpack.config.js 配置来配置，具体配置
1、webpack.config.js 中添加如下内容
//这里是配置 webpack 相关信息
const path = require("path");
const webpack = require("webpack");
module.exports = {
entry: path.join(**dirname, "./src/main.js"),
output: {
path: path.join(**dirname, "./dist"),
filename: "bundle.js"
},
devServer:{
open:true,
port:3000,
contentBase:'src',
hot:true
},
plugins:[
new webpack.HashedModuleIdsPlugin()
]
};

webpack.config.js 中的配置也可以替换
package.json 中的 acript 中配置 dev 指令
"dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"

2、那么既然 js 可以转换，那么 index.html 应该也可以转换,需要用到 html-webpack-plugin 插件，
终端中添加 html-webpack-plugin 插件
npm i html-webpack-plugin -D
修改 webpack.config.js 中的配置，添加
const htmlwebpackplugin = require("html-webpack-plugin");
plugins 中添加
new htmlwebpackplugin({
template: path.join(\_\_dirname, "./src/index.html"),
filename: "index.html"
})
注意：html-webpack-plugin 会自动添加 bundle.js 文件，所以 index.html 中就不需要在添加<!-- <script src="/bundle.js"></script> -->

3、那么既然 js 可以转换，同理 css 应该也可以转换，要是用 css 转的话，需要使用 css-loader 和 style-loader 来配置即可
在 src 文件夹下新建 css 文件，然后在 css 文件夹下新建样式文件 index.css 文件，然后终端中添加 css-loader 插件
npm i style-loader css-loader -D
修改 webpack.config.js 中的配置，添加 module: {
// 该模块中是添加配置第三方的 file type 的 loader 加载器的以及匹配规则
rules: [ //css 匹配规则
{ test: /\.css\$/, use: ["style-loader", "css-loader"] }, // css 样式的 filetype 的 loader
]
}

4、less 样式，和 css 一样，只不过是使用使用 style-loader css-loader 的同时还要
使用 less-loader，安装 npm i less-loader -D，
安装完 less-loader 时，会提示需要安装 less，那么继续安装 less
npm i less -D
之后在 rules 中配置
{ test: /\.css\$/, use: ["style-loader", "css-loader", "less-loader"] } // less 样式的 filetype 的 loader

5、scss 样式，和 css less 也是一样，只不过是使用使用 style-loader css-loader 的同时还要
使用 sass-loader，
注意： 这里不是 scss-loader 了而是 sass-loader，
同时注意，安装 sass-loader 的时候需要安装 node-sass，这个 nod-sass 不建议使用 npm 安装，建议使用 cnpm 进行安装，那么就需要先安装 cnpm
建议全局安装 cnpm 即在 cmd 中安装 npm -i cnpm -g
然后在回到当前项目中执行下面的指令
cnpm i sass-loader -D，会提示需要安装 node-sass，
然后安装
cnpm i node-sass -D，
最后在 rules 中配置
{ test: /\.css\$/, use: ["style-loader", "css-loader", "sass-loader"] } // scss 样式的 filetype 的 loader

## 注意

注意，在上述安装的过程中，其实我们可以现在 cmd 中全局安装 npm i nrm -g
这句话的意思是安装了 nrm 我们就可以设置安装包的镜像，也就是说我们需要从就近的源码包下载，不需要从原来的的官网去下载包，
nrm ls ---查看镜像来源，镜像可以设置淘宝，或者 cnpm 都可以，这两个是国内的
nrm use 镜像源名称 ---设置 npm 包下载的镜像
然后可以全局安装 cnpm
npm i cnpm -g ---cnpm 也是一个 npm 安装工具，这个使用的室国内的镜像源

6、添加图片背景时，需要使用 url-loader 来进行文件的 loader
image 样式使用 url-loader file-loader
安装 npm i url-loader file-loader -D，
之后在 rules 中配置
{
test: /\.(png|jpg|jpeg|bmp|git)\$/,
use: "url-loader?limit=5998&name=[hash:8]-[name].[ext]"
}
//图片的设置?limit=5998&name=[hash:8]-[name].[ext]
//参数设置，和 http 的 url 的 query 地址中的请求一样，
//limit 限制图片的大小，下一这个图片字节的页面渲染时是 base64，大于等于则是 URL 地址
//name 是名字，一旦图片超出限制，会显示图片的 hash 值命名的名字，但 name 如果想要显示名字和扩展名的话，就要设置 name=[name].[ext]
//但是设置了 name=[name].[ext]这种形式会导致图片的覆盖，如果有两张一样名字的图片的话，name 第一张图片第二张图片覆盖
//谪仙人不是我们想要的，要想既显示图片名称和扩展名，又不想备后面的重名字的图片覆盖掉，可以以
//使用 name=[hash:8]-[name].[ext]，shah 值默认是 32 位的，我们可以支取前 8 位加上图片名称和扩展名，这样就解决了重名字被覆盖的问题，
//同时有解决的我们想要名字和扩展名的问题了

7、添加图标和字体时，需要使用 url-loader 来进行文件的 loader
字体 样式使用 url-loader，已经安装过了不需要安装，只需要设置 rules 中配置
{ test: /\.(eot|ttf|svg|woff|woff2)\$/, use: "url-loader" },

8、webpack 翠玉一些 es6 或者更高额语言，如 es7 或者 es8 时，webpack 就处理不了了，这时候可以使用 babel 来吧更高级的语言转换成低级语言处理
下面两套工具处理
第一套：npm i babel-core babel-loader babel-plugin-transform-runtime -D
第二套
npm i babel-preset-env babel-preset-stage-0 -D

使用 babel-loader 来进行 js 文件的 loader 需要设置 rules 中配置
//babel-loader 处理 es6 已经更高级的怨言编写的 js 文件
{
test: /\.js\$/,
use: "babel-loader",
exclude: /node_modules/
}

在根目录下新建 .babelrc 的 json 格式的文件
内容：
{
"presets":[],
"plugins":[]
}
