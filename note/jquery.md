# jQuery

## 一、通过CDN内容分发网络引用jQuery

    <script src="http://libs.baidu.com/jquery/1.10.2/jquery.min.js">

## 二、语法

### 1、基础语法：

     $(selector).action()

### 2、文档就绪事件：

``````javascript
 $(document).ready(function(){

   // 开始写 jQuery 代码...

 });
 ``````

 或者：

 ``````javascript
  $(function(){

   // 开始写 jQuery 代码...

 });
 ``````

### 3、jQuery选择器

 几个需要注意的选择器：

 `$("ul li:first")`：选取第一个`<ul>`元素的第一个 `<li>` 元素

 `$("ul li:first-child")`：选取每个`<ul>`元素的第一个`<li>`元素

 `$(":button")`：选取type="button"的`<input>元素`和`<button>元素`

### 4、jQuery事件

#### 比较keypress、keydown与keyup

**keydown：** 在键盘上按下某键时发生，一直按着则会不断触发（opera浏览器除外），它返回的是键盘代码;

**keypress：** 在键盘上按下一个按键，并产生一个字符时发生, 返回ASCII码。<br>
**注意:** shift、alt、ctrl等键按下并不会产生字符，所以监听无效，换句话说，只有按下能在屏幕上输出字符的按键时keypress事件才会触发。若一直按着某按键则会不断触发。

**keyup：** 用户松开某一个按键时触发，与keydown相对，返回键盘代码.

### 5、jQuery效果

#### 1）隐藏和显示

方法：hide show toggle <br>
两个参数：(speed, callback) <br>
speed取值："slow"、"fast" 或毫秒

#### 2）淡入和淡出

方法：fadeIn fadeOut fadeToggle <br>
两个参数：(speed, callback) <br>

方法：fadeTo <br>
三个参数：(speed, opacity, callback) <br>

speed取值："slow"、"fast" 或毫秒 <br>
opacity取值：0-1 其中，0为透明

#### 3）滑动

方法：slideDown slideUp slideToggle <br>
两个参数：(speed, callback) <br>
speed取值："slow"、"fast" 或毫秒

#### 4）动画

方法：animate

    $(selector).animate({params},speed,callback);

##### 其中，params是必需的：

``````javascript
$("button").click(function(){
  $("div").animate({
    left:'250px',
    opacity:'0.5',
    height:'150px',
    width:'150px'
  });
});
``````

**注意：** 必须使用 Camel 标记法书写所有的属性名，比如，必须使用 `paddingLeft` 而不是 `padding-left`，使用 `marginRight` 而不是 `margin-right`，等等。

##### 使用相对值

在需要的值前面加上 `+=` 或者 `-=`

``````javascript
$("button").click(function(){
  $("div").animate({
    left:'250px',
    height:'+=150px',
    width:'+=150px'
  });
});
``````

##### 使用预定义值

可以把属性的动画值设置为 "show"、"hide" 或 "toggle"：

``````javascript
$("button").click(function(){
  $("div").animate({
    height:'toggle'
  });
});
``````

##### 队列功能

``````javascript
$("button").click(function(){
  var div=$("div");
  div.animate({height:'300px',opacity:'0.4'},"slow");
  div.animate({width:'300px',opacity:'0.8'},"slow");
  div.animate({height:'100px',opacity:'0.4'},"slow");
  div.animate({width:'100px',opacity:'0.8'},"slow");
});
``````

#### 5）停止动画

方法：stop

     $(selector).stop(stopAll,goToEnd);

可选的 `stopAll` 参数规定是否停止被选元素的所有加入队列的动画。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。

可选的 `goToEnd` 参数规定是否立即完成当前动画。默认是 false。

因此，默认地，stop() 会清除在被选元素上指定的当前动画。

#### 6）Callback方法

在hide方法实现后，调用传入的callback方法。

``````javascript
$("button").click(function(){
  $("p").hide("slow",function(){
    alert("The paragraph is now hidden");
  });
});
``````

#### 7）Chaining

允许在相同的元素上运行多条jQuery命令，一条接着另一条。

