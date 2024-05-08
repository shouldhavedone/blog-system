<template>
  <div>title：useTitle</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useTitle from './index'

const title = ref('hello useTitle')

useTitle(title)

</script>
