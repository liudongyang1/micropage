<template>
  <div
    :class="{ work_app: true, swiper_app: work.page_type == 2 }"
    :style="'height:' + pxToRem(pageHeight)"
  >
    <!-- 多页 -->
    <swiper
      class="swiper"
      :slides-per-view="1"
      :space-between="0"
      direction="vertical"
      :pagination="{ clickable: true }"
      v-if="work.page_type == 2"
    >
      <swiper-slide
        class="swiper-item"
        v-for="page in work.pages"
        :key="page.ukey"
      >
        <div
          v-for="item in page.elements"
          :key="item.ukey"
          :style="getElementStyle(item.style, true)"
        >
          <animation :element="item" v-if="!item.props.hide">
            <element :element="item"></element
          ></animation></div
      ></swiper-slide>
    </swiper>
    <!-- 单页 -->
    <template v-for="page in work.pages" v-else>
      <div
        v-for="item in page.elements"
        :key="item.ukey"
        :style="getElementStyle(item.style, true)"
      >
        <animation :element="item" v-if="!item.props.hide">
          <element :element="item"></element
        ></animation>
      </div>
    </template>
    <div class="mode_tips" v-if="mode == 'preview'">预览模式</div>
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  nextTick,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import element from "@/components/plugins/element.vue";
import animation from "@/components/common/animation.vue";
import { getElementStyle, pxToRem } from "@/utils/element";
import { getWorkPreview, getWorkDetail } from "@/api/works";
import { Toast } from "vant";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Pagination]);
import { useWindowSize } from "@vant/use";
export default defineComponent({
  props: ["workId", "mode"],
  components: {
    element,
    animation,
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    const router = useRouter();
    const pcUrl = ref("");
    const isLoading = ref(true);
    const work: any = reactive({});
    const pageHeight = ref(667);
    const { width, height } = useWindowSize();
    //监听页面尺寸变动 调整rem
    watch(width, () => {
      Resize();
      console.log("window resized");
    });
    //获取作品详情
    async function fetchWorkInfo() {
      isLoading.value = true;
      let res = null;
      if (props.mode == "preview") {
        res = await getWorkPreview({ work_id: props.workId });
      } else {
        res = await getWorkDetail({ work_id: props.workId });
      }
      if (res && res.code == 0) {
        if (typeof window.parent.getWorkInfo == "function") {
          window.parent.getWorkInfo(res.property); //不用localstorage，直接调用父窗口的方法，是考虑到后期可能不同源的情况
        }
        Object.assign(work, res.property);
        if (work && work.pages && work.pages.length > 0) {
          pageHeight.value = work.pages[0].elements[0].props.pageHeight;
        }
      } else {
        Toast(res.message);
      }
      isLoading.value = false;
    }
    function Resize() {
      document.documentElement.style.fontSize =
        document.documentElement.clientWidth / 3.75 + "px";
    }
    onMounted(async () => {
      let width = document.body.offsetWidth;
      pcUrl.value = "/pcviewer/" + props.workId;
      if (props.mode) {
        pcUrl.value = pcUrl.value + "/" + props.mode;
      }
      if (width > 750) {
        // router.replace({
        //   path: pcUrl.value,
        // });
      }
      await fetchWorkInfo();
      await nextTick();
      Resize();

      //监听单页面的动画滚动
      if (work.page_type == 2) return;
      var animElements =
        Array.from(document.querySelectorAll(".animCan")) || [];
      if (animElements.length > 0) {
        handleScroll();
        window.addEventListener("scroll", scrollEvent, false);
      }
      function scrollEvent() {
        throttle(handleScroll);
      }
      function handleScroll() {
        animElements = Array.from(document.querySelectorAll(".animCan"));
        //没有动画元素时，移除滚动事件
        if (animElements.length == 0) {
          window.removeEventListener("scroll", scrollEvent);
        }
        for (var i = 0; i < animElements.length; i++) {
          var elem = animElements[i];
          if (isElemVisible(elem)) {
            elem.classList.remove("animCan");
          }
        }
      }
      function isElemVisible(el) {
        let s = el.parentNode.offsetTop; // 元素相对于页面顶部的距离
        let x = el.parentNode.offsetHeight; //元素自身高度
        let t = window.pageYOffset; // 页面在垂直方向上滚动的距离
        let y = window.innerHeight; //窗口可视区域的高度
        let isHidden = s + x < t || s > t + y;
        return !isHidden;
      }
      //节流函数
      function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
          method.call(context);
        }, 200);
      }
    });
    return { pageHeight, pcUrl, pxToRem, work, getElementStyle };
  },
});
</script>
<style lang='less' scoped>
.work_app {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}
.swiper_app {
  max-height: 100vh;
}
.mode_tips {
  position: fixed;
  z-index: 500;
  top: 15px;
  right: 15px;
  color: #fff;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 13px;
  padding: 5px 10px;
}

.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide-active .animCan {
  animation-play-state: running;
}
</style>