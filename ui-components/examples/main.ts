import { createApp } from 'vue'

import Antd from "ant-design-vue";

import App from './App.vue'

import router from "./routes";

import mitt from 'mitt'

import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

import ContentComponent from './components/Content.vue'

// import "highlight.js/styles/arduino-light.css";
// import "highlight.js/lib";

const Mitt = mitt();

const app = createApp(App);

// 事件总线
app.config.globalProperties.$Bus = Mitt


app.component('content-component', ContentComponent)

app.use(Antd);

app.use(router);

app.mount('#app')
