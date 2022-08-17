<template>
  <div>
    <ul>
      <li v-for="item in tabs" :key="item.id" @click="nowTab = item.id">
        {{ item.name }}
      </li>
    </ul>
    <div>
      <WenZhang v-if="nowTab === 0" />
      <Liuyang v-if="nowTab === 1" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WenZhang from "@/components/WenZhang.vue";
import Liuyang from "@/components/LiuYan.vue";
const nowTab = ref(0);
const tabs = [
  { id: 0, name: "回复留言" },
  { id: 1, name: "发布文章" },
];
</script>

<style scoped>
ul {
  display: flex;
  height: 40px;
  background: #66ccff;
}
li {
  list-style: none;
  margin: 20px;
  cursor: pointer;
}
</style>