``````javascript
$("#p1").css("color","red")
  .slideUp(2000)
  .slideDown(2000);
``````

### 6、jQery HTML

#### 1）jQuery 获取

##### 获得内容 - text()、html() 以及 val()

text() - 设置或返回所选元素的`文本内容` <br>
html() - 设置或返回所选元素的`内容`（包括 HTML 标记）<br>
val() - 设置或返回表单字段的`值` <br>

``````javascript
$("#btn1").click(function(){
  alert("Text: " + $("#test").text());
});
$("#btn2").click(function(){
  alert("HTML: " + $("#test").html());
});
``````

##### 获取属性 - attr()

``````javascript
$("button").click(function(){
  alert($("#w3s").attr("href"));
});
``````

#### 2）jQuery 设置

##### 设置内容 - text()、html() 以及 val()

``````javascript
$("#btn1").click(function(){ 
  $("#test1").text("Hello world!"); 
});
$("#btn2").click(function(){ 
  $("#test2").html("<b>Hello world!</b>"); 
});
$("#btn3").click(function(){ 
  $("#test3").val("Dolly Duck"); 
});
``````

回调函数

回调函数由两个参数：被选元素列表中当前元素的`下标`，以及`原始（旧的）值`。然后以函数新值返回您希望使用的字符串。

``````javascript
$("#btn1").click(function(){ 
  $("#test1").text(function(i,origText){ 
    return "Old text: " + origText + " New text: Hello world! (index: " + i + ")";
  });
});
``````

##### 设置属性 - attr()

``````javascript
$("button").click(function(){ 
  $("#w3s").attr("href","//www.w3cschool.cn/jquery");
});
``````

同时设置多个属性，使用 `{}` ：

``````javascript
$("button").click(function(){
  $("#w3s").attr({
    "href" : "//www.w3cschool.cn/jquery",
    "title" : "jQuery 教程"
  });
});
``````

回调函数

回调函数由两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

``````javascript
$("button").click(function(){
  $("#w3cschool").attr("href", function(i,origValue){
    return origValue + "/jquery";
  });
});
``````

#### 3）jQuery 添加元素

##### append() - 在被选元素内部的结尾插入指定内容

``````javascript
$("p").append("Some appended text.");
``````

``````javascript
function appendText() 
{ 
var txt1="<p>Text.</p>";               // 使用 HTML 标签创建文本  
var txt2=$("<p></p>").text("Text.");   // 使用 jQuery 创建文本 
var txt3=document.createElement("p");
txt3.innerHTML="文本。";               // 使用 DOM 创建文本 text with DOM
$("p").append(txt1,txt2,txt3);         // 追加新元素 
}
``````

##### prepend() - 在被选元素内部的开头插入指定内容

##### jQuery after() 和 before() 方法

jQuery after() 方法在被选元素之后插入内容。 <br>
jQuery before() 方法在被选元素之前插入内容。

``````javascript
$("img").before("<b>之前</b>");
$("img").after("<i>之后</i>");
``````

``````javascript
function afterText() 
{ 
var txt1="<b>I </b>";                    // 使用 HTML 创建元素  
var txt2=$("<i></i>").text("love ");     // 使用 jQuery 创建元素 
var txt3=document.createElement("big");  // 使用 DOM 创建元素 
txt3.innerHTML="jQuery!"; 
$("img").after(txt1,txt2,txt3);          // 在图片后添加文本 
}
``````

#### 4）jQuery 删除元素

remove() - 删除被选元素（及其子元素）

empty() - 从被选元素中删除子元素

##### 过滤被删除的元素

remove() 方法也可接受一个参数，允许您对被删元素进行过滤。 <br>
该参数可以是任何 `jQuery 选择器` 的语法。<br>
下面的例子删除 `class="italic"` 的所有 `<p>` 元素：

``````javascript
$("p").remove(".italic");
``````

#### 5）jQuery CSS类

##### addClass() - 向被选元素添加一个或多个类

添加类 `.blue` `.important`：

``````javascript
$("button").click(function(){
  $("h1,h2,p").addClass("blue");
  $("div").addClass("important");
});
``````

