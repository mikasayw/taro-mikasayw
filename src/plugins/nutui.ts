// // import { createApp } from "vue";
import {
  Button,
  Icon,
  Toast,
  Radio,
  RadioGroup,
  Input,
  Dialog,
  OverLay,
  Popup
} from '@nutui/nutui-taro'

const nutuiArray = [Button, Icon, Toast, Radio, RadioGroup, Input, Dialog, OverLay, Popup]

export const nutuiPlugin = {
  install: (vm) => {
    nutuiArray.forEach((item) => {
      vm.use(item)
    })
  }
}
