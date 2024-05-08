<template>
  <div>
    <canvas id="canvasBox"></canvas>
  </div>
</template>
<script lang="ts" setup>

import * as THREE from 'three';
import { ref } from 'vue';

const canvasBox = ref<HTMLCanvasElement>()

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将渲染器添加到页面
canvasBox.value?.appendChild(renderer.domElement);

// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// 渲染
function render() {
  requestAnimationFrame(render);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

render()

</script>

<style lang="less" scoped>
  
</style>