// // import { createApp } from "vue";
import { Button, Icon, Toast, Radio } from "@nutui/nutui-taro";

const nutuiArray = [Button, Icon, Toast, Radio];

export const nutuiPlugin = {
  install: (vm) => {
    nutuiArray.forEach((item) => {
      vm.use(item);
    });
  },
};
