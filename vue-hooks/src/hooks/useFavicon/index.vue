<template>
  <div style="padding: 16px;">
    <span>{{ url }}</span>
    <div style="margin-top: 16px;">
      <el-button class="button1" @click="changeUrl('https://www.google.com/favicon.ico')">
        Change To Google favicon。
      </el-button>
      <el-button
        class="button2"
        style="margin-left: 8px;"
        @click="
          changeUrl(
            'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/packages/hooks/docs/public/logo.svg',
          )
        "
      >
        Change To VueHooks Plus favicon。
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import useFavicon from './index'
  
  const url = ref(
    'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/packages/hooks/docs/public/logo.svg',
  )

  const changeUrl = (_url: string) => {
    url.value = _url
  }

  useFavicon(url)
</script>
