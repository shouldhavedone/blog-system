<template>
  <div class="article-container el-dialog">
    <header class="el-dialog__header">
      <span class="el-dialog__title">发布文章</span>
    </header>
    <div class="el-dialog__body">
      <el-form ref="formRef" :model="form" label-width="96px" :rules="rules">
        <el-form-item label="标签：" prop="tags">
          <el-select v-model="form.tags" placeholder="选择标签" multiple>
            <el-option v-for="item in tagOptions" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面：" prop="imgUrl">
          <el-upload class="avatar-uploader" :http-request="customRequest" :show-file-list="false"
            :before-upload="beforerUpload">
            <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />

            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入"
            maxlength="100" />
        </el-form-item>
      </el-form>
    </div>
    <div class="el-dialog__footer">
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';

import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { FormInstance, UploadProps, UploadRequestOptions } from 'element-plus'
import { listTagOptions } from '@/api/blog/tag';
import { uploadFileApi } from '@/api/file';
import { BlogTagOption } from '@/api/blog/tag/types'
import { BlogArticleEdit } from '@/api/blog/article/types'

const emits = defineEmits(["cancel", "submit"])

interface IProps {
  data: BlogArticleEdit
}

const props = defineProps<IProps>()

const formRef = ref<FormInstance>()

const tagOptions = ref<BlogTagOption[]>([])

const beforerUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const form = reactive<BlogArticleEdit>({
  tags: '',
  desc: '',
  imgUrl: '',
})

const rules = reactive({
  tags: [{ required: true, message: "请选择标签", trigger: "change" }],
  desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
  imgUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
});

const getTagOption = async () => {
  const res = await listTagOptions()
  tagOptions.value = res.data;
}

/**
 * 发布
 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  emits("submit", form)
}

/**
 * 取消发布
 */
const handleCancel = () => {
  emits("cancel")
}

/**
 * 文件上传
 */

const customRequest = async (options: UploadRequestOptions) => {
  const result = await uploadFileApi(options.file)
  form.imgUrl = result.data.url
}

onMounted(() => {
  getTagOption()
})

watch(() => props.data, () => {
  form.tags = props.data.tags
  form.desc = props.data.desc
  form.imgUrl = props.data.imgUrl
})

</script>

<style lang="scss" scoped>
.article-dialog {
  background-color: #fff !important;
}

.article-container.el-dialog {
  margin: 0;
  width: auto;
  box-shadow: none;

  .el-dialog__header {
    margin-right: 0;
    border-bottom: 1px solid #666;
  }

  .el-dialog__footer {
    border-top: 1px solid #666;
  }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
