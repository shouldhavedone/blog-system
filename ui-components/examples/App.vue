<template>
  <div id="app">
    <a-layout has-sider>
      <a-layout-sider theme="light">
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
          <a-menu-item-group :key="key" :title="components[key].name" v-for="key in Object.keys(components)">
            <a-menu-item v-for="key1 in Object.keys(components[key].data)" :key="components[key].data[key1].path">
              <router-link :to="components[key].data[key1].path"><span class="nav-text">{{
          components[key].data[key1].name
        }}</span></router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <a-card :title="title">
          <a-config-provider :locale="zhCN" :transformCellText="({ text }) => {
          return Array.isArray(text)
            ? text.length > 0 && text || '--'
            : text || '--'
        }">
            <router-view></router-view>
          </a-config-provider>
        </a-card>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
  name: "App",
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();

    const selectedKeys = computed(() => [route.path]);
    const title = computed(() => route.name);

    const components = computed(() => {
      const obj = {};

      const routes = router.options.routes;
      const arr = [];
      routes.map((item) => item.key && arr.push(item.key));
      const keys = [...new Set(arr)];

      keys.map((key) => {
        const data = routes.filter((item) => item.key === key);
        obj[key] = {
          name: data[0].keyName,
          data,
        };
      });

      return obj;
    });

    return {
      selectedKeys,
      components,
      title,
      zhCN
    };
  },
};
</script>
