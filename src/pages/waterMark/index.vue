<script lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { nextTick } from '@tarojs/taro';
// import { Input as nutInput, Toast } from '@nutui/nutui-taro';
import { saveImageToPhotosAlbum, getSystemInfoSync } from '@/hooks/tools';

const getCanvasCtx = (): object => {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const { node } = res[0] || {};
        // canvasCtx.canvas = node;
        // canvasCtx.ctx = node.getContext('2d');
        resolve(node);
      });
  });
};

const COLORARRAY = [
  { label: 'rgba(107,114,128,.3)', title: '灰色' },
  { label: '#ffffff', title: '白色' },
  { label: '#000000', title: '黑色' }
];

export default {
  name: 'WaterMark',
  // components: {
  //   nutInput
  // },
  setup() {
    // 临时image
    let weakImage: string = '';

    const colorArray = ref(COLORARRAY);
    const fontColor = ref('rgba(107,114,128,.3)');
    const markWord = ref('hellow world');
    const isLoading = ref(false);

    let WIDTH = ref<number>(330);
    let HEIGHT = ref<number>(330);

    const { pixelRatio } = getSystemInfoSync();
    let dpr: number = pixelRatio;

    const MAXSIZE: number = 330;

    const canvasCtx = {
      canvas: {},
      ctx: null
    };

    // const element = $ref<HTMLCanvasElement>()

    onMounted(() => {
      nextTick(async () => {
        isLoading.value = true;
        const result = await getCanvasCtx();
        // console.log(result);
        canvasCtx.canvas = result;
        canvasCtx.ctx = result.getContext('2d');

        wx.downloadFile({
          url: 'https://s2.loli.net/2022/04/25/hzqxS51GADXTeoK.jpg',
          success: (res) => {
            _getImageInfo(res.tempFilePath);
          }
        });
      });
    });

    const _getImageInfo = (imgPath) => {
      wx.getImageInfo({
        src: imgPath,
        success: (res) => {
          isLoading.value = true;
          onDrawCanvas(imgPath, res.width, res.height);
        }
      });
    };
    const onChooseImg = () => {
      wx.chooseImage({
        count: 1,
        sizeType: ['original'], //原图上传，不能压缩
        sourceType: ['album', 'camera'],
        success: (res) => {
          _getImageInfo(res.tempFilePaths[0]);
        }
      });
    };

    const getCanvasReact = async (imageWidth, imageHeight) => {
      // const canvas = canvasCtx.canvas;
      const ratio = imageWidth / imageHeight;

      // 循环让其能完全展示在MAXSIZE中
      while (imageWidth > MAXSIZE || imageHeight > MAXSIZE) {
        if (imageWidth > MAXSIZE) {
          imageWidth = MAXSIZE;
          imageHeight = MAXSIZE / ratio;
        } else if (imageHeight > MAXSIZE) {
          imageHeight = MAXSIZE;
          imageWidth = MAXSIZE * ratio;
        }
      }
      // 此处不知为何无法从proxy, ref中获取到width, height
      // 花费较长时间定位到此问题，目前先通过api获取
      const result = await getCanvasCtx();
      const _node = result;

      _node.width = dpr * imageWidth;
      _node.height = dpr * imageHeight;

      canvasCtx.ctx.scale(dpr, dpr);

      WIDTH.value = imageWidth;
      HEIGHT.value = imageHeight;

      return {
        imageWidth,
        imageHeight
      };
    };

    function _getLineWord(arr, word, _canvasWidth) {
      let lineWordNum = (_canvasWidth * dpr - 20) / 24;
      let wordLen = word.length;
      if (wordLen < lineWordNum) {
        arr.push(word);
        return arr;
      } else {
        arr.push(word.substr(0, lineWordNum));
        return _getLineWord(arr, word.substr(lineWordNum, wordLen), _canvasWidth);
      }
    }
    const _drawMark = (ctx, _canvasWidth, _canvasHeight) => {
      ctx.fillStyle = fontColor.value;
      ctx.font = 'normal bold 24rpx PingFangSC-Regular';

      if (!markWord.value) {
        ctx.shadowColor = '#2c3e50'; // 阴影颜色
        ctx.shadowOffsetX = 0; // 阴影x轴位移。正值向右，负值向左。
        ctx.shadowOffsetY = 0; // 阴影y轴位移。正值向下，负值向上。
        ctx.shadowBlur = 5; // 阴影模糊滤镜。数据越大，扩散程度越大。
        // 计算多行、每行字数
        // 利用反转从下往上
        const arr = _getLineWord([], new Date().toString(), _canvasWidth).reverse();
        // const arrLen = arr.length;
        arr.map((item, index) => {
          // 此处行高的计算待优化
          ctx.fillText(item, 10, _canvasHeight - 12 * (index + 1));
        });
      } else {
        // 画水印坐标计算
        const axisArr = [];
        for (let i = -_canvasWidth / 2; i < _canvasWidth; i += 80) {
          for (let k = -_canvasHeight / 2; k < _canvasHeight; k += 70) {
            axisArr.push([i, k]);
          }
        }
        ctx.translate(_canvasWidth / 2, _canvasHeight / 2);
        ctx.rotate((Math.PI * 20) / 180);

        axisArr.map((item) => {
          ctx.fillText(markWord.value, item[0], item[1]);
        });
      }
    };
    const onDrawCanvas = async (imgPath, imageWidth, imageHeight) => {
      const { imageWidth: _canvasWidth, imageHeight: _canvasHeight } = await getCanvasReact(
        imageWidth,
        imageHeight
      );

      const { ctx, canvas } = canvasCtx;
      const imageData = canvas.createImage();
      imageData.src = imgPath;
      imageData.onload = async () => {
        ctx.drawImage(imageData, 0, 0, _canvasWidth, _canvasHeight);
        _drawMark(ctx, _canvasWidth, _canvasHeight);

        // 安卓(测试华为机)一直报 canvasId do not exit
        // 回调解决，不知道原因
        // const result = await getCanvasCtx();
        // const { node: _node } = result[0];
        const _node = canvasCtx.canvas;
        wx.canvasToTempFilePath({
          // fileType: 'jpeg',
          canvas: _node,
          success: (res) => {
            weakImage = res.tempFilePath;
          },
          complete: () => {
            isLoading.value = false;
          }
        });
      };
    };

    const onSave = () => {
      if (!weakImage) return;
      saveImageToPhotosAlbum(weakImage);
    };

    return {
      colorArray,
      fontColor,
      isLoading,
      markWord,
      WIDTH,
      HEIGHT,

      onChooseImg,
      onSave
    };
  }
};
</script>

