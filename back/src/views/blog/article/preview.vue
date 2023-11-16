<template>
  <div class="app-container">
    <div class="article-wrapper fixed-width" :class="isDark ? 'dark' : ''">
      <div class="header ">
        <h1 class="title">{{ articleDetail?.title }}</h1>
        <div class="base-info">
          <time>{{ articleDetail?.updateTime }}</time>
          <span>
            <svg-icon icon-class="eye-open" />
            <span class="view">{{ articleDetail?.view || 0 }}</span>
          </span>
        </div>
      </div>

      <div class="content">
        <MdPreview :editorId="`preview-only-${articleDetail?.id}`" :modelValue="articleDetail?.content"
          :theme="isDark ? 'dark' : 'light'" />
      </div>
    </div>
    <div class="article-right">
      <div class="menu">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="目录" name="menu">
            <a :href="`#${item.text}`" class="menu-item" v-for="item in contentMenu">{{ item.text }}</a>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { MdPreview } from 'md-editor-v3';
import { useRoute } from 'vue-router';
import { getBlogArticleForm } from "@/api/blog/article";
import { BlogArticleEdit } from '@/api/blog/article/types';

interface IContentMenu { level: number; text: string }

const route = useRoute()

const activeName = ref('menu')

const articleDetail = ref<BlogArticleEdit>();

const isDark = useDark();

const contentMenu = ref<IContentMenu[]>()


const getDetail = async (id: string) => {
  const result = await getBlogArticleForm(id);
  articleDetail.value = result.data
  contentMenu.value = generateMarkdownTOC(result.data.content || '');
  console.log(contentMenu.value)
}

/**
 * 解析目录 
 * @param markdownText 
 */
const generateMarkdownTOC = (markdownText: string) => {
  const headings: IContentMenu[] = [];
  const lines = markdownText.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s*/, '');
      headings.push({ level, text });
    }
  }
  if (headings.length === 0) {
    console.log('No headings found in the Markdown document.');
    return;
  }
  return headings
}

onMounted(() => {
  const id = route.params.id
  id && getDetail(Array.isArray(id) ? id[0] : id);
})

</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  justify-content: center;
  height: 100%;
}

.article-wrapper {
  position: relative;
  margin: 0 20px;
  padding: 32px;
  z-index: 1;
  overflow: hidden;
  border-radius: 4px;
  background: #fff;


  &.dark {
    background: #000;
  }

  .header {
    .title {
      margin: 0 0 20px;
      font-size: 30px;
      font-weight: 600;
    }

    .base-info {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      font-size: 14px;
      color: #8a919f;
      line-height: 22px;

      time {
        margin-right: 16px;
        white-space: 1px;
      }

      .view {
        margin-left: 6px;
      }
    }
  }

  .content {
    word-break: break-word;
    line-height: 1.75;
    font-weight: 400;
    font-size: 16px;
    overflow-x: hidden;

    img {
      max-width: 100% !important;
    }
  }
}

.article-right {
  width: 240px;
  height: 100%;

  .menu {
    position: sticky;
    top: 0;
    width: 240px;

    .menu-item {
      display: block;
    }
  }
}

.fixed-width {
  width: 820px;
}
</style>

<style lang="scss">
.medium-zoom-image {
  z-index: 9999;
  max-width: 100%;
  height: auto;
}
</style>