<template>
  <div class="home">
    <div class="content">
      <div class="home-header">
        <router-link class="link" to="/">
          <img
            class="home-logo"
            src="../assets/userLogo.webp"
            alt="biaochenxuying logo"
          />
        </router-link>
      </div>
      <div class="home-body">
        <div class="list">
          <template v-for="(item, index) in linkData">
            <router-link
              v-if="item.isLink"
              class="link"
              :class="item.class"
              :to="item.href"
              :key="index"
            >
              {{ item.label }}
            </router-link>
            <a
              v-else
              :key="item.href"
              :target="item.blank"
              rel="noopener noreferrer"
              class="link"
              :class="item.class"
              :href="item.href"
            >
              {{ item.label }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

// 首页链接
const linkData = ref([
  {
    label: "文章",
    isLink: true,
    class: "",
    href: "/articles",
  },
  {
    label: "项目",
    isLink: true,
    class: "",
    href: "/project",
  },
  {
    label: "github",
    blank: "_blank",
    class: "",
    href: "https://github.com/biaochenxuying",
  },
  {
    label: "掘金",
    blank: "_blank",
    class: "",
    href: "https://juejin.im/user/591d6b4d0ce463006926ae40",
  },
  {
    label: "知乎",
    blank: "_blank",
    class: "",
    href: "https://www.zhihu.com/people/mo-xu-ming-53/posts",
  },
  {
    label: "segmentfault",
    blank: "_blank",
    class: "",
    href: "https://segmentfault.com/u/biaochenxuying",
  },
  {
    label: "简书",
    blank: "_blank",
    class: "",
    href: "https://www.jianshu.com/u/91717b553bfd",
  },
]);
</script>

<style lang="less" scoped>
.home {
  position: fixed;
  left: 0;
  top: 0;
  .content {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 20px;
    text-align: center;
    padding-top: 12%;
    .home-logo {
      width: 220px;
      border-radius: 50%;
      animation: mylogo 3s;
      -moz-animation: mylogo 3s; /* Firefox */
      -webkit-animation: mylogo 3s; /* Safari and Chrome */
      -o-animation: mylogo 3s; /* Opera */
      animation-iteration-count: infinite;
    }
    .home-header {
      .link {
        display: block;
      }
    }
    .home-body {
      padding-top: 20px;
      .list {
        .link {
          display: inline-block;
          padding: 20px;
          color: #409eff;
          min-width: 80px;
        }
        .link:hover {
          color: rgb(155, 35, 35);
        }
      }
    }
    .introduce {
      padding-top: 20px;
      color: #fff;
    }
  }
}
@keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-moz-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-webkit-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-o-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}
</style>

