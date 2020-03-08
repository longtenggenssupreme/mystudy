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

在package.json中的acript中配置dev 指令
    "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
    这句话的意思是直接运行npm run dev 就可以直接使用web-dev-pack指令来生成可执行的js文件
这句话也可以使用webpack.config.js配置来配置，具体配置
1、webpack.config.js 中添加如下内容