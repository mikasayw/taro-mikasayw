import { createApp } from 'vue'
import './app.scss'

import { nutuiPlugin } from './plugins/nutui'

const App = createApp({
  onShow() {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(nutuiPlugin)

export default App

// // SDK初始化函数
// init(){
//   this.appMethod = App;
//   this.componentMethod = Component;
//   const ctx = this;
//   //重写微信小程序Component
//   Component = (opts) => {
//     overrideComponent(opts, ctx);
//     ctx.componentMethod(opts);
//   };
//   //重写微信小程序App
//   App = (app) => {
//     overrideApp(app, ctx);
//     ctx.appMethod(app);
//   };
// }

// //注意ctx是sdk的this
// overrideComponent(opts, ctx) => {
// const compOnShow = opts.methods.onShow;
// opts.methods.onShow = function(){
//   // do something
//   //注意这里的this是实际调用方
//   compOnShow.apply(this, arguments)
// }
// })

// overrideApp(app, ctx) => {
// const _onError = app.onError || function () {};
// const _onShow = app.onShow || function () {};
// app.onError = function (err) {
//   reportError(err, ctx);
//   return _onError.apply(this, arguments);
// };
// app.onShow = function () {
//   //do something
//   return _onShow.apply(this, arguments);
// };
// })
