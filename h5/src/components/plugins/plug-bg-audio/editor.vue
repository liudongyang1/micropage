<template>
  <div>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px">
      <el-form-item label="上传mp3:" required>
        <imgEditor
          v-model:imgUrl="element.props.audioUrl"
          :sourceType="3"
        ></imgEditor>
      </el-form-item>
      <el-form-item label="自动播放:">
        <el-switch v-model="element.props.autoplay" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElDivider,
  ElSwitch,
} from "element-plus";
import imgEditor from "../commonProps/imgEditor.vue";
export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
    imgEditor,
    ElSwitch,
  },
  props: ["element"],
  setup(props, ctx) {
    return {};
  },
});
</script>
<style lang='less' scoped>
</style>