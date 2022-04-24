<script lang="ts">
import useRouter from '@/hooks/router';
// import Barrage from "@/components/barrage";

export default {
  name: 'Index',
  components: {
    // Barrage,
  },
  setup() {
    const { router } = useRouter();

    const onView = (type) => {
      switch (type) {
        case 'waterMark':
          router.navigateTo({
            url: '/pages/feat/water'
          });
          break;
        default:
          break;
      }
    };

    return {
      onView
    };
  }
};
</script>

<template>
  <!-- <NumberDisplay />
        <NumberSubmit /> -->
  <view class="bg" />
  <view class="user-info flexbox">
    <view class="avatar">
      <open-data type="userAvatarUrl" />
    </view>
    <open-data type="userNickName" default-text="mirs" />
  </view>

  <view class="content flexbox">
    <view class="col-left" @tap="onView('waterMark')">
      <view class="col-left-text">
        <nut-icon name="JIMI40" size="18"></nut-icon>
        <text class="text">图片水印</text>
      </view>
    </view>
    <view class="col-right">
      <view class="col-1">图片水印</view>
      <view class="col-1">图片水印</view>
    </view>
  </view>

  <!-- <Barrage class="barrage" /> -->
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
  padding: 0 40px;
  justify-content: flex-start;
  color: #333333;
  .avatar {
    border: 2px solid #ffffff;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 30px;
  }
}

.content {
  margin: 50px 40px 0 40px;
  font-size: 30px;
  color: #2c3e50;
  align-items: flex-start;
  justify-content: space-between;
  .col-left {
    position: relative;
    flex: 1;
    margin-right: 40px;
    height: 300px;
    border-radius: 20px;
    background-image: url('https://s2.loli.net/2022/04/22/cjAvafzTLr4nOmM.jpg');
    background-size: 100% 100%;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      border: 2px solid #333333;
      border-radius: 20px;
      animation: move 5s linear infinite;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #252d3f;
      border-radius: 20px;
      opacity: 0.3;
    }
    .col-left-text {
      position: absolute;
      top: 13px;
      right: 30px;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      color: #ffffff;
      .text {
        margin-left: 15px;
        font-weight: bold;
      }
    }
  }
  .col-right {
    flex: 1;
    .col-1 {
      position: relative;
      height: 135px;
      border-radius: 20px;
      background-color: #252d3f;
      background-image: url('https://s2.loli.net/2022/04/22/ex3d6g18bitq2Er.png');
      background-size: 100% 100%;
      box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.3);
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #252d3f;
        border-radius: 20px;
        opacity: 0.3;
      }
      &:last-child {
        background-color: #252d3f;
        margin-top: 30px;
      }
    }
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

.barrage {
  width: 100%;
  display: block;
  margin-top: 50px;
}
</style>