``````javascript
$("button").click(function(){
  $("#div1").addClass("important blue");
});
``````

##### removeClass() - 从被选元素删除一个或多个类

##### toggleClass() - 对被选元素进行添加/删除类的切换操作

##### css() - 设置或返回样式属性

返回css属性

    $("p").css("background-color");

设置 CSS 属性

    $("p").css("background-color","yellow");

设置多个 CSS 属性，使用 `{}`

    $("p").css({"background-color":"yellow","font-size":"200%"});

#### 6）jQuery 尺寸

<img src="https://7n.w3cschool.cn/statics/images/course/img_jquerydim.gif">

##### width() 和 height()

设置或返回元素的宽度/高度（不包括内边距、边框或外边距）。
(content-box)

##### innerWidth() 和 innerHeight()

返回元素的宽度/高度（包括内边距）。
(padding-box)

##### outerWidth() 和 outerHeight()

返回元素的宽度/高度（包括内边距和边框）
(border-box)

**提示：** outerWidth(true) 方法返回元素的宽度（包括内边距、边框和外边距）；outerHeight(true) 方法返回元素的高度（包括内边距、边框和外边距）。

### 7、jQuery 遍历

#### 1）祖先

##### parent()

返回被选元素的直接父元素。

##### parents()

返回被选元素的所有祖先元素，它一路向上直到文档的根元素`<html>`。

使用可选参数来过滤对祖先元素的搜索。<br>
下面的例子返回所有 `<span>` 元素的所有祖先，并且它是 `<ul>` 元素：

``````javascript
$(document).ready(function(){
  $("span").parents("ul");
});
``````

##### parentsUntil()

返回介于两个给定元素之间的所有祖先元素。<br>
下面的例子返回介于 `<span>` 与 `<div>` 元素之间的所有祖先元素：

``````javascript
$(document).ready(function(){
  $("span").parentsUntil("div");
});
``````

#### 2）后代

##### children()

返回被选元素的所有直接子元素。

使用可选参数来过滤对子元素的搜索。<br>
下面的例子返回类名为 "1" 的所有 `<p>` 元素，并且它们是 `<div>` 的直接子元素：

``````javascript
$(document).ready(function(){
  $("div").children("p.1");
});
``````

##### find()

返回被选元素的后代元素，一路向下直到最后一个后代。 <br>
**注意：** 需传入jQuery选择器。

下面的例子返回属于 `<div>` 后代的所有 `<span>` 元素：

``````javascript
$(document).ready(function(){
  $("div").find("span");
});
``````

下面的例子返回 `<div>` 的所有后代：

``````javascript
$(document).ready(function(){
  $("div").find("*");
});
``````

#### 3）同胞

##### siblings()

返回被选元素的所有同胞元素。<br>
可以使用可选参数来过滤对同胞元素的搜索。

##### next()

返回被选元素的下一个同胞元素。<br>
该方法只返回一个元素。

##### nextAll()

返回被选元素的所有跟随的同胞元素。

##### nextUntil()

返回介于两个给定参数之间的所有跟随的同胞元素。<br>
返回介于 `<h2>` 与 `<h6>` 元素之间的所有同胞元素：

    $("h2").nextUntil("h6");

##### prev(), prevAll() & prevUntil()

工作方式与上面的方法类似，只不过方向相反而已：它们返回的是前面的同胞元素（在 DOM 树中沿着同胞元素向后遍历，而不是向前）。

#### 4）过滤

##### first()

返回被选元素的首个元素。

##### last()

方法返回被选元素的最后一个元素。

##### eq()

返回被选元素中带有指定索引号的元素。<br>
索引号从 0 开始，因此首个元素的索引号是 0 而不是 1。下面的例子选取第二个 `<p>` 元素（索引号 1）：

    $("p").eq(1);

##### filter()

允许规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。<br>
返回带有类名 "intro" 的所有 `<p>` 元素：

    $("p").filter(".intro");

##### not()

返回不匹配标准的所有元素。与`filter()`相反<br>
返回不带有类名 "intro" 的所有 `<p>` 元素：

    $("p").not(".intro");

