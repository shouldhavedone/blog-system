<script lang="ts">
export default { name: "Dashboard" };
</script>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { useTransition, TransitionPresets } from "@vueuse/core";

import GithubCorner from "@/components/GithubCorner/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import BarChart from "./components/BarChart.vue";
import PieChart from "./components/PieChart.vue";
import RadarChart from "./components/RadarChart.vue";

const userStore = useUserStore();

const date: Date = new Date();

const greetings = computed(() => {
  if (date.getHours() >= 6 && date.getHours() < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (date.getHours() >= 8 && date.getHours() < 12) {
    return "上午好🌞！";
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return "下午好☕！";
  } else if (date.getHours() >= 18 && date.getHours() < 24) {
    return "晚上好🌃！";
  } else if (date.getHours() >= 0 && date.getHours() < 6) {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});

const duration = 5000;

// 收入金额
const amount = ref(0);
const amountOutput = useTransition(amount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
amount.value = 2000;

// 访问数
const visitCount = ref(0);
const visitCountOutput = useTransition(visitCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
visitCount.value = 2000;

//消息数
const messageCount = ref(0);
const messageCountOutput = useTransition(messageCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
messageCount.value = 2000;

// 订单数
const orderCount = ref(0);
const orderCountOutput = useTransition(orderCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
orderCount.value = 2000;


const cardList = [
  {
    title: "日收入",
    value: 2000,
    color: "#40c9c6",
    icon: "uv",
  },
  {
    title: "日支出",
    value: 2000,
    color: "#36a3f7",
    icon: "message",
  },
  {
    title: "月收入",
    value: 2000,
    color: "#f4516c",
    icon: "money",
  },
  {
    title: "月支出",
    value: 2000,
    color: "#34bfa3",
    icon: "shopping",
  },
]

</script>

<template>
  <div class="dashboard-container">
    <!-- 数据卡片 -->
    <el-row :gutter="40" class="mb-4">
      <el-col :xs="24" :sm="12" :lg="6" class="mb-4" v-for="item in cardList">
        <div class="data-box">
          <div :class="`text-[${item.color}] hover:!text-white hover:bg-[${item.color}] p-3 rounded`">
            <svg-icon :icon-class="item.icon" size="3em" />
          </div>
          <div class="flex flex-col space-y-3">
            <div class="text-[var(--el-text-color-secondary)]">{{ item.title }}</div>
            <div class="text-lg">
              {{ Math.round(item.value) }}
            </div>
          </div>
        </div>
      </el-col>

    </el-row>

    <el-row :gutter="40">
      <el-col :sm="24" :lg="18" class="mb-4">
        <BarChart id="barChart" height="240px" width="100%" class="bg-[var(--el-bg-color-overlay)]" />
      </el-col>

      <el-col :sm="24" :lg="6" class="mb-4">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="12" :lg="9" class="mb-4">
        <PieChart
          id="pieChart"
          height="240px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="9" class="mb-4">
        <RadarChart
          id="radarChart"
          height="240px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col>

      <el-col :sm="24" :lg="6" class="mb-4">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    border: 0;
  }

  .data-box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: bold;
    color: var(--el-text-color-regular);
    background: var(--el-bg-color-overlay);
    border-color: var(--el-border-color);
    box-shadow: var(--el-box-shadow-dark);
  }

  .svg-icon {
    fill: currentcolor !important;
  }
}
</style>
