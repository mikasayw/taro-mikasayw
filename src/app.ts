import { createApp } from "vue";
import "./app.scss";

import { nutuiPlugin } from "./plugins/nutui";

const App = createApp({
  onShow() {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(nutuiPlugin);

export default App;
