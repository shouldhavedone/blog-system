<template>
  <div class="app-container">
    <div class="header" :class="isDark ? 'dark' : ''">
      <div class="left">
        <el-input size="large" placeholder="输入文章标题..." v-model="formData.title"></el-input>
      </div>
      <div class="right">
        <el-button type="primary" plain @click="changeData">草稿箱</el-button>
        <el-popover :width="400" trigger="click" :visible="dialogVisible" placement="bottom-end"
          popper-class="article-dialog"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
          <template #reference>
            <el-button type="primary" @click.stop="changeVisiable(true)">发布</el-button>
          </template>
          <template #default>
            <ArticleDialog :data="formData" @submit="handleSubmit" @cancel="handleCancel" />
          </template>
        </el-popover>
      </div>
    </div>
    <div class="content">
      <MdEditor v-model="formData.content" :theme="isDark ? 'dark' : 'light'" />
    </div>
  </div>
</template>
<script lang="ts" setup>

import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import ArticleDialog from './articleDialog.vue';

import { ref } from 'vue'

import { addBlogArticle, getBlogArticleForm } from "@/api/blog/article";
import { useRoute, useRouter } from 'vue-router';
import { BlogArticleEdit } from '@/api/blog/article/types';

const route = useRoute()
const router = useRouter();

const dialogVisible = ref(false);

const changeVisiable = (value: boolean) => {
  dialogVisible.value = !dialogVisible.value;
};

const formData = ref<BlogArticleEdit>({
  title: "",
  content: "",
});

const isDark = useDark();

const changeData = () => {
  console.log(formData.value)
}

const handleCancel = () => {
  dialogVisible.value = false;
}

const handleSubmit = async (record: any) => {
  const params = {
    ...formData.value,
    ...record,
    status: 1,
  }
  const result = await addBlogArticle(params);
  console.log(result)
  if(result.data) {
    dialogVisible.value = false
    ElMessage.success("发布成功")
    router.replace("/blog/article")
  }
}

const getDetail = async (id: string) => {
  const result = await getBlogArticleForm(id);
  console.log(result)
  formData.value = result.data
}

onMounted(() => {
  const id = route.params.id
  id && getDetail(Array.isArray(id) ? id[0] : id);
})

</script>

<style lang="scss" scoped>
.app-container {
  .header {
    width: 100%;
    height: 54px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #fff;
    padding: 20px;

    .left {
      width: 80%;

      :deep(.el-input__wrapper) {
        box-shadow: none;
        font-size: 20px;

        .el-input__inner {
          color: #000;
        }
      }
    }

    &.dark {
      background-color: #000;

      .left {
        :deep(.el-input__wrapper) {
          .el-input__inner {
            color: #fff;
          }
        }
      }
    }
  }

  .content {
    width: 100%;

    :deep(.md-editor) {
      height: 780px;

      .md-editor-icon {
        fill: currentColor;

      }
    }
  }
}
</style>

<style lang="scss">
.article-dialog {
  padding: 0 !important;
}
</style>