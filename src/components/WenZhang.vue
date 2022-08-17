<template>
  <div class="wenzhang" v-for="item in allmsg" :key="item.id">
    <div class="liuyaocopncet">{{ item.liuyancontent }}</div>
    <div class="nameandinco">
      <div class="left">
        <div>{{ item.time }}</div>
        <div style="margin-left: 20px">{{ item.name }}</div>
      </div>
      <img
        src="../assets/edit.svg"
        style="width: 15px"
        @click="click(item.uID)"
        v-if="!item.myans"
      />
    </div>
    <div v-if="isInput && item.uID === isopen">
      <input type="text" ref="input" v-model="myliuyan" />
      <button @click="ok(item.uID)">确认</button>
    </div>
    <div v-else>{{ item.myans }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const myliuyan = ref("");
const allmsg = ref([]);
const isopen = ref();
const input = ref(null);
const isInput = ref(false);
onMounted(async () => {
  await axios({
    method: "GET",
    url: "http://localhost:8080/getmsg/getMsg",
  }).then((res) => {
    if (res.data.code === 200) {
      allmsg.value = res.data.data;
    }
  });
});
const click = (id) => {
  isInput.value = !isInput.value;
  isopen.value = id;
};
const ok = async (id) => {
  await axios({
    method: "POST",
    url: "http://localhost:8080/getmsg/myans",
    data: {
      uID: id,
      myans: myliuyan.value,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      window.location.reload();
    }
  });
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