### 8、jQuery AJAX

#### 1）load()

从服务器加载数据，并把返回的数据放入被选元素中。

    $(selector).load(URL,data,callback); 

必需的 URL 参数规定希望加载的 URL。<br>
可选的 data 参数规定与请求一同发送的查询字符串键/值对集合。<br>
可选的 callback 参数是 load() 方法完成后所执行的函数名称。<br>
把文件 "demo_test.txt" 的内容加载到指定的 `<div>` 元素中：

    $("#div1").load("demo_test.txt");

把 "demo_test.txt" 文件中 id="p1" 的元素的内容，加载到指定的 `<div>` 元素中：

    $("#div1").load("demo_test.txt #p1");

##### 回调函数

参数：
responseTxt - 包含调用成功时的结果内容<br>
statusTXT - 包含调用的状态<br>
xhr - 包含 XMLHttpRequest 对象<br>
下面的例子会在 load() 方法完成后显示一个提示框。如果 load() 方法已成功，则显示"外部内容加载成功！"，而如果失败，则显示错误消息：

``````javascript
$("button").click(function(){
  $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      alert("External content loaded successfully!");
    if(statusTxt=="error")
      alert("Error: "+xhr.status+": "+xhr.statusText);
  });
``````

**提示：** 在jQuery的load()方法中，无论AJAX请求是否成功，一旦请求完成（complete）后，回调函数（callback）立即被触发。

#### 2）get() 和 post()

    $.get(URL,callback);

必需的 URL 参数规定您希望请求的 URL。<br>
可选的 callback 参数是请求成功后所执行的函数名。<br>
下面的例子使用 `$.get()` 方法从服务器上的一个文件中取回数据：

``````javascript
$("button").click(function(){
  $.get("demo_test.php",function(data,status){
    alert("数据: " + data + "\n状态: " + status);
  });
});
``````

回调函数中，第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。

    $.post(URL,data,callback);

必需的 URL 参数规定您希望请求的 URL。<br>
可选的 data 参数规定连同请求发送的数据。<br>
可选的 callback 参数是请求成功后所执行的函数名。<br>
下面的例子使用 $.post() 连同请求一起发送数据：

``````javascript
$("button").click(function(){
  $.post("demo_test_post.html",
  {
    name:"Donald Duck",
    city:"Duckburg"
  },
  function(data,status){
    alert("Data: " + data + "nStatus: " + status);
  });
});
``````

#### 3）ajax()

在jQuery中，$.ajax()方法能够实现与load()、$.get()和$.post()方法相同的功能，并且具有更多的作用。

    $.ajax({name:value, name:value, ... })

``````javascript
$("button").click(function(){
$.ajax({url:"demo_test.txt",success:function(result){
$("#div1").html(result);
}});
});
``````

### 9、noConflict

用于在页面上同时使用 jQuery 和其他框架，允许在同一个页面加载多个jQuery实例，尤其是不同版本的jQuery。

noConflict() 方法会释放对 $ 标识符的控制，这样其他脚本就可以使用它了。<br>
当然，您仍然可以通过全名替代简写的方式来使用 jQuery：

``````javascript
$.noConflict();
jQuery(document).ready(function(){
  jQuery("button").click(function(){
    jQuery("p").text("jQuery is still working!");
  });
});
``````

您也可以创建自己的简写。noConflict() 可返回对 jQuery 的引用，您可以把它存入变量，以供稍后使用。请看这个例子：

``````javascript
var jq = $.noConflict();
jq(document).ready(function(){
  jq("button").click(function(){
    jq("p").text("jQuery is still working!");
  });
});
``````

如果你的 jQuery 代码块使用 $ 简写，并且您不愿意改变这个快捷方式，那么您可以把 $ 符号作为变量传递给 ready 方法。这样就可以在函数内使用 $ 符号了 - 而在函数外，依旧不得不使用 "jQuery"：

``````javascript
$.noConflict();
jQuery(document).ready(function($){
  $("button").click(function(){
    $("p").text("jQuery is still working!");
  });
});
``````