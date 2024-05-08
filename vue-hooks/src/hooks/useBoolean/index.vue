<template>
  <div>
    <div>{{ flag }}</div>
    <br />
    <div>
      <p>
        <el-button @click="() => set(!flag)">Set</el-button>
        <el-button @click="() => toggle()">toggle</el-button>
        <el-button style="margin-left: 8px" @click="() => setTrue()">SetTrue</el-button>
        <el-button style="margin-left: 8px" @click="() => setFalse()">SetFalse</el-button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useBoolean from './index'
const [flag, { toggle, set, setFalse, setTrue }] = useBoolean(true)
</script>
