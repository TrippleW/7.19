# Vue.js

1、使用`Object.freeze()`会阻止修改现有属性。

``````javascript
var obj = {
  foo: 'bar'
}

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})

<div id="app">
  <p>{{ foo }}</p>
  <!-- 这里的 `foo` 不会更新！ -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
``````

2、Vue实例属性

它们都有前缀 $，以便与用户定义的属性区分开来。eg：`$data` `$el` `$watch`...

3、使用`v-once`进行一次性的插值：

    <span v-once>这个将不会改变: {{ msg }}</span>

4、原始HTML插值：v-html，span 的内容将会被替换成为属性值 rawHtml

    <p>Using v-html directive: <span v-html="rawHtml"></span></p>

5、`v-bind`指令在布尔特性的情况下，它们的存在即暗示为 `true`。

下面例子中，如果 `isButtonDisabled` 的值是 null、undefined 或 false，则 disabled 特性甚至不会被包含在渲染出来的 `<button>` 元素中。

``````HTML
<button v-bind:disabled="isButtonDisabled">Button</button>
``````

6、模板中可以绑定`单个JavaScript表达式`，例如：

    {{ ok ? 'YES' : 'NO' }}
    {{ message.split('').reverse().join('') }}

不能绑定：

    {{ var a = 1 }}
    {{ if (ok) { return message } }}

**note：** 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 `Math` 和 `Date` 。你不应该在模板表达式中试图访问用户定义的全局变量。

7、`v-bind`用于响应式更新HTML特性，`v-on`用于监听DOM事件。

    <a v-bind:href="url">..</a>
    <a v-on:click="doSth">..</a>

8、修饰符 (Modifiers) 是以半角句号 . 指明的特殊后缀，用于指出`一个指令应该以特殊方式绑定`。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

    <form v-on:submit.prevent="onSubmit">...</form>

9、`v-bind:href`缩写为`:href`，`v-on:click`缩写为`@click`。

10、计算属性`computed`：对于任何复杂逻辑，使用计算属性。

**计算属性computed vs 方法methods：** 结果相同。不同的是`计算属性是基于它们的依赖进行缓存的`。计算属性只有在它的相关依赖发生改变时才会重新求值。

相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。

**计算属性computed vs 侦听属性watch：** watch是一种通用的观察和响应Vue实例上的数据变动的方式。相比滥用watch，通常更好的做法是使用计算属性而不是命令式的 watch 回调。

11、Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时`执行异步或开销较大的操作`时，这个方式是最有用的。

12、Vue组件component

定义：

``````javascript
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
``````

一个组件的`data`选项必须是一个`函数`。

13、需要使用 `v-if`/`v-for` 切换/渲染多个元素时，可以把一个 `<template>` 元素当作看不见的包裹元素，并在上面使用 `v-if`。最终的渲染结果不包含 `<template>` 元素。

``````html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
``````

14、Vue 会尽可能高效地渲染元素，通常会`复用已有元素`而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是`完全独立`的，不要复用它们”。只需添加一个具有唯一值的 `key 属性`即可。

15、数组更新检测

由于 JavaScript 的限制，Vue 不能检测以下变动的数组：<br>
1）当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`<br>
2）当你修改数组的长度时，例如：`vm.items.length = newLength`

与1）效果相同且会触发状态更新的两种方式：<br>
``````javascript
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
``````

使用`splice`解决2）：

    vm.items.splice(newLength)

16、对象更新检测

还是由于 JavaScript 的限制，Vue `不能检测对象属性的添加或删除`：

``````javascript
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的
vm.b = 2
// `vm.b` 不是响应式的
``````

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, key, value)` 方法向`嵌套对象`添加响应式属性。

``````javascript
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
Vue.set(vm.userProfile,'age',27);
//vm.$set(vm.userProfile,'age',27) //vm.$set实例方法，全局Vue.set的别名
``````

有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：

``````javascript
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
``````

应该：

``````javascript
vm.userProfile = Object.assign({},vm.userProfile,{
    age:27,
    favoriteColor:'Vue Green'
})
``````

17、显示过滤排序结果，不改变原始数据，创建或返回过滤或排序数组的计算属性。当计算属性不适用时(例如，在`嵌套 v-for 循环`中) ，使用method方法。

18、`v-for`优先级比`v-if`高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。而如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 `<template>`)上。

19、2.2.0+ 的版本里，当在组件中使用 v-for 时，`key 是必须的`。

20、用`v-on`指令监听DOM事件，`v-on`可以接收一个需要调用的方法名称，也可以在内联JavaScript语句中调用该方法。有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入。

21、`v-on`事件修饰符

    .stop
    .prevent
    .capture
    .self
    .once
    .passive

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

不像其它只能对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的组件事件上。
    <!-- 点击事件将只会触发一次 -->
    <a v-on:click.once="doThis"></a>

不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你不想阻止事件的默认行为。

`.passive` 修饰符尤其能够提升移动端的性能。