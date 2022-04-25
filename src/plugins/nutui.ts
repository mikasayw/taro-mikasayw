// // import { createApp } from "vue";
import { Button, Icon, Toast, Radio, RadioGroup, Input } from '@nutui/nutui-taro';

const nutuiArray = [Button, Icon, Toast, Radio, RadioGroup, Input];

export const nutuiPlugin = {
  install: (vm) => {
    nutuiArray.forEach((item) => {
      vm.use(item);
    });
  }
};
