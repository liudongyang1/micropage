<template>
  <div
    :class="{ 'animation-box': true, animCan: hasAnimate }"
    :style="curAnimate"
    ref="animationBox"
    @click.stop="onClickEvent"
  >
    <slot></slot>
    <van-popup
      teleport="#app"
      v-if="element.props.clickType == 3"
      v-model:show="show"
      round
      :style="{
        width: '80%',
        minHeight: '30%',
        maxHeight: '80%',
        padding: '16px 0',
        display: 'flex',
      }"
      ><div class="text">{{ element.props.clickContent }}</div></van-popup
    >
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, onMounted } from "vue";
import { Toast, Popup } from "vant";
export default defineComponent({
  props: ["element"],
  components: {
    [Popup.name]: Popup,
  },
  setup(props) {
    const animationBox = ref(null);
    const curAnimate = ref({});
    const hasAnimate = ref(false);
    const show = ref(false);
    let index = 0;
    let anis = [];
    // //播放一个动画
    function playAnimation(item: any) {
      curAnimate.value = {
        display: "none",
      };
      let animationStyle = {
        animationName: item.classname,
        animationDuration: `${item.duration}s`,
        animationIterationCount: item.infinite ? "infinite" : item.count,
        animationDelay: `${item.delay}s`,
        animationFillMode: "both",
        display: "block",
      };
      setTimeout(() => {
        curAnimate.value = animationStyle;
      }, 10);
    }
    //触发 在属性面板设置的点击事件
    function onClickEvent() {
      if (props.element.props.clickType && props.element.props.clickContent) {
        let clickType = props.element.props.clickType;
        let clickContent = props.element.props.clickContent;
        switch (clickType) {
          case 1:
            window.location.href = clickContent;
            break;
          case 2:
            Toast(clickContent);
            break;
          case 3:
            show.value = true;
            break;
          default:
            break;
        }
      }
    }
    onMounted(() => {
      anis = props.element.animations;
      if (anis && anis.length > 0) {
        hasAnimate.value = true;
        index = 0;
        playAnimation(anis[0]);
        //监听顺序播放动画
        animationBox.value.addEventListener("animationend", function () {
          if (anis.length > index + 1) {
            index++;
            playAnimation(anis[index]);
          } else if (anis.length == index + 1) {
            index = 0;
            //动画播放完毕，清空状态
            curAnimate.value = {};
          }
        });
      }
    });

    return {
      hasAnimate,
      animationBox,
      curAnimate,
      playAnimation,
      onClickEvent,
      show,
    };
  },
});
</script>
<style lang='less' scoped>
.animation-box {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}
.animCan {
  animation-play-state: paused;
}
.text {
  padding: 0 16px;
  word-break: break-all;
  white-space: pre-line;
  flex: 1;
  overflow-y: auto;
}
</style>