<template>
  <view class="content">
    <canvas
      type="2d"
      id="myCanvas"
      :style="{
        width: WIDTH + 'px',
        height: HEIGHT + 'px'
      }"
    />
  </view>

  <view class="footer">
    <view class="footer__sel flexbox">
      <view class="footer__sel-label">水印：</view>
      <nut-input v-model="markWord" class="mark__input" placeholder="请输入水印文字" />
    </view>

    <view class="footer__sel flexbox">
      <view class="footer__sel-label">颜色：</view>
      <nut-radiogroup v-model="fontColor" direction="horizontal" class="radio">
        <nut-radio v-for="item in colorArray" shape="button" :label="item.label" :key="item.title">
          {{ item.title }}
        </nut-radio>
      </nut-radiogroup>
    </view>

    <view class="footer__btn flexbox">
      <nut-button
        color="#252d3f"
        shape="square"
        plain
        class="footer__btn--default"
        @tap="onChooseImg()"
      >
        选择图片
      </nut-button>
      <nut-button color="#252d3f" shape="square" class="footer__btn--default" @tap="onSave()">
        保存到相册
      </nut-button>
    </view>
  </view>

  <nut-toast
    v-model:visible="isLoading"
    type="loading"
    icon="loading1"
    iconSize="16"
    bgColor="rgba(0, 0, 0, 0.5)"
    :duration="0"
  />
</template>

<style lang="scss">
.content {
  margin: 100px 20px 0 20px;
  padding: 20px;
  border-radius: 10px;
  border: 1px dashed $font-color;
  #myCanvas {
    margin: 0 auto;
  }
}
.nut-input {
  padding: 0;
}

.footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 160px;
  padding: 0 50px;
  background-color: #ffffff;
  .footer__sel {
    margin: 30px 0;
    .footer__sel-label {
      font-size: 28px;
      color: $font-color;
      flex: 0 0 150px;
    }
    .mark__input .input-text,
    .nut-input__text--readonly {
      text-align: right !important;
    }
  }

  .footer__btn {
    margin-top: 100px;
    justify-content: space-evenly;
    .footer__btn--default {
      height: 70px;
      padding: 0 30px;
      border-radius: 15px;
    }
  }
}

.radio {
  .nut-radio__button {
    box-sizing: border-box;
  }
  .nut-radio__button--active {
    border: none;
    color: $font-color;
    background-color: $bg-weak-color;
  }
}
</style>
