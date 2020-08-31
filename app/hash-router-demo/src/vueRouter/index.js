let _Vue = null
export default class VueRouter {
  static install(Vue) {
    //   判断插件是否已被加载
    if (VueRouter.install.installed) {
      return
    }
    // 只加载一次
    VueRouter.install.installed = true
    // 将传入的vue实例挂到全局变量上
    _Vue = Vue
    _Vue.mixin({
      // vue加载时把router注入到vue实例
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      },
    })
  }
  constructor(options) {
    this.$options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/',
    })
  }

  init() {
    this.initRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }
  //   遍历所有的路由信息 将路径和组件的映射关系记录到routerMap中
  initRouteMap() {
    this.$options.routes.forEach((route) => {
      this.routerMap[route.path] = route.component
    })
  }
  // hashchange 事件监听路由地址的变化 改变当前默认hash地址
  initEvent() {
    window.addEventListener('hashchange', () => {
      this.data.current = window.location.hash
    })
  }
  // 注册组件
  initComponents(Vue) {
    const self = this
    Vue.component('router-link', {
      props: {
        to: String,
      },
      render(h) {
        return h(
          'a',
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickHandler,
            },
          },
          [this.$slots.default]
        )
      },
      methods: {
        clickHandler(e) {
          e.preventDefault()
          location.hash = this.to
          this.$router.data.current = this.to
        },
      },
    })
    Vue.component('router-view', {
      render(h) {
        //   找到对应hash的组件
        const cm = self.routerMap[self.data.current]
        return h(cm)
      },
    })
  }
}
