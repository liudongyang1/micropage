<template>
  <master defaultActive="/formdata">
    <div class="detail_top">
      <div class="title">
        <i class="el-icon-place"></i>&ensp;<strong>作品名称：</strong
        ><el-link :href="'/pcviewer/' + workId" target="_blank">{{
          work.title
        }}</el-link>
      </div>
      <el-button type="primary" plain size="mini" @click="onExport"
        >导出EXCEL</el-button
      >
    </div>
    <div class="content">
      <el-table :data="dataList" style="width: 100%">
        <el-table-column
          v-for="(item, key) in formHeader"
          :key="key"
          :prop="key"
          :label="item"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="create_at" label="创建时间" align="center">
          <template #default="scope">
            {{ formatDate(scope.row.create_at) }}
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.totalCount"
          :pageSize="page.pageSize"
          :current-page="page.currentPage"
          @current-change="fetchDataList"
          :hide-on-single-page="true"
        >
        </el-pagination>
      </div>
    </div>
  </master>
</template>
<script lang="ts">
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  ElLink,
} from "element-plus";
import master from "@/components/common/master.vue";
import { defineComponent, reactive } from "vue";
import { getFormDataByWork, exportFormByWork } from "@/api/form";
import { formatDate } from "@/utils/index";
export default defineComponent({
  props: ["workId"],
  components: {
    master,
    ElButton,
    ElTable,
    ElTableColumn,
    ElTag,
    ElPagination,
    ElLink,
  },
  setup(props) {
    const dataList = reactive([]);
    const work = reactive({});
    const page = reactive({
      totalCount: 0,
      totalPage: 1,
      pageSize: 10,
      currentPage: 0,
    }); //分页数据
    const formHeader = reactive({});
    //获取数据
    async function fetchDataList(pageIndex?: number) {
      let params = {
        work_id: props.workId,
        pageSize: page.pageSize,
        pageIndex: 1,
      };
      if (pageIndex) params.pageIndex = pageIndex;
      const res = await getFormDataByWork(params);
      if (res && res.code == 0) {
        Object.assign(formHeader, res.ukeyName);
        dataList.length = 0;
        dataList.push(...res.data);
        Object.assign(page, res.page); //重置页码信息
        Object.assign(work, res.work);
      }
    }
    //导出数据
    async function onExport() {
      exportFormByWork({ work_id: props.workId })
        .then((res) => {
          if (!res) return;
          let blob = new Blob([res], {
            type: "application/vnd.ms-excel;charset=utf-8",
          });
          let url = window.URL.createObjectURL(blob);
          let aLink = document.createElement("a");
          aLink.style.display = "none";
          aLink.href = url;
          let filename = `${work.title}--${props.workId}--${formatDate(
            new Date().getTime(),
            "yyyyMMdd"
          )}.xlsx`;
          aLink.setAttribute("download", filename);
          document.body.appendChild(aLink);
          aLink.click();
          document.body.removeChild(aLink);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchDataList(); //进入页面先获取数据
    return {
      work,
      dataList,
      formHeader,
      page,
      formatDate,
      fetchDataList,
      onExport,
    };
  },
});
</script>
<style lang="less"  scoped>
.detail_top {
  background: #fff;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content {
  margin: 20px;
  background: #fff;
  min-height: calc(100% - 40px);
  border-radius: 5px;
  padding: 20px;
}
.img {
  max-height: 100px;
  max-width: 100px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    padding: 0 5px;
  }
}
.pages {
  padding: 30px 20px;
  display: flex;
  justify-content: center;
}
</style>