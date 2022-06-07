<script lang="ts">
import { ref, reactive, readonly, computed } from 'vue'
// import { Dialog as nutDialog, OverLay } from '@nutui/nutui-taro'
import cookJson from './cook.json'

import { VEGETABLE_ARRAY, MEAT_ARRAY } from './stuff'

export default {
  setup() {
    const vegetableArray = readonly(reactive(VEGETABLE_ARRAY))
    const meatArray = readonly(reactive(MEAT_ARRAY))

    //
    const cookSet = reactive(new Set<string>())
    // 当前材料
    const curStuff = computed(() => Array.from(cookSet))
    // 当前菜谱
    const curRecipe = ref(cookJson)

    const visible = ref(false)
    const visibleRecipe = ref({})

    // 食材变化
    const onChangeStuff = (value) => {
      if (cookSet.has(value)) {
        cookSet.delete(value)
      } else {
        cookSet.add(value)
      }
      onCook()
    }

    // 菜谱变化
    const onCook = () => {
      curRecipe.value = cookJson.filter((item) => {
        return curStuff.value.every((stuff) => item.stuff.includes(stuff))
      })

      if (curRecipe.value.length === 0) {
        curRecipe.value = [{ name: '建议铁锅炖自己～', link: '0', stuff: [] }]
      }
    }

    // 选择菜谱
    const onSelectRecipe = (value) => {
      if (value.link == 0) return

      visible.value = true
      visibleRecipe.value = value
      wx.setClipboardData({
        data: `https://www.bilibili.com/video/${value.link}`,
        success: () => {
          wx.showToast({
            title: `今天恰${value.name}～`,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }

    return {
      vegetableArray,
      meatArray,
      onChangeStuff,
      curStuff,
      curRecipe,
      visible,
      visibleRecipe,
      onSelectRecipe
    }
  }
}
</script>

<template>
  <div class="cook">
    <div class="panel">
      <p class="title">蔬菜 🥬</p>

      <i
        v-for="vegetable in vegetableArray"
        :key="vegetable.name"
        :class="['tag', 'vegetable', { vegActive: curStuff.includes(vegetable.name) }]"
        @tap="onChangeStuff(vegetable.name)"
      >
        {{ vegetable.name }} {{ vegetable.image }}
      </i>
    </div>

    <div class="panel">
      <p class="title">肉 🥩</p>
      <i
        v-for="meat in meatArray"
        :key="meat.name"
        :class="['tag', 'meat', { meatActive: curStuff.includes(meat.name) }]"
        @tap="onChangeStuff(meat.name)"
      >
        {{ meat.name }} {{ meat.image }}
      </i>
    </div>

    <div class="panel">
      <p class="title">🍲</p>
      <!-- <div>{{ curStuff }}</div> -->
      <!-- <div>{{ curRecipe }}</div> -->
      <i
        class="tag recipe"
        v-for="recipe in curRecipe"
        :key="recipe.link"
        @tap="onSelectRecipe(recipe)"
      >
        {{ recipe.name }}
      </i>
    </div>
    <nut-dialog
      :title="visibleRecipe?.name"
      content="已复制视频地址，请打开bilibili或浏览器开始你的美食表演～"
      v-model:visible="visible"
      no-cancel-btn
      ok-text="知道了"
    ></nut-dialog>
  </div>
</template>

<style lang="scss">
page {
  height: 100%;
}
.cook {
  background-color: #000000;
  min-height: 100%;
  color: #ffffff;
  font-size: 28px;
  padding: 0 20px;
}
.panel {
  text-align: center;
  padding: 30px 0;
  .title {
    font-size: 30px;
    margin-bottom: 20px;
  }
}
.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  margin: 8px;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  color: #ffffff;
}
.vegetable {
  background-color: rgba(134, 239, 172, 0.2);
  border-color: rgba(22, 101, 52, 1);
}
.vegActive {
  background-color: rgba(134, 239, 172, 0.7);
}
.meat {
  background-color: rgba(224, 38, 38, 0.4);
  border-color: rgba(224, 38, 38, 1);
}
.meatActive {
  background-color: rgba(224, 38, 38, 0.8);
}

.recipe {
  background-color: rgba(30, 64, 175, 0.4);
  border-color: rgba(30, 64, 175, 1);
}

.nut-dialog__header {
  height: auto;
}
</style>
