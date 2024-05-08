<template>
  <a-row justify="space-btween" :gutter="20">
    <a-col :span="24">
      <content-component>
        <template #componentDesc>
          <p>表单</p>
        </template>

        <template #contentComponent>
          <demo></demo>
        </template>

      </content-component>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import Demo from './demo/index.vue'

</script>

<style lang="less" scoped>
  
</style>