<script setup lang="ts">
import {
  getBlogArticlePage,
  deleteBlogArticle,
  updateStatus,
} from "@/api/blog/article";

import { BlogArticlePageVO, BlogArticleQuery } from "@/api/blog/article/types";
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()

const queryFormRef = ref(ElForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<BlogArticleQuery>({
  pageNum: 1,
  pageSize: 10,
});

const articleList = ref<BlogArticlePageVO[]>();

/**
 * 查询
 */
function handleQuery() {
  loading.value = true;
  getBlogArticlePage(queryParams)
    .then(({ data }) => {
      articleList.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}
/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/**
 * 行checkbox change事件
 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/**
 * 跳转编辑文章
 *
 * @param id
 */
const goDetail = (id: number) => {
  router.push({
    name: `/blog/article/edit/:id`,
    params: {
      id
    }
  })
}

/**
 * 跳转预览文章
 *
 * @param id
 */
const previewArticle = (id: number) => {
  router.push({
    name: `/blog/article/preview/:id`,
    params: {
      id
    }
  })
}

/**
 * 新增文章
 */
const addArticle = () => {
  router.push({
    path: `/blog/article/add`,
  })
}

/**
 * 删除
 */
const handleDelete = (currId?: number) => {
  const currIds = [currId || ids.value].join(",");
  if (!currIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    deleteBlogArticle(currIds)
      .then(() => {
        ElMessage.success("删除成功");
        resetQuery();
      })
      .finally(() => (loading.value = false));
  });
}

/**
 * 文章状态
 */
const withdrawArticle = (id: number, status: number) => {
  ElMessageBox.confirm(`确认${status === 1 ? "发布" : "撤回"}已选中的数据项?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    await updateStatus(id, status)
    ElMessage.success(`${status === 1 ? "发布" : "撤回"}成功`);
    resetQuery();
  })
}

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <div class="search">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="keywords" label="关键字">
          <el-input v-model="queryParams.keywords" placeholder="文章名称" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 200px">
            <el-option label="发布" :value="1" />
            <el-option label="撤回" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery"><i-ep-search />搜索</el-button>
          <el-button @click="resetQuery"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card shadow="never">
      <template #header>
        <el-space wrap>
          <el-button type="success" @click="addArticle()"><i-ep-plus />新增</el-button>
          <el-dropdown trigger="click">
            <el-button type="primary" :disabled="ids.length === 0">
              批量操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>撤回</el-dropdown-item>
                <el-dropdown-item>发布</el-dropdown-item>
                <el-dropdown-item @click="handleDelete()">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-space>
      </template>
      <el-table ref="dataTableRef" v-loading="loading" :data="articleList" highlight-current-row border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="文章标题" prop="title" min-width="150" />
        <el-table-column label="描述" prop="desc" min-width="300" />
        <el-table-column label="阅读量" prop="views" min-width="100" />
        <el-table-column label="点赞量" prop="likes" min-width="100" />
        <el-table-column label="标签" prop="tags" min-width="200">
          <template #default="scope">
            <el-tag v-for="item in scope.row.tags.split(',')">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="200" />
        <el-table-column label="更新时间" prop="updateTime" min-width="200" />
        <el-table-column label="状态" align="center" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">发布</el-tag>
            <el-tag v-else type="info">草稿</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220" align="center">
          <template #default="scope">
            <el-button v-if="scope.row.status === 1" type="primary" size="small" link
              @click="withdrawArticle(scope.row.id, 2)">
              <i-ep-edit />撤回
            </el-button>
            <el-button v-if="scope.row.status === 2" type="primary" size="small" link
              @click="withdrawArticle(scope.row.id, 1)">
              <i-ep-edit />发布
            </el-button>
            <el-button type="primary" size="small" link @click="previewArticle(scope.row.id)">
              <i-ep-edit />预览
            </el-button>
            <template v-if="scope.row.status !== 1">
              <el-button type="primary" size="small" link @click="goDetail(scope.row.id)">
                <i-ep-edit />编辑
              </el-button>
              <el-button type="primary" size="small" link @click="handleDelete(scope.row.id)">
                <i-ep-delete />删除
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
    </el-card>
  </div>
</template>
