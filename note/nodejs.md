教程：https://nodejs.jakeyu.top/

文档：http://nodejs.cn/api/

## 一、创建应用
### 步骤
步骤一、引入 required 模块
    
    var http = require("http");

步骤二、创建服务器

    http.createServer(function(request,response){...}).listen(8888);

步骤三、接收请求与响应请求

``````javascript
response.writeHead(200, {'Content-Type': 'text/plain'});
response.end('Hello World\n');
``````

## 二、NPM
### 1、安装模块

    npm install express          # 本地安装
    npm install express -g   # 全局安装

### 2、查看安装的模块

    npm ls -g
    npm ls

### 3、卸载模块

    npm uninstall express

### 4、更新模块

    npm update express
    npm update express -g

### 5、搜索模块

    npm search express

## 三、REPL（交互式解释器）

在`cmd`输入`node`进入。

可以使用下划线(_)获取表达式的运算结果

## 四、EventEmitter

###  1、绑定事件和监听器
``````javascript
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
//监听器
var listener = function listener(arg1,...){
    ...;
}
//绑定事件'connection'和监听器listener
eventEmitter.addListener('connection',listener);
//或
//eventEmitter.on('connection',listener);
``````
###  2、计算监听器个数

类方法：listenerCount(emitter, event)	返回指定事件的监听器数量。

``````javascript
var cnt = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
``````

### 3、触发事件

emit(event, [arg1], [arg2], [...])	按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

``````javascript
eventEmitter.emit('connection',arg1,..);
``````

### 4、移除监听器

removeListener(event, listener)：移除指定事件的某个监听器，监听器 必须是该事件已经注册过的监听器。

``````javascript
eventEmitter.removeListener('connection',listener);
``````

### 5、once(event, listener)	

为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。

### 6、error事件

要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。

### 7、继承EventEmitter

不会直接使用 EventEmitter，而是在对象中继承它。

## 五、Buffer

Buffer 库可以让 Node.js 处理`二进制数据`，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个`整数数组`，但它对应于 V8 堆内存之外的一块原始内存。

### 1、创建Buffer类

``````javascript
var buf1 = new Buffer(10);  //创建长度为 10 字节的 Buffer 实例：
var buf2 = new Buffer([10,20,30,40])    //通过给定的数组创建
var buf3 = new Buffer('hellor','utf-8'); //通过一个字符串来创建 utf-8 是默认的编码方式，此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。
``````

### 2、写入缓冲区

返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。

    buf.write(string[, offset[, length]][, encoding])

### 3、从缓冲区读取数据

解码缓冲区数据并使用指定的编码返回字符串。

    buf.toString([encoding[, start[, end]]])

### 4、将 Buffer 转换为 JSON 对象

    buf.toJSON()

### 5、缓冲区合并

    Buffer.concat(list[, totalLength])

``````javascript
var buffer1 = new Buffer('菜鸟教程 ');
var buffer2 = new Buffer('www.runoob.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
``````

### 6、缓冲区比较

返回一个数字，表示 buf 在 otherBuffer 之前：<0，之后：>0，或相同：=0。

    buf.compare(otherBuffer);

### 7、拷贝缓冲区

拷贝 buf 的一个区域的数据到 target 的一个区域，即便 target 的内存区域与 buf 的重叠。

    buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])

### 8、缓冲区裁剪

返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。

    buf.slice([start[, end]])

### 9、缓冲区长度

    buf.length;

## 六、Stream

Stream的四种流类型：
<li>Readable - 可读操作。
<li>Writable - 可写操作。
<li>Duplex - 可读可写操作.
<li>Transform - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
<li>data - 当有数据可读时触发。
<li>end - 没有更多的数据可读时触发。
<li>error - 在接收和写入过程中发生错误时触发。
<li>finish - 所有数据已被写入到底层系统时触发。

### 1、从流中读取数据

创建可读流：

    var fs = require("fs");
    var readerStream = fs.createReadStream('input.txt');

设置编码：

    readerStream.setEncoding('UTF8');

处理流事件 --> data, end, and error：

    readerStream.on('..',function(..){..});

### 2、写入流

创建一个可以写入的流，写入到文件 output.txt 中：

    var writerStream = fs.createWriteStream('output.txt');

使用 utf8 编码写入data：

    writerStream.write(data,'UTF8');

标记文件末尾：

    writerStream.end();

处理流事件 --> finish and error：

    writerStream.on('..',function(..){..});

### 3、管道流

创建一个可读流
    
    var readerStream = fs.createReadStream('input.txt');

创建一个可写流

    var writerStream = fs.createWriteStream('output.txt');

管道读写操作：读取 input.txt 文件内容，并将内容写入到 output.txt 文件中

    readerStream.pipe(writerStream);

### 4、链式流

链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。

用管道和链式来压缩和解压文件：

``````javascript
var zlib = require('zlib');
...
// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
``````

## 七、模块系统

一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

### 1、创建模块

Node.js 提供了exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

1）
hello.js文件：
``````javascript
module.exports.world = function()
{
    console.log('Hello World!');
}
``````
获取模块hello.js并使用world接口函数：
``````javascript
var hello = require('./hello');
hello.world();
``````

2）把一个对象封装到模块中
hello.js文件：
```````javascript
function Hello() {...}
module.exports = Hello;
```````
直接获取对象：
``````javascript
var Hello = require('./hello');
hello = new Hello();
hello.func(..); //调用封装在Hello中的func(..)
``````

## 八、函数

我们可以把一个函数作为变量传递。但是我们不一定要绕这个"先定义，再传递"的圈子，我们可以在调用另一个函数时，直接在括号中定义和传递这个函数。

``````javascript
function execute(someFunction, value) {
  someFunction(value);
}

execute(function(word){ console.log(word) }, "Hello");
``````

## 九、