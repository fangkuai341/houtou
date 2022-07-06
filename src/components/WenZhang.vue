<template>
  <div class="wenzhang">
    <div class="liuyaocopncet">wodeliushiwosdhasdvsdsad</div>
    <div class="nameandinco">
      <div class="left">
        <div>2022-02-02</div>
        <div style="margin-left: 20px">名字</div>
      </div>
      <img src="../assets/edit.svg" style="width: 15px" @click="click" />
    </div>
    <input type="text" ref="input" v-if="isInput" v-model="myliuyan" />
    <div v-else>{{ myliuyan }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const myliuyan = ref("");
const input = ref(null);
const isInput = ref(false);
const click = () => {
  isInput.value = !isInput.value;
};
</script>
<style scoped>
.wenzhang {
  padding: 10px 20px;
  background: rgb(44, 227, 151);
  margin-top: 10px;
  width: 100%;
}
.liuyaocopncet {
  width: 100%;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
.nameandinco {
  display: flex;
}
.left {
  display: flex;
}
img {
  width: 15px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
