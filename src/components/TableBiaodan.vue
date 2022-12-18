<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="标题">
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item label="简介">
      <a-textarea v-model:value="formState.introduction" />
    </a-form-item>
    <a-form-item label="标签">
      <a-input v-model:value="formState.biaoqian" />
    </a-form-item>
    <a-form-item label="是否为精品">
      <a-switch v-model:checked="formState.isgood" />
    </a-form-item>
    <a-form-item label="是否为鬼畜">
      <a-switch v-model:checked="formState.isGhost" />
    </a-form-item>
    <a-form-item label="封面">
      <input
        class="left-operation-input"
        type="file"
        id="upload_file"
        multiple="multiple"
        @change="uploadImg($event)"
      />
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, toRaw, ref, onMounted } from "vue";
import axios from "axios";
export default defineComponent({
  emits: ["formState"],
  setup(prop, context) {
    const imgFiles = ref();

    const formState = reactive({
      title: "",
      isgood: false,
      isGhost: false,
      introduction: "",
      biaoqian: "",
      img: [],
    });
    const uploadImg = (event) => {
      const file = event.target.files;
      for (let i = 0; i < file.length; i++) {
        let formData = new FormData();
        formData.append("wangeditor-uploaded-image", file[i]);
        axios
          .post(`http://localhost:8080/wenzi/updatImg`, formData)
          .then((res) => {
            formState.img.push(res.data.data[0].url);
          });
      }
    };
    return {
      uploadImg,
      labelCol: {
        style: {
          width: "150px",
        },
      },
      wrapperCol: {
        span: 14,
      },
      formState,
    };
  },
});
</script>
