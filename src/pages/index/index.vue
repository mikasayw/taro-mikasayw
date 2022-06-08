<script lang="ts">
import useRouter from '@/hooks/router'

export default {
  name: 'Index',
  setup() {
    const { router } = useRouter()

    const onView = (type: string) => {
      switch (type) {
        default:
          router.navigateTo({
            url: `/pages/${type}/index`
          })
          break
      }
    }

    return {
      onView
    }
  }
}
</script>

<template>
  <view class="bg" />
  <view class="user-info flexbox">
    <view class="avatar">
      <open-data type="userAvatarUrl" />
    </view>
    <open-data type="userNickName" default-text="mirs" />
  </view>

  <view class="feature flexbox">
    <view class="feature__left" @tap="onView('waterMark')">
      <view class="feature__title">
        <nut-icon name="photograph" size="16"></nut-icon>
        <text class="text">图片水印</text>
      </view>
    </view>
    <view class="feature__right">
      <view
        class="feature__right__chunk"
        style="background-image: url(https://s2.loli.net/2022/04/22/ex3d6g18bitq2Er.png)"
        @tap="onView('room')"
      >
        <view class="feature__title">
          <nut-icon name="message" size="16"></nut-icon>
          <text class="text">弹幕</text>
        </view>
      </view>
      <view class="feature__right__chunk" @tap="onView('cook')">
        <view class="feature__title">
          <nut-icon name="dshop" size="16"></nut-icon>
          <text class="text">疫情厨房</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  background-image: url('../../assets/images/bg.jpeg');
  background-size: 100%;
  background-repeat: no-repeat;
  opacity: 0.4;
  z-index: -1;
  border-radius: 0 0 10px 10px;
}
.user-info {
  margin-top: 300px;
  padding: 0 30px;
  justify-content: flex-start;
  color: $font-color;
  .avatar {
    border: 2px solid #ffffff;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 30px;
  }
}

.feature {
  margin: 50px 20px 0 20px;
  align-items: flex-start;
  justify-content: space-between;
  .feature__title {
    position: absolute;
    top: 20px;
    right: 30px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    color: #ffffff;
    .text {
      font-size: 28px;
      margin-left: 15px;
      font-weight: 500;
    }
  }
  .feature__left {
    flex: 1;
    position: relative;
    margin-right: 40px;
    height: 300px;
    border-radius: 20px;
    background-image: url('https://s2.loli.net/2022/04/22/cjAvafzTLr4nOmM.jpg');
    background-size: 100% 100%;
    box-shadow: 0px 0px 10px 2px $bg-weak-color;
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      border: 2px solid $font-color;
      border-radius: 20px;
      animation: move 5s linear infinite;
    }
  }
  .feature__right {
    flex: 1;
    position: relative;
    .feature__right__chunk {
      position: relative;
      height: 135px;
      border-radius: 20px;
      background-image: url('https://s2.loli.net/2022/04/22/PJTBR4CXkSrlI59.jpg');
      background-size: 100% 100%;
      box-shadow: 0px 0px 20px 5px $bg-weak-color;
      &:last-child {
        margin-top: 30px;
      }
    }
  }
  .feature__left::after,
  .feature__right .feature__right__chunk::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 20px;
    background-color: $bg-weak-color;
  }
}

@keyframes move {
  0%,
  100% {
    clip-path: inset(0 0 99% 0);
  }
  25% {
    clip-path: inset(0 99% 0 0);
  }
  50% {
    clip-path: inset(99% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 99%);
  }
}
</style>
