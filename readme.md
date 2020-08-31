## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```
let vm = new Vue({
    el: '#el'
    data: {
        o: 'object',
        dog: {}
    },
    method: {
        clickHandler () {
            // 该 name 属性是否是响应式的 不是响应式的
            this.dog.name = 'Trump'
        }
    }
})
```

由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的.
如果给 data 添加的成员没有在 data 对象上存在则不是响应式的
把新增成员设置成响应式数据: Vue.set(object, propertyName, value)或 vm.\$set()方法
内部原理:其实就是给这个属性添加 getter 和 setter 监听数据的变化,当数据变化 dep 通知所有的 Watcher 实例更新视图

### 2、请简述 Diff 算法的执行过程

    核心是对比新旧节点的Children ,更新DOM,只要找同级别的子节点依次比较，然后再找下一级别的节点比较
    分为四种情况:

- 开始节点和结束节点比较
  这两种情况类似 oldStartVnode / newStartVnode (旧开始节点 / 新开始节点)
  oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)

  如果 oldStartVnode 和 newStartVnode 是 sameVnode (key 和 sel 相同)调用 patchVnode()
  对比和更新节点把旧开始和新开始索引往后移动 oldStartIdx++ / oldEndIdx++
  如果 oldEndVnode 和 newEndVnode 是相同节点 调用 patchVnode()对比差异更新,把新旧结束节点索引向前移动 oldEndIdx--/newEndIdx--

- 旧开始节点和新的结束节点比较
  判断是否是相同节点 调用 patchVnode() 对比和更新节点
  将旧的开始 oldStartVnode 对应的 DOM 元素,移动到右边
- 比较旧的结束节点和新开始节点
  相同调用 patchVnode() 对比和更新节点
  把 oldEndVnode 对应的 DOM 元素，移动到左边更新索引
- 以上都不满足
  遍历新节点，使用 newStartNode 的 key 在老节点数组中找相同节点
  如果没找到,说明新的开始节点是新的,创建新的 DOM 元素,插入到 DOM 中
  如果找到,判断新节点和找到的老节点的 sel 选择器是否相同
  如果不相同,创建新的 DOM 元素,插入到 DOM 中
  如果相同,把找到的 DOM 元素,移动到左边
- 如果老节点的数组先遍历完(oldStartIdx > oldEndIdx)，说明新节点有剩余，把剩余节点批量插入到右边
- 如果新节点的数组先遍历完(newStartIdx > newEndIdx)，说明老节点有剩余，把剩余节点批量删除

二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

代码详见 app/hash-router-demo/src/VueRouter/index.js

#### Project setup

```
yarn install
```

#### Compiles and hot-reloads for development

```
yarn serve
```

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

代码详见 app/minvue/js/compiler.js

#### project setup

```
cd minvue
serve .
```

3、参考 Snabbdom 提供的电影列表的示例，利用 Snabbdom 实现类似的效果，如图：
