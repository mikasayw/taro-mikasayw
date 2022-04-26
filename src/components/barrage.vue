<script lang="ts">
// import Taro from '@tarojs/taro'
import { onMounted, onBeforeUnmount, ref } from 'vue'

let id = 0
interface Barrage {
  id: number
  top: number // 弹幕元素距离容器顶部的偏移量
  duration: number // 弹幕元素的展示持续时间
  content: string
  startTime: number
  left: number
  color?: string
  width?: number // 弹幕元素宽度
  height?: number // 弹幕元素高度
  isMyself?: Boolean // 是否是自己的
}

// function getNode(name: string): {} {
//   return new Promise((resolve) => {
//     Taro.createSelectorQuery()
//       .select(name)
//       .boundingClientRect((rect) => {
//         resolve(rect)
//       })
//       .exec()
//   })
// }

const BARRAGE: Array<string> = [
  '骨刀真的是拣的',
  '看我神威，无坚不摧',
  '年少时曾问旅路，百年后只见云深',
  '即将有人鱼线的PDD',
  '马哥，我是旭旭宝宝',
  '太对了哥，哥太对',
  '大师，配吗？张合就上了吗'
]

const getFontColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export default {
  name: 'Barrage',
  setup() {
    const barrageArray = ref<Array<Barrage>>([])

    const addBarrage = (content) => {
      barrageArray.value.unshift({
        id: id++,
        top: Math.floor(Math.random() * 80) + 2,
        duration: Math.floor(Math.random() * 30),
        content: content,
        color: Math.random() > 0.5 ? `#${getFontColor()}` : '#ffffff',
        startTime: Date.now(),
        left: 750,
        isMyself: true
      })
    }

    const init = () => {
      for (const content of BARRAGE) {
        const temp = {
          id: id++,
          top: Math.floor(Math.random() * 80) + 2,
          duration: Math.floor(Math.random() * 30),
          content: content,
          color: Math.random() > 0.5 ? `#${getFontColor()}` : '#ffffff',
          startTime: Date.now(),
          left: 750
        }

        barrageArray.value.push(temp)
      }
    }
    init()

    let clearTime: any = null
    const frame = () => {
      clearTime = window.setTimeout(() => {
        const nowTime = Date.now()

        barrageArray.value = barrageArray.value.filter((item) => {
          return nowTime - item.duration * 1000 - item.startTime < 0
        })

        frame()
      }, 3000)
    }
    onBeforeUnmount(() => {
      clearTime && clearTimeout(clearTime)
    })

    onMounted(() => {
      // 自定义left在此赋值后animation的值并没改变
      // Taro.nextTick(() => {
      //   barrageArray.value.forEach(async (item) => {
      //     const { width = 0 } = await getNode(`#t_${item.id}`)
      //     item.left += width
      //     console.log(item.left)
      //   })
      // })
    })
    return {
      barrageArray,
      addBarrage
    }
  }
}
</script>

<template>
  <view class="barrage">
    <view
      class="barrage__group"
      v-for="item in barrageArray"
      :key="item.id"
      :style="`top:${item.top}%; animation: transAnimation ${item.duration}s linear;
      --left:${-item.left}px`"
    >
      <view
        :id="`t_${item.id}`"
        :class="['barrage__group-item', { 'barrage__group--my': item.isMyself }]"
      >
        <!-- <image
              src="{{ item.sex == 0 ? avatarBoy : avatarGirl }}"
              class="avatar"
              mode="aspectFit"
            ></image>
            <image
              src="{{ item.sex == 0 ? iconBoy : iconGirl }}"
              class="sex"
              mode="aspectFit"
            ></image> -->
        <text class="content" :style="{ color: item.color }">{{ item.content }}</text>
      </view>
      <!-- <image src="{{ iconGood }}" class="icon good" mode="aspectFill"></image> -->
    </view>
  </view>
</template>

<style lang="scss">
.barrage {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .barrage__group {
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 3;
    animation-timing-function: linear;
    animation-fill-mode: none;
    transform: translateZ(0);
    white-space: nowrap;
    .barrage__group-item {
      display: inline-flex;
      white-space: nowrap;
    }
  }
  .barrage__group--my {
    border: 2px solid black;
  }
}

@keyframes transAnimation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(var(--left));
  }
}
// @keyframes leftAnimation {
//   from {
//     left: 100%;
//   }
//   to {
//     left: -100%;
//   }
// }
</style>
