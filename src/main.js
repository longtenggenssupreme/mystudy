console.log("这是一个项目的js入口");
import "./css/index.css";
import "./css/index.less";
import "./css/index.scss";
import "bootstrap/dist/css/bootstrap.css";
//项目运行的js入口，主要负责各种包的导入
import $ from "jquery";
$(function() {
  $("li:odd").css("backgroundColor", "green");
  $("li:even").css("backgroundColor", "red");
});

// class Person {
//   static info = { name: "123", age: 12 };
// }
// console.log(Person.info);
