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
            <el-button type="primary" @click="changeVisiable(true)">发布</el-button>
          </template>
          <template #default>
            <ArticleDialog @submit="handleSubmit" @cancel="handleCancel" />
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

import { reactive, ref } from 'vue'

const dialogVisible = ref(false);

const changeVisiable = (value: boolean) => {
  dialogVisible.value = !dialogVisible.value;
};

const formData = ref({
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

const handleSubmit = (record: any) => {
  console.log(record)
  console.log(formData.value)
}

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