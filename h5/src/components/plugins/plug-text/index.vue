<template>
  <div v-html="props.text" class="text"></div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: ["props", "workMode"],
  name: "plug-text",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 375,
      height: 300,
      top: 100,
      left: 0,
      backgroundColor: "rgba(255,255,255,0)",
      borderRadius: 3,
      borderColor: "#fff",
      borderWidth: 0,
      padding: 10,
    },
    props: {
      text: "富文本内容编辑区域，请在属性面板中编辑内容。",
    },
  },
  setup(props) {},
});
</script>
<style lang='less' scoped>
.text {
  word-break: break-all;
}
</style>