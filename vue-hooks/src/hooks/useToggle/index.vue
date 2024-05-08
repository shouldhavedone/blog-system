<template>
  <div>
    <div>{{ flag }}</div>
    <br>
    <div>
      <p>
        <el-button style="margin-left: 16px" @click="() => toggle()">toggle</el-button>
        <el-button style="margin-left: 16px" @click="() => set('Hello')">set Hello</el-button>
        <el-button style="margin-left: 16px" @click="() => set('Vue-hooks-plus')">setvue-hooks-plus</el-button>
        <el-button style="margin-left: 16px" @click="() => setRight()">setRight</el-button>
        <el-button style="margin-left: 16px" @click="() => setLeft()">setLeft</el-button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useToggle from './index'

const [flag, { toggle, set, setLeft, setRight }] = useToggle('Hello', 'Vue-hooks-plus')
</script>
