<script setup lang="ts">
defineOptions({
  name: "BlogTag",
  inheritAttrs: false,
});

import {
  listBlogTags,
  updateBlogTag,
  getBlogTagForm,
  addBlogTag,
  deleteBlogTag,
} from "@/api/blog/tag";

import { BlogTagPageVO, BlogTagForm, BlogTagQuery } from "@/api/role/types";

const queryFormRef = ref(ElForm);
const roleFormRef = ref(ElForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<BlogTagQuery>({
  pageNum: 1,
  pageSize: 10,
});

const roleList = ref<BlogTagPageVO[]>();

const dialog = reactive<DialogOption>({
  visible: false,
});

const formData = reactive<BlogTagForm>({
  status: 1,
  desc: "",
  name: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入标签名称", trigger: "blur" }],
  desc: [{ required: true, message: "请输入标签描述", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "blur" }],
});


interface CheckedBlogTag {
  id?: number;
  name?: string;
  desc?:string;
}

/**
 * 查询
 */
function handleQuery() {
  loading.value = true;
  listBlogTags(queryParams)
    .then(({ data }) => {
      roleList.value = data.list;
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
 * 打开标签表单弹窗
 *
 * @param roleId
 */
function openDialog(roleId?: number) {
  dialog.visible = true;
  if (roleId) {
    dialog.title = "修改标签";
    getBlogTagForm(roleId).then(({ data }) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增标签";
  }
}

/**
 * 标签表单提交
 */
function handleSubmit() {
  loading.value = true;
  roleFormRef.value.validate((valid: any) => {
    if (valid) {
      const roleId = formData.id;
      if (roleId) {
        updateBlogTag(roleId, formData)
          .then(() => {
            ElMessage.success("修改成功");
            closeDialog();
            resetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        addBlogTag(formData)
          .then(() => {
            ElMessage.success("新增成功");
            closeDialog();
            resetQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
  });
}

/**
 * 关闭弹窗
 */
function closeDialog() {
  dialog.visible = false;
  resetForm();
}

/**
 * 重置表单
 */
function resetForm() {
  roleFormRef.value.resetFields();
  roleFormRef.value.clearValidate();

  formData.id = undefined;
  formData.status = 1;
}

/**
 * 删除
 */
function handleDelete(roleId?: number) {
  const roleIds = [roleId || ids.value].join(",");
  if (!roleIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    deleteBlogTag(roleIds)
      .then(() => {
        ElMessage.success("删除成功");
        resetQuery();
      })
      .finally(() => (loading.value = false));
  });
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

        <el-form-item>
          <el-button type="primary" @click="handleQuery"><i-ep-search />搜索</el-button>
          <el-button @click="resetQuery"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <template #header>
        <el-button type="success" @click="openDialog()"><i-ep-plus />新增</el-button>
        <el-button type="danger" :disabled="ids.length === 0" @click="handleDelete()"><i-ep-delete />删除</el-button>
      </template>

      <el-table ref="dataTableRef" v-loading="loading" :data="roleList" highlight-current-row border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="文章标题" prop="name" min-width="200" />
        <el-table-column label="描述" prop="desc" min-width="400" />
        <el-table-column label="标签" prop="desc" min-width="200" />
        <el-table-column label="阅读量" prop="views" min-width="100" />
        <el-table-column label="点赞量" prop="likes" min-width="100" />
        <el-table-column label="创建时间" prop="createTime" min-width="200" />
        <el-table-column label="更新时间" prop="updateTime" min-width="200" />
        <el-table-column label="状态" align="center" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button type="primary" size="small" link @click="openDialog(scope.row.id)">
              <i-ep-edit />编辑
            </el-button>
            <el-button type="primary" size="small" link @click="handleDelete(scope.row.id)">
              <i-ep-delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
    </el-card>

    <!-- 标签表单弹窗 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" @close="closeDialog">
      <el-form ref="roleFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入标签名称" />
        </el-form-item>

        <el-form-item label="描述" prop="desc">
          <el-input v-model="formData.desc" :rows="2" type="textarea" placeholder="请输入标签描述" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
