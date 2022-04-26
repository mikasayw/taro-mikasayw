<script lang="ts">
import Barrage from '@/components/barrage.vue'
import { ref } from 'vue'

export default {
  name: 'Room',
  components: {
    Barrage
  },
  setup() {
    const inputWord = ref<string>('')
    const barrageRef = ref<InstanceType<typeof Barrage> | null>(null)
    const onEnter = (): void => {
      if (!inputWord.value) {
        wx.showToast({ title: '不能输入空弹幕～', icon: 'none' })
      }

      barrageRef?.value?.addBarrage(inputWord.value)
    }
    return {
      barrageRef,
      inputWord,
      onEnter
    }
  }
}
</script>

<template>
  <view class="room__barrage">
    <view class="mask"></view>
    <view class="room__bg">
      <Barrage ref="barrageRef" />
    </view>
  </view>

  <view class="room__footer">
    <view class="flexbox">
      <view class="room__footer__dan">弹</view>
      <nut-input
        v-model="inputWord"
        class="room__footer__ipt"
        :border="false"
        placeholder="请输入15字以内的弹幕"
      />
      <nut-icon name="message" size="20" @click="onEnter"></nut-icon>
    </view>
  </view>
</template>

<style lang="scss">
.room__barrage {
  padding: 20px;
  position: relative;
  height: 400px;
  margin: 50px 20px 0 20px;
  border-radius: 20px;
  background-color: $font-color;
  box-shadow: 0px 0px 20px 5px $bg-weak-color;
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: 50%;
    width: 4px;
    height: 100px;
    background: $font-color;
    transform-origin: 0 0;

    transform: skew(45deg);
  }
  &::after {
    transform: skew(-45deg);
  }
  .room__bg {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-size: 100% 100%;
    background-image: url('https://s2.loli.net/2022/04/22/ex3d6g18bitq2Er.png');
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $bg-weak-color;
    border-radius: 20px;
  }
}
.room__footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 30px;
  background-color: $bg-weak-color;
  padding-top: 20px;
  padding-bottom: calc(env(safe-area-inset-bottom));
  .room__footer__ipt {
    width: 100%;
    padding: 10px 20px;
    margin: 0 30px 0 20px;
    border-radius: 10px;
    // .input-text {
    //   border-bottom: 1px solid $font-color;
    // }
  }
  .room__footer__dan {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 24px;
    font-weight: bold;
    color: $font-color;
    border: 2px solid $font-color;
    border-radius: 50%;
  }
}
</style>
