

import plugPage from "@/components/plugins/plug-page/index.vue";
import plugImage from "@/components/plugins/plug-image/index.vue";
import plugSwiper from "@/components/plugins/plug-swiper/index.vue";
import plugButton from "@/components/plugins/plug-button/index.vue";
import plugText from "@/components/plugins/plug-text/index.vue";
import plugVideo from "@/components/plugins/plug-video/index.vue";
import plugBgAudio from "@/components/plugins/plug-bg-audio/index.vue";
import plugFormInput from "@/components/plugins/plug-form-input/index.vue";
import plugFormButton from "@/components/plugins/plug-form-button/index.vue";
import plugFormCheckbox from "@/components/plugins/plug-form-checkbox/index.vue";
import plugFormRadio from "@/components/plugins/plug-form-radio/index.vue";
import plugFormRate from "@/components/plugins/plug-form-rate/index.vue";
import plugFormDatetime from "@/components/plugins/plug-form-datetime/index.vue";
import plugFormArea from "@/components/plugins/plug-form-area/index.vue";
export default {
  components: {
    plugPage, plugImage, plugButton, plugVideo, plugBgAudio, plugSwiper, plugText,
    plugFormInput, plugFormButton, plugFormCheckbox, plugFormRadio, plugFormRate, plugFormDatetime, plugFormArea
  },
  data() {
    return {
      pluginList: [
        {
          title: '基础',
          children: [
            {
              name: 'plug-image',
              title: '图片',
              img: 'https://public.fanjinyan.com/weiye_default_img_squre.png',
              component: plugImage
            }, {
              name: 'plug-swiper',
              title: '轮播图',
              img: 'https://public.fanjinyan.com/weiye_default_slide_squre2.png',
              component: plugSwiper
            },
            {
              name: 'plug-text',
              title: '富文本',
              icon: 'fa fa-file-text-o',
              component: plugText
            },
            {
              name: 'plug-button',
              title: '按钮',
              icon: 'fa fa-hand-pointer-o',
              component: plugButton
            },
            {
              name: 'plug-video',
              title: '视频',
              icon: 'el-icon-video-camera',
              component: plugVideo
            },
            {
              name: 'plug-bg-audio',
              title: '音乐',
              icon: 'fa fa-music',
              component: plugBgAudio
            }
          ]
        },
        {
          title: '表单',
          children: [
            {
              name: 'plug-form-button',
              title: '提交按钮',
              icon: 'fa fa-send-o',
              component: plugFormButton
            },
            {
              name: 'plug-form-input',
              title: '文本框',
              icon: 'el-icon-edit',
              component: plugFormInput
            },
            {
              name: 'plug-form-radio',
              title: '单选框',
              icon: 'fa fa-dot-circle-o',
              component: plugFormRadio
            },
            {
              name: 'plug-form-checkbox',
              title: '多选框',
              icon: 'fa fa-check-square',
              component: plugFormCheckbox
            },
            {
              name: 'plug-form-datetime',
              title: '时间选择器',
              icon: 'el-icon-date',
              component: plugFormDatetime
            },
            {
              name: 'plug-form-area',
              title: '省市区选择',
              icon: 'el-icon-map-location',
              component: plugFormArea
            },
            {
              name: 'plug-form-rate',
              title: '评分',
              icon: 'fa fa-star-half-o',
              component: plugFormRate
            },
          ]
        },
        {
          title: '互动',
          children: [

          ]
        },
      ]
    }


  }
}