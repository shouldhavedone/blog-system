<template>
  <div class="content">
    <div class="left">
      <a-card title="代码演示" class="content-card">
        <div class="padding-rl-24">
          <slot name="contentComponent"></slot>
        </div>
        <a-divider origentation="left">代码展示</a-divider>

        <div class="padding-rl-24">
          <slot name="componentDesc"></slot>
        </div>
        <a-divider dashed />
        <div class="icons">
          <a-tooltip title="关闭代码显示" v-if="showCode">
            <img alt="expand code" src="https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg"
              @click="handleShowCode">
          </a-tooltip>
          <a-tooltip title="展开代码显示" v-else>
            <img alt="expand code" src="https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg"
              @click="handleShowCode">
          </a-tooltip>
        </div>
        <div class="code padding-rl-24" v-if="showCode">
          <slot name="componentCode" />
        </div>
      </a-card>
    </div>

    <div class="right">
      <slot name="content-right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AdvancedContent",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
const showCode = ref<boolean>(false);

const handleShowCode = () => showCode.value = !showCode.value;

</script>

<style lang="less" scoped>
.content {
  .content-card {
    :deep(.ant-card-body) {
      padding: 24px 0;
    }
  }

  .icons {
    text-align: center;

    img {
      width: 20px;
      height: 20px;
      opacity: .55;
      margin-left: 5px;
    }
  }

  .padding-rl-24 {
    padding: 0 24px;
  }

  &+.content {
    margin-top: 20px;
  }
}
</style>